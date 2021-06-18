import React, { useEffect, useRef, useState } from "react";
import "./Profile.css";
import { FiMail, FiUser, FiPhone } from "react-icons/fi";
import Button from "../shared/Button";
import Listing from "../shared/Listing";
import { mockProperties } from "../../constants/mock.js";
import ListingForm from "../forms/ListingForm";
import * as listingApi from "../../utils/api/listing-api";
import update from "immutability-helper";

const Profile = ({ user, setUser }) => {
  const deleteListing = async () => {
    try {
      const response = await listingApi.deleteListing(user.token);
      const responseJson = await response.json();
      console.log("REST API Response: ", responseJson);

      if (response.ok) {
        const updatedUser = update(user, {
          publishedListing: { $set: undefined },
        });
        setUser(updatedUser);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const renderPublishedListing = () => {
    if (!user.publishedListing) {
      return <ListingForm user={user} setUser={setUser} />;
    } else {
      return (
        <div className="profile-container">
          <div className="title">
            <h3>My Listing</h3>
          </div>
          <Listing
            data={user.publishedListing}
            variant={"publishedListing"}
            onClickIcon={deleteListing}
          />
        </div>
      );
    }
  };

  // Update localStorage every time user info gets updated (e.g. if they create/delete a listing)
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <div className="profile-page-container">
      <div className="profile-container">
        <div className="title">
          <h3>Profile</h3>
        </div>
        <div className="row-container">
          <div className="row">
            <FiUser className="icon" />
            <p>
              {user.firstName} {user.lastName}
            </p>
          </div>
          <div className="row">
            <FiMail className="icon" />
            <p>{user.email}</p>
          </div>
          <div className="row">
            <FiPhone className="icon" />
            <p>{user.phoneNumber}</p>
          </div>
        </div>
      </div>
      <div></div>
      {renderPublishedListing()}
    </div>
  );
};

export default Profile;
