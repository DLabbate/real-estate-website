import React, { useEffect, useState } from "react";
import "./SearchFilter.css";
import update from "immutability-helper";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import AddressInput from "../forms/AddressInput";
import * as listingApi from "../../utils/api/listing-api";

const SearchFilter = ({ user, setListings }) => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [radius, setRadius] = useState(5); // in km
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const onChangeAddress = async (address) => {
    setAddress(address);
  };

  const onSelectAddress = async (address) => {
    setAddress(address);

    const results = await geocodeByAddress(address);
    const coordinates = await getLatLng(results[0]);

    setCoordinates(coordinates);
  };

  const onChangeRadius = async (event) => {
    setRadius(event.target.value);
  };

  const onChangePriceFilter = async (event, callback) => {
    let numberFormat = event.target.value.replace(/\D/g, "");

    if (numberFormat === "") {
      callback("");
    } else {
      // Strip of all non-numeric characters
      let numberLocaleString = Number(numberFormat).toLocaleString();
      callback(`$${numberLocaleString}`);
    }
  };

  const onChangeMinPrice = async (event) => {
    onChangePriceFilter(event, setMinPrice);
  };

  const onChangeMaxPrice = async (event) => {
    onChangePriceFilter(event, setMaxPrice);
  };

  /**
   * Formats a price string (e.g. "$123,456") to a number (e.g. 123456)
   */
  const formatPrice = (priceString) => {
    return parseInt(priceString.replace(/\D/g, ""));
  };

  const getFilterParams = () => {
    return {
      address,
      coordinates,
      radius,
      minPrice: formatPrice(minPrice),
      maxPrice: formatPrice(maxPrice),
    };
  };

  const getListings = async () => {
    try {
      const filterParams = getFilterParams();
      const response = await listingApi.searchListings(
        user.token,
        filterParams
      );
      if (response.ok) {
        const responseJson = await response.json();
        setListings(responseJson);
      } else {
        console.log("Error searching for listings");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const filterParams = getFilterParams();
    console.log("Filter Params: ", filterParams);
    getListings();
  }, [address, coordinates, radius, minPrice, maxPrice]);

  return (
    <div className="filter">
      <div className="filter__row">
        <AddressInput
          value={address}
          onChange={onChangeAddress}
          onSelect={onSelectAddress}
          suggestionContainerAbsolute={true}
        />
      </div>
      <div className="filter__row">
        <label className="filter__slider-label">Radius ({radius}km)</label>
        <input
          type="range"
          className="filter__slider"
          value={radius}
          min={1}
          max={10}
          step={1}
          onChange={onChangeRadius}
        ></input>
      </div>
      <div className="filter__row">
        <input
          value={minPrice}
          className="filter__input"
          placeholder="Min. Price"
          onChange={onChangeMinPrice}
          maxLength={12}
        ></input>
        <p>-</p>
        <input
          value={maxPrice}
          className="filter__input"
          placeholder="Max. Price"
          onChange={onChangeMaxPrice}
          maxLength={12}
        ></input>
      </div>
    </div>
  );
};

export default SearchFilter;
