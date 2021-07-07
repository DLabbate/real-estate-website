import React from "react";
import LoginForm from "./LoginForm";
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

test("login form should display success message", async () => {
  // Mock the return value of fetch
  userApi.login.mockReturnValue(
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve("login success!"),
    })
  );

  // Wrap inside a router or else we will get an error --> [Error: Invariant failed: You should not use <Link> outside a <Router>]
  const { container } = render(
    <Router>
      <LoginForm />
    </Router>
  );

  const email = container.querySelector('input[name="email"]');
  const password = container.querySelector('input[name="password"]');

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

  fireEvent.click(screen.getByText("Login", { selector: "button" }));

  // When in need to wait for any period of time you can use waitFor
  await waitFor(() => {
    expect(userApi.login).toHaveBeenCalledTimes(1);
    expect(screen.queryByText(/login success!/i)).toBeTruthy();
  });
});

test("login form should display error message", async () => {
  // Mock the return value of fetch
  userApi.login.mockReturnValue(
    Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ error: { message: "Auth failed!" } }),
    })
  );

  // Wrap inside a router or else we will get an error --> [Error: Invariant failed: You should not use <Link> outside a <Router>]
  const { container } = render(
    <Router>
      <LoginForm />
    </Router>
  );

  const email = container.querySelector('input[name="email"]');
  const password = container.querySelector('input[name="password"]');

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

  fireEvent.click(screen.getByText("Login", { selector: "button" }));

  // When in need to wait for any period of time you can use waitFor
  await waitFor(() => {
    expect(userApi.login).toHaveBeenCalledTimes(1);
    expect(screen.queryByText(/auth failed!/i)).toBeTruthy();
  });
});
