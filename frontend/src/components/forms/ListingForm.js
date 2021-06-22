import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./Form.css";
import Button from "../shared/Button";
import * as Yup from "yup";
import * as listingApi from "../../utils/api/listing-api";
import update from "immutability-helper";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import AddressInput from "./AddressInput";
import * as priceHelper from "../../utils/helpers/price-helper";

const ListingForm = ({ user, setUser }) => {
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
        function () {
          const { lat, lng } = this.parent["coordinates"];
          if (lat && lng) {
            return true;
          } else {
            return false;
          }
        }
      ),
    price: Yup.string()
      .max(12, "Exceeded max value of $999,999,999")
      .required("Price is required"),
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
        values.coordinates.lat,
        values.coordinates.lng
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

        // Set timeout for file to be uploaded to AWS S3
        setTimeout(() => {
          setUser(updatedUser);
        }, 200);
      }
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    console.log(values);

    // Convert price to Number
    const priceNumber = priceHelper.getPriceNumber(values.price);
    createListing({ ...values, price: priceNumber });
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
              <AddressInput
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
                  setFieldValue("coordinates", coordinates);
                }}
              />
              <ErrorMessage
                name="address"
                component="div"
                className="form__error"
              />
              <Field
                name="price"
                className="form__field form__field--lightgrey"
                placeholder="Price"
                maxLength={12}
                onChange={(event) => {
                  setFieldValue(
                    "price",
                    priceHelper.formatPriceString(event.target.value)
                  );
                }}
              />
              <ErrorMessage
                name="price"
                component="div"
                className="form__error"
              />
              <input
                className="form__file"
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
