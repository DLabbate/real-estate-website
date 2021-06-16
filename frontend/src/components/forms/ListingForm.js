import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./Form.css";
import Button from "../shared/Button";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import * as userApi from "../../utils/api/user-api";

const ListingForm = () => {
  // This state keeps track of if the user has submitted a request to the REST API
  const [sentRequest, setSentRequest] = useState(false);

  // This state keeps track of whether or not the REST API returns a successful response
  const [success, setSuccess] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  let history = useHistory();

  const initalValues = {
    address: "",
    price: null,
  };

  const validate = Yup.object({
    address: Yup.string()
      .max(40, "Must be 40 characters or less")
      .required("Address is required"),
    price: Yup.number()
      .max(999999999, "Must be 10 characters or less")
      .required("Price is required")
      .positive()
      .integer(),
  });

  const createListing = async (values) => {
    try {
    } catch (err) {
    } finally {
    }
  };

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
  };

  return (
    <>
      <div className="form form--background-white form--shadow">
        <Formik
          initialValues={initalValues}
          validationSchema={validate}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
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
                type="text"
                name="price"
                className="form__field form__field--lightgrey"
                placeholder="Price"
                maxLength={9}
              />
              <ErrorMessage
                name="price"
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
