import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./Form.css";
import "./SearchForm.css";
import Button from "../shared/Button";
import * as Yup from "yup";
import * as listingApi from "../../utils/api/listing-api";
import update from "immutability-helper";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import AddressInput from "./AddressInput";

const SearchForm = () => {
  const initialValues = {
    address: "",
    coordinates: { lat: null, lng: null },
    minPrice: 0,
    maxPrice: 999999999,
  };

  const validate = Yup.object({
    address: Yup.string()
      .max(80, "Must be 80 characters or less")
      .required("Address is required")
      .test(
        "location",
        "Please select a valid address from the list",
        function () {
          const { lat, lng } = this.parent["coordinates"];
          if (lat && lng) {
            return true;
          } else {
            return false;
          }
        }
      ),
    minPrice: Yup.number()
      .max(999999999, "Exceeded max value of $999,999,999")
      .positive()
      .integer(),
    maxPrice: Yup.number()
      .max(999999999, "Exceeded max value of $999,999,999")
      .positive()
      .integer(),
  });

  return (
    // <div className="filter">
    <Formik>
      <Form className="filter">
        <div className="filter__row">
          <input placeholder="Location" className="filter__input"></input>
        </div>
        <div className="filter__row">
          <label className="filter__slider-label">Radius (10km)</label>
          <input type="range" className="filter__slider"></input>
        </div>
        <div className="filter__row">
          <input className="filter__input" placeholder="Min. Price"></input>
          <p>-</p>
          <input className="filter__input" placeholder="Max. Price"></input>
        </div>
      </Form>
    </Formik>
    // </div>
  );
};

export default SearchForm;
