import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./Form.css";
import Button from "../shared/Button";
import * as Yup from "yup";
import * as listingApi from "../../utils/api/listing-api";
import update from "immutability-helper";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";

const ListingForm = ({ user, setUser }) => {
  const [address, setAddress] = useState("");
  const handleSelect = async (value) => {
    console.log(value);
    //setAddress(value);
  };
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const initalValues = {
    address: "",
    coordinates: { lat: null, lng: null },
    price: "",
    image: "",
  };

  const validate = Yup.object({
    address: Yup.string()
      .max(80, "Must be 80 characters or less")
      .required("Address is required")
      .test(
        "location",
        "Please select a valid address from the list",
        (value) => {
          if (coordinates.lat && coordinates.lng) {
            return true;
          } else {
            return false;
          }
        }
      ),
    price: Yup.number()
      .max(999999999, "Exceeded max value of $999,999,999")
      .required("Price is required")
      .positive()
      .integer(),
    image: Yup.mixed()
      .required("Image is required")
      .test(
        "type",
        "Only the following formats are accepted: .jpeg, .jpg, .png",
        (value) => {
          return (
            value &&
            (value.type === "image/jpeg" ||
              value.type === "image/png" ||
              value.type === "image/png")
          );
        }
      )
      .test("fileSize", "The file exceeds 1MB", (value) => {
        return value && value.size <= 1048576;
      }),
  });

  const createListing = async (values) => {
    try {
      console.log(values);
      const response = await listingApi.createListing(
        user.token,
        values.address,
        values.price,
        values.image,
        coordinates.lat,
        coordinates.lng
      );
      const responseJson = await response.json();
      console.log("REST API Response: ", responseJson);

      // Check if the status code is 200-299
      if (response.ok) {
        console.log("Successfully created listing");

        // Update state
        const updatedUser = update(user, {
          publishedListing: { $set: responseJson },
        });
        setUser(updatedUser);
      }
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    console.log(values);
    createListing(values);
  };

  return (
    <>
      <div className="form form--background-white form--shadow form--extended">
        <Formik
          initialValues={initalValues}
          validationSchema={validate}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className="form__container">
              <div className="form__title">
                <h3>Create Listing</h3>
              </div>
              {/* <Field
                type="text"
                name="address"
                className="form__field form__field--lightgrey"
                placeholder="Address"
                maxLength={40}
              /> */}
              <PlacesAutocomplete
                value={values.address}
                onChange={(address) => {
                  setFieldValue("address", address);
                }}
                onSelect={async (address) => {
                  console.log("Selected the following address: ", address);
                  setFieldValue("address", address);
                  const results = await geocodeByAddress(address);
                  const coordinates = await getLatLng(results[0]);
                  console.log(coordinates);
                  setCoordinates(coordinates);
                }}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div className="address-container">
                    <input
                      {...getInputProps({
                        name: "address",
                        placeholder: "Address",
                        className: "form__field form__field--lightgrey ",
                        maxLength: 80,
                      })}
                    />

                    <div className="suggestion-container">
                      {loading ? <div>...loading</div> : null}
                      {suggestions.map((suggestion) => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        const key = suggestion.description;
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              key,
                            })}
                          >
                            {suggestion.description}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
              <ErrorMessage
                name="address"
                component="div"
                className="form__error"
              />
              <Field
                type="number"
                name="price"
                className="form__field form__field--lightgrey"
                placeholder="Price"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="form__error"
              />
              <input
                className="form__file"
                id="image"
                name="image"
                type="file"
                onChange={(event) => {
                  setFieldValue("image", event.currentTarget.files[0]);
                }}
                accept="image/png, image/jpeg"
              />
              <ErrorMessage
                name="image"
                component="div"
                className="form__error"
              />
              <Button
                text={"Submit"}
                width={"90%"}
                margin={"10px"}
                modifiers={
                  "btn--text-black btn--background-white btn--border-black"
                }
              />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ListingForm;
