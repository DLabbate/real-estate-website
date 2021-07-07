import React from "react";
import Button from "./Button";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

// Constants
const handleClick = jest.fn();
const text = "click me";

// Variables
let button;

beforeEach(() => {
  button = render(<Button text={text} buttonHandler={handleClick} />);
});

test("button should render with text", () => {
  expect(button.getByText(text)).toBeTruthy();
});

test("button calls onClick prop when clicked", () => {
  fireEvent.click(screen.getByText(/click me/i));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
