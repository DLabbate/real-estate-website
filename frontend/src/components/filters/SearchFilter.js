import React, { useEffect, useState } from "react";
import "./SearchFilter.css";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import AddressInput from "../inputs/AddressInput";
import * as listingApi from "../../utils/api/listing-api";
import * as priceHelper from "../../utils/helpers/price-helper";

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

  const onChangeMinPrice = async (event) => {
    const priceString = priceHelper.formatPriceString(event.target.value);
    setMinPrice(priceString);
  };

  const onChangeMaxPrice = async (event) => {
    const priceString = priceHelper.formatPriceString(event.target.value);
    setMaxPrice(priceString);
  };

  const getFilterParams = () => {
    return {
      address,
      coordinates,
      radius,
      minPrice: priceHelper.getPriceNumber(minPrice),
      maxPrice: priceHelper.getPriceNumber(maxPrice),
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
      <div className="filter__column">
        <AddressInput
          value={address}
          onChange={onChangeAddress}
          onSelect={onSelectAddress}
          suggestionContainerAbsolute={true}
        />
      </div>
      <div className="filter__column">
        <label className="filter__label">Radius ({radius}km)</label>
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
      <div className="filter__column">
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
