import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./Form.css";
import Button from "../shared/Button";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import * as userApi from "../../utils/api/user-api";

const LoginForm = () => {
  // This state keeps track of if the user has submitted a request to the REST API
  const [submitted, setSubmitted] = useState(false);

  // This state keeps track of whether or not the REST API returns a successful response
  const [success, setSuccess] = useState(false);

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

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitted(true);

    setTimeout(() => {
      setSubmitting(false);

      history.push("/login");
    }, 2000);
  };

  const renderResultMessage = () => {
    if (submitted && !success) {
      return (
        <div className={"result result--background-lightpink"}>
          <FiXCircle size={35} className={"icon icon--pink"} />
          <p>Error: Email already taken!</p>
        </div>
      );
    } else {
      return (
        <div className={"result result--hidden"}>
          <FiXCircle size={35} className={"icon"} />
          <p>Error: Email already taken!</p>
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
                  {"Don't have an account? Login."}
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
