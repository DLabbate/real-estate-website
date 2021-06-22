import React, { useEffect, useState } from "react";
import "./Browse.css";
import Listing from "../shared/Listing";
import * as listingApi from "../../utils/api/listing-api";
import "../filters/SearchFilter";
import SearchFilter from "../filters/SearchFilter";

const Browse = ({ user, setUser, addFavorite, removeFavorite }) => {
  const [listings, setListings] = useState([]);

  const getListings = async () => {
    const response = await listingApi.searchListings(user.token, {});
    const responseJson = await response.json();
    setListings(responseJson);
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

  return (
    <>
      <SearchFilter user={user} setListings={setListings} />
      <div className="properties">{renderListings()}</div>
    </>
  );
};

export default Browse;
