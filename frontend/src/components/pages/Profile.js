import React, { useEffect, useRef, useState } from "react";
import "./Profile.css";
import { FiMail, FiUser, FiPhone } from "react-icons/fi";
import Button from "../shared/Button";
import Listing from "../shared/Listing";
import { mockProperties } from "../../constants/mock.js";
import ListingForm from "../forms/ListingForm";

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const renderPublishedListing = () => {
    if (!user.publishedListing) {
      return <ListingForm user={user} setUser={setUser} />;
    } else {
      return (
        <>
          <Listing data={mockProperties[0]} />
        </>
      );
    }
  };

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
