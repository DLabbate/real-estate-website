import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./Form.css";
import Button from "../shared/Button";
import * as Yup from "yup";

const ListingForm = () => {
  const initalValues = {
    address: "",
    price: "",
    image: "",
  };

  const validate = Yup.object({
    address: Yup.string()
      .max(40, "Must be 40 characters or less")
      .required("Address is required"),
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
    } catch (err) {
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
          {({ isSubmitting, setFieldValue }) => (
            <Form className="form__container">
              <div className="form__title">
                <h3>Create Listing</h3>
              </div>
              <Field
                type="text"
                name="address"
                className="form__field form__field--lightgrey"
                placeholder="Address"
                maxLength={40}
              />
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
              {/* <Field
                type="file"
                name="image"
                className="form__field"
                maxLength={9}
              />
              <ErrorMessage
                name="image"
                component="div"
                className="form__error"
              /> */}
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