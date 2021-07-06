import React from "react";
import Button from "./Button";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("button should render with text", () => {
  const text = "Testing text...";
  const button = render(<Button text={text} />);
  expect(button.getByText(text)).toBeTruthy();
});

test("button calls onClick prop when clicked", () => {
  const handleClick = jest.fn();
  render(<Button text={"click me"} buttonHandler={handleClick} />);
  fireEvent.click(screen.getByText("click me"));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
