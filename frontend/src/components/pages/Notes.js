import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import * as notesApi from "../../utils/api/notes-api";
import Listing from "../shared/Listing";
import * as userApi from "../../utils/api/user-api";
import update from "immutability-helper";
import "./Notes.css";
import { mockBoard } from "../../constants/mock";

const Notes = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [notes, setNotes] = useState(mockBoard);

  const getNotes = async () => {
    try {
      const response = await notesApi.getNotesByUser(user.token);
      const responseJson = await response.json();
      console.log("REST API response: ", responseJson);
      setNotes(responseJson);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    //getNotes();
  }, [user]);

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

  return (
    <div className="notes-container">
      {/* <DragDropContext
        onDragEnd={(result) => console.log(result)}
      ></DragDropContext> */}
      <DragDropContext onDragEnd={(result) => console.log(result)}>
        {notes.columns.map((column) => (
          <Droppable droppableId={column.columnName}>
            {(provided, snapshot) => (
              <div className="column" ref={provided.innerRef}>
                <h3 className="column__title">Queue</h3>
                {column.items
                  // .filter((item) => item.category === "Queue")
                  .map((item, index) => {
                    console.log(item);
                    return (
                      <Draggable
                        key={item._id}
                        draggableId={item._id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          //   <Listing
                          //     data={item.listing}
                          //     onClickIcon={removeFavorite}
                          //     //   key={item._id}
                          //     isFavorited={true}
                          //   />
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
                              //data={item.listing}
                              data={item}
                              onClickIcon={removeFavorite}
                              //   key={item._id}
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

      {/* 
      <DragDropContext onDragEnd={(result) => console.log(result)}>
        <Droppable droppableId="Queue">
          {(provided, snapshot) => (
            <div className="column" ref={provided.innerRef}>
              <h3 className="column__title">Queue</h3>
              {notes.columns[0].items
                // .filter((item) => item.category === "Queue")
                .map((item, index) => {
                  console.log(item);
                  return (
                    <Draggable
                      key={item._id}
                      draggableId={item._id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        //   <Listing
                        //     data={item.listing}
                        //     onClickIcon={removeFavorite}
                        //     //   key={item._id}
                        //     isFavorited={true}
                        //   />
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
                            //data={item.listing}
                            data={item}
                            onClickIcon={removeFavorite}
                            //   key={item._id}
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
      </DragDropContext> */}

      {/* <div className="column">
        <h3 className="column__title">Queue</h3>
        {notes.map((item, index) => {
          console.log(item);
          return (
            <Listing
              data={item.listing}
              onClickIcon={removeFavorite}
              //   key={item._id}
              isFavorited={true}
            />
          );
        })}
      </div> */}
    </div>
  );
};

export default Notes;
