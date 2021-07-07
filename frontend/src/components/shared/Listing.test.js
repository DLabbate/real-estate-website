import React from "react";
import Listing from "./Listing";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

const mockListing = {
  price: 999000,
  address: "123 Sesame Street",
  image:
    "http://cdn.home-designing.com/wp-content/uploads/2017/05/wood-white-and-charcoal-modern-exterior-paint-themes.jpg",
  owner: {
    firstName: "Domenic",
    lastName: "Labbate",
    email: "dom@gmail.com",
    phoneNumber: "(123) 456-7890",
  },
};

const addToFavorites = jest.fn();
const removeFromFavorites = jest.fn();
const deleteListing = jest.fn();

test("listing should render correctly", () => {
  const listing = render(
    <Listing
      data={mockListing}
      isFavorited={true}
      onClickIcon={addToFavorites}
    />
  );
  expect(listing.getByText("$999,000")).toBeTruthy();
  expect(listing.getByText("123 Sesame Street")).toBeTruthy();
  expect(listing.getByText("Domenic Labbate")).toBeTruthy();
  expect(listing.getByText("dom@gmail.com")).toBeTruthy();
  expect(listing.getByText("(123) 456-7890")).toBeTruthy();
  expect(listing.getByAltText("Property for Sale")).toBeTruthy();
});

test("listing variant should render correctly", () => {
  // The "publishedListing" variant should only display the price and address
  const listing = render(
    <Listing
      data={mockListing}
      variant={"publishedListing"}
      onClickIcon={deleteListing}
    />
  );
  expect(listing.getByText("$999,000")).toBeTruthy();
  expect(listing.getByText("123 Sesame Street")).toBeTruthy();
  expect(listing.queryByText("Domenic Labbate")).toBeNull();
  expect(listing.queryByText("dom@gmail.com")).toBeNull();
  expect(listing.queryByText("(123) 456-7890")).toBeNull();
  expect(listing.queryByText("Property for Sale")).toBeNull();
});

test("listing should call addToFavorites callback", () => {
  const listing = render(
    <Listing
      data={mockListing}
      isFavorited={true}
      onClickIcon={addToFavorites}
    />
  );
  fireEvent.click(listing.getByTestId("icon-heart"));
  expect(addToFavorites).toHaveBeenCalledTimes(1);
});

test("listing should call removeFromFavorites callback", () => {
  const listing = render(
    <Listing
      data={mockListing}
      isFavorited={false}
      onClickIcon={removeFromFavorites}
    />
  );
  fireEvent.click(listing.getByTestId("icon-heart"));
  expect(removeFromFavorites).toHaveBeenCalledTimes(1);
});

test("listing variant should call deleteListing callback once", () => {
  const listing = render(
    <Listing
      data={mockListing}
      variant={"publishedListing"}
      onClickIcon={deleteListing}
    />
  );
  fireEvent.click(listing.getByTestId("icon-trash"));
  expect(deleteListing).toHaveBeenCalledTimes(1);
});
