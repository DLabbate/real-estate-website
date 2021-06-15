import React from "react";
import "./Profile.css";
import { FiMail, FiUser, FiPhone } from "react-icons/fi";

const Profile = () => {
  return (
    <div className="profile-page-container">
      <div className="profile-container">
        <div className="title">
          <h3>Profile</h3>
        </div>
        <div className="row-container">
          <div className="row">
            <FiUser className="icon" />
            <p>Domenic Labbate</p>
          </div>
          <div className="row">
            <FiMail className="icon" />
            <p>domeniclabbate@gmail.com</p>
          </div>
          <div className="row">
            <FiPhone className="icon" />
            <p>514-123-4567</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
