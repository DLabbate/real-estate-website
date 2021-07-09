import React from "react";
import SignupForm from "./SignupForm";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import * as userApi from "../../utils/api/user-api";
import { BrowserRouter as Router } from "react-router-dom";

// Mock the module
jest.mock("../../utils/api/user-api");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

test("signup form should render correctly", () => {
  // Wrap inside a router or else we will get an error --> [Error: Invariant failed: You should not use <Link> outside a <Router>]
  const { container, getByText } = render(
    <Router>
      <SignupForm />
    </Router>
  );

  // Inputs
  const firstName = container.querySelector('input[name="firstName"]');
  const lastName = container.querySelector('input[name="lastName"]');
  const phoneNumber = container.querySelector('input[name="phoneNumber"]');
  const email = container.querySelector('input[name="email"]');
  const password = container.querySelector('input[name="password"]');

  // Button
  const button = getByText("Signup", { selector: "button" });

  // Link to SignupForm
  const alternativeLink = getByText("Already have an account? Login.", {
    selector: "a",
  });

  expect(firstName).toBeTruthy();
  expect(lastName).toBeTruthy();
  expect(phoneNumber).toBeTruthy();
  expect(email).toBeTruthy();
  expect(password).toBeTruthy();
  expect(button).toBeTruthy();
  expect(alternativeLink).toBeTruthy();
});

test("signup form should display success message", async () => {
  // Mock the return value of fetch
  userApi.signup.mockReturnValue(
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve("Signup success!"),
    })
  );

  // Wrap inside a router or else we will get an error --> [Error: Invariant failed: You should not use <Link> outside a <Router>]
  const { container } = render(
    <Router>
      <SignupForm />
    </Router>
  );
  const firstName = container.querySelector('input[name="firstName"]');
  const lastName = container.querySelector('input[name="lastName"]');
  const phoneNumber = container.querySelector('input[name="phoneNumber"]');
  const email = container.querySelector('input[name="email"]');
  const password = container.querySelector('input[name="password"]');

  fireEvent.change(firstName, {
    target: {
      value: "Domenic",
    },
  });

  fireEvent.change(lastName, {
    target: {
      value: "Labbate",
    },
  });

  fireEvent.change(phoneNumber, {
    target: {
      value: "(123) 456-7890",
    },
  });

  fireEvent.change(email, {
    target: {
      value: "domlabb123@gmail.com",
    },
  });

  fireEvent.change(password, {
    target: {
      value: "s8db391n",
    },
  });

  fireEvent.click(screen.getByText("Signup", { selector: "button" }));

  // When in need to wait for any period of time you can use waitFor
  await waitFor(() => {
    expect(userApi.signup).toHaveBeenCalledTimes(1);
    expect(screen.queryByText(/signup success!/i)).toBeTruthy();
  });
});

test("signup form should display error message", async () => {
  // Mock the return value of fetch
  userApi.signup.mockReturnValue(
    Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ error: { message: "Signup failed!" } }),
    })
  );

  // Wrap inside a router or else we will get an error --> [Error: Invariant failed: You should not use <Link> outside a <Router>]
  const { container } = render(
    <Router>
      <SignupForm />
    </Router>
  );
  const firstName = container.querySelector('input[name="firstName"]');
  const lastName = container.querySelector('input[name="lastName"]');
  const phoneNumber = container.querySelector('input[name="phoneNumber"]');
  const email = container.querySelector('input[name="email"]');
  const password = container.querySelector('input[name="password"]');

  fireEvent.change(firstName, {
    target: {
      value: "Domenic",
    },
  });

  fireEvent.change(lastName, {
    target: {
      value: "Labbate",
    },
  });

  fireEvent.change(phoneNumber, {
    target: {
      value: "(123) 456-7890",
    },
  });

  fireEvent.change(email, {
    target: {
      value: "domlabb123@gmail.com",
    },
  });

  fireEvent.change(password, {
    target: {
      value: "s8db391n",
    },
  });

  fireEvent.click(screen.getByText("Signup", { selector: "button" }));

  // When in need to wait for any period of time you can use waitFor
  await waitFor(() => {
    expect(userApi.signup).toHaveBeenCalledTimes(1);
    expect(screen.queryByText(/signup failed!/i)).toBeTruthy();
  });
});
