import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import * as notesApi from "../../utils/api/notes-api";
import Listing from "../shared/Listing";
import * as userApi from "../../utils/api/user-api";
import update from "immutability-helper";
import "./Notes.css";

const Notes = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [notes, setNotes] = useState([]);

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
    getNotes();
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

  return (
    <div className="notes-container">
      {/* <DragDropContext
        onDragEnd={(result) => console.log(result)}
      ></DragDropContext> */}
      {notes.map((item) => {
        console.log(item);
        return (
          <Listing
            data={item.listing}
            onClickIcon={removeFavorite}
            key={item._id}
            isFavorited={true}
          />
        );
      })}
    </div>
  );
};

export default Notes;
