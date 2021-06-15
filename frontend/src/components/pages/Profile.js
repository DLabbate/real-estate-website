import React, { useRef } from "react";
import "./Profile.css";
import { FiMail, FiUser, FiPhone } from "react-icons/fi";
import Button from "../shared/Button";
import Listing from "../shared/Listing";
import { mockProperties } from "../../constants/mock.js";

const Profile = () => {
  const user = useRef(JSON.parse(localStorage.getItem("user")));
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
        {/* <Button
          text={"Publish Listing"}
          width={"90%"}
          margin={"10px"}
          modifiers={"btn--text-black btn--background-white btn--border-black"}
        /> */}
        {/* <Listing data={mockProperties[0]} /> */}
      </div>
    </div>
  );
};

export default Profile;
