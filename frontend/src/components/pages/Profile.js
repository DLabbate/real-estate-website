import React, { useRef } from "react";
import "./Profile.css";
import { FiMail, FiUser, FiPhone } from "react-icons/fi";
import Button from "../shared/Button";
import Listing from "../shared/Listing";
import { mockProperties } from "../../constants/mock.js";
import ListingForm from "../forms/ListingForm";

const Profile = () => {
  const user = useRef(JSON.parse(localStorage.getItem("user")));

  const renderPublishedListing = () => {
    if (!user.current.publishedListing) {
      return <ListingForm user={user.current} />;
    } else {
      return (
        <>
          <Listing data={mockProperties[0]} />
        </>
      );
    }
  };
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
              {user.current.firstName} {user.current.lastName}
            </p>
          </div>
          <div className="row">
            <FiMail className="icon" />
            <p>{user.current.email}</p>
          </div>
          <div className="row">
            <FiPhone className="icon" />
            <p>{user.current.phoneNumber}</p>
          </div>
        </div>
      </div>
      <div></div>
      {renderPublishedListing()}
    </div>
  );
};

export default Profile;
