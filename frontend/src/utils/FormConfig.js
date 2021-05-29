/**
 * @file - This file contains all the configuration and initial state used by forms throughout the app.
 * In particular, this is to be used in combination with the "Form.js" React component
 * For instance, login forms & signup forms
 */

export const loginFieldInfo = [
  { name: "Email", placeholder: "Email", type: "text" },
  { name: "Password", placeholder: "Password", type: "password" },
];

export const signupFieldInfo = [
  { name: "Name", placeholder: "Name", type: "text" },
  { name: "Lastname", placeholder: "Lastname", type: "text" },
  { name: "Email", placeholder: "Email", type: "text" },
  { name: "Password", placeholder: "Password", type: "password" },
];

/*
  The following function will create an object containing the initial state of a form, e.g.
  {
    Email : ""
    Password: ""
  }
*/
export const getInitialFormState = (fields) => {
  const fieldState = {};
  fields.forEach((item) => (fieldState[item.name] = ""));
  console.log(fieldState);
  return fieldState;
};

export const initialLoginFormState = getInitialFormState(loginFieldInfo);

export const initialSignupFormState = getInitialFormState(signupFieldInfo);
