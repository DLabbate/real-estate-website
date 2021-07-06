import * as priceHelper from "../../utils/helpers/price-helper";
import "@testing-library/jest-dom/extend-expect";

test("price string is formatted correctly", () => {
  const priceString = "900000";
  const priceStringFormatted = priceHelper.formatPriceString(priceString);
  expect(priceStringFormatted).toBe("$900,000");
});

test("price string is converted to number", () => {
  const priceString = "$900,000";
  const priceNumber = priceHelper.getPriceNumber(priceString);
  expect(priceNumber).toBe(900000);
});
