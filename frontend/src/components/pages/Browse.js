import React, { useEffect, useState } from "react";
import "./Browse.css";
import Listing from "../shared/Listing";
import { mockProperties } from "../../constants/mock.js";
import * as listingApi from "../../utils/api/listing-api";

const Browse = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [listings, setListings] = useState([]);

  const getListings = async () => {
    const response = await listingApi.searchListings(user.token, {});
    const responseJson = await response.json();
    setListings(responseJson);
  };
  useEffect(() => {
    getListings();
  });
  return (
    <>
      <div className="filter">
        <div className="filter__row">
          <label>Location</label>
          <input
            type="search"
            placeholder="Location"
            className="filter__textinput"
          ></input>
        </div>
        <div className="filter__row">
          <label>Price</label>
          <input type="range" className="filter__textinput"></input>
        </div>
        <div className="filter__row">
          <label>Location</label>
          <input className="filter__textinput"></input>
        </div>
        <div className="filter__row">
          <label>Location</label>
          <input className="filter__textinput"></input>
        </div>
      </div>
      <div className="properties">
        {listings.map((item) => (
          <Listing data={item} />
        ))}
      </div>
    </>
  );
};

export default Browse;
