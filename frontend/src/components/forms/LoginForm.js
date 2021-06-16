import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./Form.css";
import Button from "../shared/Button";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { FiXCircle, FiCheckCircle } from "react-icons/fi";
import * as userApi from "../../utils/api/user-api";

const LoginForm = () => {
  // This state keeps track of if the user has submitted a request to the REST API
  const [sentRequest, setSentRequest] = useState(false);

  // This state keeps track of whether or not the REST API returns a successful response
  const [success, setSuccess] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  let history = useHistory();

  const initalValues = {
    email: "",
    password: "",
  };

  const validate = Yup.object({
    email: Yup.string()
      .email("Invalid email addresss")
      .max(30, "Must be 30 characters or less")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Must be 20 characters or less")
      .required("Password is required"),
  });

  const login = async (values) => {
    try {
      const response = await userApi.login(values);
      const responseJson = await response.json();
      console.log("REST API Response: ", responseJson);

      // Check if the status code is 200-299
      if (response.ok) {
        console.log("Login success");
        setSuccess(true);
        localStorage.setItem("user", JSON.stringify(responseJson));

        setTimeout(() => {
          history.push("/home");
        }, 500);
      } else {
        console.log("Login failed");
        setErrorMessage(responseJson.error.message);
        setSuccess(false);
      }
    } catch (err) {
      console.log("Login failed");
      setSuccess(false);
      setErrorMessage(err);
    } finally {
      setSentRequest(true);
    }
  };

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    login(values);
  };

  const renderResultMessage = () => {
    if (sentRequest && success) {
      return (
        <div className={"result result--background-lightgreen"}>
          <FiCheckCircle size={35} className={"icon icon--green"} />
          <p>Login success!</p>
        </div>
      );
    } else if (sentRequest && !success) {
      return (
        <div className={"result result--background-lightpink"}>
          <FiXCircle size={35} className={"icon icon--pink"} />
          <p>{errorMessage}</p>
        </div>
      );
    } else {
      return (
        <div className={"result result--hidden"}>
          <FiXCircle size={35} className={"icon"} />
          <p>{errorMessage}</p>
        </div>
      );
    }
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
                type="email"
                name="email"
                className="form__field"
                placeholder="Email"
                maxLength={30}
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
                text={"Login"}
                width={"90%"}
                margin={"10px"}
                modifiers={"btn--text-white btn--background-black"}
              />
              <Link className="form__link" to={"/signup"}>
                <p className="form__alternative">
                  {"Don't have an account? Signup."}
                </p>
              </Link>
            </Form>
          )}
        </Formik>
      </div>
      {renderResultMessage()}
    </>
  );
};

export default LoginForm;
