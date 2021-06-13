import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./SignupForm.css";
import Button from "../shared/Button";

const SignupForm = () => {
  const initalValues = { email: "", password: "" };
  const handleValidation = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    return errors;
  };

  return (
    // <Formik
    //   initialValues={{
    //     firstName: "",
    //     lastName: "",
    //     email: "",
    //     password: "",
    //     confirmPassword: "",
    //   }}
    // ></Formik>

    <div className="form">
      <Formik
        initialValues={initalValues}
        validate={handleValidation}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="form__container">
            <Field
              type="email"
              name="email"
              className="form__field"
              placeholder="Email"
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
            />
            <ErrorMessage
              name="password"
              component="div"
              className="form__error"
            />
            {/* <button type="submit" disabled={isSubmitting}>
              Submit
            </button> */}
            <Button
              text={"Signup"}
              width={"90%"}
              margin={"10px"}
              modifiers={"btn--solid btn--white"}
              buttonHandler={() => {}}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupForm;
