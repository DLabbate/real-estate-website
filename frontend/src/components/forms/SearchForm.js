import React, { useEffect, useState } from "react";
import "./SearchForm.css";
import update from "immutability-helper";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import AddressInput from "./AddressInput";
import * as listingApi from "../../utils/api/listing-api";

const SearchForm = ({ user, setListings }) => {
  const [filterParams, setFilterParams] = useState({
    address: "",
    coordinates: { lat: null, lng: null },
    radius: 5, // in km
    minPrice: "",
    maxPrice: "",
  });

  const setField = async (fieldName, newValue) => {
    const newFilterParams = update(filterParams, {
      [fieldName]: { $set: newValue },
    });
    setFilterParams(newFilterParams);
  };

  const onChangeAddress = async (address) => {
    setField("address", address);
  };

  const onSelectAddress = async (address) => {
    console.log("Selected the following address: ", address);
    setField("address", address);
  };

  const onChangeRadius = async (event) => {
    setField("radius", event.target.value);
  };

  const onChangeMinPrice = async (event) => {
    setField("minPrice", event.target.value);
  };

  const onChangeMaxPrice = async (event) => {
    setField("maxPrice", event.target.value);
  };

  const updateCoordinates = async (address) => {
    if (filterParams.address) {
      const results = await geocodeByAddress(address);
      const coordinates = await getLatLng(results[0]);
      console.log(coordinates);

      //Update coordinates
      setField("coordinates", coordinates);
    }
  };

  const getListings = async () => {
    try {
      const response = await listingApi.searchListings(
        user.token,
        filterParams
      );
      const responseJson = await response.json();
      setListings(responseJson);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Every time the address changes, update the coordinates
   */
  useEffect(() => {
    updateCoordinates(filterParams.address);
  }, [filterParams.address]);

  useEffect(() => {
    console.log("Filter Params: ", filterParams);
    getListings();
  }, [filterParams]);

  return (
    <div className="filter">
      <div className="filter__row">
        <AddressInput
          value={filterParams.address}
          onChange={onChangeAddress}
          onSelect={onSelectAddress}
          suggestionContainerAbsolute={true}
        />
      </div>
      <div className="filter__row">
        <label className="filter__slider-label">
          Radius ({filterParams.radius}km)
        </label>
        <input
          type="range"
          className="filter__slider"
          value={filterParams.radius}
          min={1}
          max={10}
          step={1}
          onChange={onChangeRadius}
        ></input>
      </div>
      <div className="filter__row">
        <input
          value={filterParams.minPrice}
          className="filter__input"
          placeholder="Min. Price"
          onChange={onChangeMinPrice}
        ></input>
        <p>-</p>
        <input
          value={filterParams.maxPrice}
          className="filter__input"
          placeholder="Max. Price"
          onChange={onChangeMaxPrice}
        ></input>
      </div>
    </div>
  );
};

export default SearchForm;
