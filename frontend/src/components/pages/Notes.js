import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Listing from "../shared/Listing";
import update from "immutability-helper";
import "./Notes.css";
import * as boardApi from "../../utils/api/board-api";

const Notes = ({ user, setUser, addFavorite, removeFavorite }) => {
  const [board, setBoard] = useState(null);

  // Whenever the user info changes, we should retrieve and update the "board" state
  useEffect(() => {
    /**
     * Sends a GET request to the backend to retrieve the user's board
     * Also updates the "board" state
     */
    const getBoard = async () => {
      try {
        const response = await boardApi.getBoard(user.token);
        const responseJson = await response.json();
        console.log("[GET] REST API response:", responseJson);
        setBoard(responseJson);
      } catch (err) {
        console.log(err);
      }
    };

    getBoard();
  }, [user.token]);

  // Whenever we make a drag/drop action, the backend should be updated accordingly
  useEffect(() => {
    /**
     * Sends a PATCH request to the backend
     */
    const editBoard = async () => {
      try {
        const response = await boardApi.editBoard(user.token, board);
        const responseJson = await response.json();
        console.log("[PATCH] REST API response:", responseJson);
      } catch (err) {
        console.log(err);
      }
    };

    // Make sure board is not null
    if (board) {
      editBoard();
    }
    console.log("State: ", board);
  }, [board, user.token]);

  const getItemStyle = (isDragging, draggableStyle) => ({
    // Some basic styles to make the items look a bit nicer
    userSelect: "none",

    // Background colour if dragging
    background: isDragging ? "transparent" : "transparent",

    // Styles we need to apply on draggables
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
    console.log("[Reordering Column] Updated Board: ", updatedNotes);
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
    console.log("[Moving to Different Column] Updated Board: ", updatedNotes);
    setBoard(updatedNotes);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Dropped outside the list
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

  const renderDragDropContext = () => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        {board.columns.map((column) => (
          <Droppable droppableId={column.columnName} key={column.columnName}>
            {(provided, snapshot) => (
              <div className="column" ref={provided.innerRef}>
                <h3>{formatColumnName(column.columnName)}</h3>
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
                            data={item.listing}
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
    );
  };

  const renderLoading = () => {
    return <></>;
  };

  const renderBoard = () => {
    if (board) {
      return renderDragDropContext();
    } else {
      return renderLoading();
    }
  };

  return <div className="notes-container">{renderBoard()}</div>;
};

export default Notes;
