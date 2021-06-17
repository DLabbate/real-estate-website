import React, { useEffect, useState } from "react";
import "./Browse.css";
import Listing from "../shared/Listing";
import { mockProperties } from "../../constants/mock.js";
import * as listingApi from "../../utils/api/listing-api";
import * as userApi from "../../utils/api/user-api";
import update from "immutability-helper";

const Browse = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [listings, setListings] = useState([]);

  const getListings = async () => {
    const response = await listingApi.searchListings(user.token, {});
    const responseJson = await response.json();
    setListings(responseJson);
  };

  const addFavorite = async (listingId) => {
    try {
      const response = await userApi.addFavorite(user.token, listingId);
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

  const isListingFavorited = (listingId) => {
    return user.favoriteListings.includes(listingId);
  };

  const renderListing = (item) => {
    const isFavorited = isListingFavorited(item._id);
    const onClickIcon = isFavorited ? removeFavorite : addFavorite;
    return (
      <Listing
        data={item}
        key={item._id}
        isFavorited={isFavorited}
        onClickIcon={onClickIcon}
      />
    );
  };

  const renderListings = () => {
    return listings.map(renderListing);
  };

  useEffect(() => {
    getListings();
  }, [user]);

  // Update localStorage every time user info gets updated (e.g. if they create/delete a listing)
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <>
      <div className="filter">
        <div className="filter__row filter__row--large">
          <input
            type="search"
            placeholder="Location"
            className="filter__input"
          ></input>
        </div>
        <div className="filter__row">
          <label>Radius</label>
          <input type="range" className="filter__input"></input>
        </div>
        <div className="filter__row">
          <input className="filter__input" placeholder="Min. Price"></input>
          <p>-</p>
          <input className="filter__input" placeholder="Max. Price"></input>
        </div>
      </div>
      <div className="properties">{renderListings()}</div>
    </>
  );
};

export default Browse;
