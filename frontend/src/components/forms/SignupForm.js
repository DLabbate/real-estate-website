import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./SignupForm.css";
import Button from "../shared/Button";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";

const SignupForm = () => {
  // This state keeps track of if the user has submitted a request to the REST API
  const [submitted, setSubmitted] = useState(false);

  // This state keeps track of whether or not the REST API returns a successful response
  const [success, setSuccess] = useState(false);

  let history = useHistory();

  const initalValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
  };

  const validate = Yup.object({
    firstName: Yup.string()
      .max(20, "Must be 15 characters or less")
      .required("First Name is required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Last Name is required"),
    phoneNumber: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Phone Number is required"),
    email: Yup.string()
      .email("Invalid email addresss")
      .max(40, "Must be 20 characters or less")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Must be 20 characters or less")
      .required("Password is required"),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitted(true);
    setSuccess(true);
    setTimeout(() => {
      //alert(JSON.stringify(values, null, 2));
      setSubmitting(false);

      history.push("/login");
    }, 2000);
  };

  return (
    <>
      <div className="form">
        <Formik
          initialValues={initalValues}
          validationSchema={validate}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="form__container">
              <Field
                type="text"
                name="firstName"
                className="form__field"
                placeholder="First Name"
                maxLength={20}
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="form__error"
              />
              <Field
                type="text"
                name="lastName"
                className="form__field"
                placeholder="Last Name"
                maxLength={20}
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="form__error"
              />
              <Field
                type="text"
                name="phoneNumber"
                className="form__field"
                placeholder="Phone Number"
                maxLength={20}
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="form__error"
              />
              <Field
                type="email"
                name="email"
                className="form__field"
                placeholder="Email"
                maxLength={40}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="form__error"
              />
              <Field
                type="password"
                name="password"
                className="form__field"
                placeholder="Password"
                maxLength={20}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="form__error"
              />
              <Button
                text={"Signup"}
                width={"90%"}
                margin={"10px"}
                modifiers={"btn--text-white btn--background-black"}
                buttonHandler={() => {}}
              />
              <Link className="form__link" to={"/login"}>
                <p className="form__alternative">
                  {"Already have an account? Login."}
                </p>
              </Link>
            </Form>
          )}
        </Formik>
      </div>

      <div className={submitted && success ? "result" : "result result--none"}>
        <FiCheckCircle size={35} className={"icon-success"} />
        <p>Signup success!</p>
      </div>
    </>
  );
};

export default SignupForm;
