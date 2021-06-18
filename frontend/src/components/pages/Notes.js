import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import * as notesApi from "../../utils/api/notes-api";
import Listing from "../shared/Listing";
import * as userApi from "../../utils/api/user-api";
import update from "immutability-helper";
import "./Notes.css";
import { mockBoard } from "../../constants/mock";

const Notes = () => {
  const defaultBoard = {
    columns: [
      { columnName: "queue", items: [] },
      { columnName: "notInterested", items: [] },
      { columnName: "interested", items: [] },
      { columnName: "offers", items: [] },
    ],
  };
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [board, setBoard] = useState(mockBoard);

  const getBoard = async () => {
    try {
      const response = await notesApi.getNotesByUser(user.token);
      const responseJson = await response.json();
      console.log("REST API response: ", responseJson);
      setBoard(responseJson);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    //getNotes();
  }, [user]);

  useEffect(() => {
    console.log("Board: ", board);
  });

  const removeFavorite = async (listingId) => {
    try {
      const response = await userApi.removeFavorite(user.token, listingId);
      const responseJson = await response.json();
      console.log("REST API response", responseJson);
      if (response.ok) {
        const updatedUser = update(user, {
          favoriteListings: { $set: responseJson.favoriteListings },
        });
        setUser(updatedUser);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Update localStorage every time user info gets updated (e.g. if they create/delete a listing)
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    // padding: grid * 2,
    // margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightblue" : "transparent",
    // margin: "10px",
    // padding: "10px",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  // Reorder within a column
  const reorderColumn = (columnName, startIndex, endIndex) => {
    const columnIndex = board.columns.findIndex(
      (item) => item.columnName === columnName
    );

    const updatedNotes = update(board, {
      columns: {
        [columnIndex]: {
          items: {
            $splice: [
              [startIndex, 1, board.columns[columnIndex].items[endIndex]],
              [endIndex, 1, board.columns[columnIndex].items[startIndex]],
            ],
          },
        },
      },
    });
    console.log("Updated Board: ", updatedNotes);
    setBoard(updatedNotes);
  };

  // Move to another column
  const move = (columnNameStart, columnNameEnd, startIndex, endIndex) => {
    const columnStartIndex = board.columns.findIndex(
      (item) => item.columnName === columnNameStart
    );

    const columnEndIndex = board.columns.findIndex(
      (item) => item.columnName === columnNameEnd
    );

    const updatedNotes = update(board, {
      columns: {
        [columnStartIndex]: {
          items: {
            $splice: [[startIndex, 1]],
          },
        },
        [columnEndIndex]: {
          items: {
            $splice: [
              [endIndex, 0, board.columns[columnStartIndex].items[startIndex]],
            ],
          },
        },
      },
    });
    console.log("Updated Board: ", updatedNotes);
    setBoard(updatedNotes);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      reorderColumn(source.droppableId, source.index, destination.index);
    } else {
      move(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index
      );
    }
  };

  const formatColumnName = (columnName) => {
    if (columnName === "queue") {
      return "Queue";
    } else if (columnName === "notInterested") {
      return "Not Interested";
    } else if (columnName === "interested") {
      return "Interested";
    } else if (columnName === "offers") return "Offers";
    else {
      return "";
    }
  };

  return (
    <div className="notes-container">
      <DragDropContext onDragEnd={onDragEnd}>
        {board.columns.map((column) => (
          <Droppable droppableId={column.columnName} key={column.columnName}>
            {(provided, snapshot) => (
              <div className="column" ref={provided.innerRef}>
                <h3 className="column__title">
                  {formatColumnName(column.columnName)}
                </h3>
                {column.items.map((item, index) => {
                  return (
                    <Draggable
                      key={item._id}
                      draggableId={item._id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <Listing
                            data={item}
                            onClickIcon={removeFavorite}
                            isFavorited={true}
                          />
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
};

export default Notes;
