/**
 * Formats a price string (e.g. "123456" to "$123,456")
 */

export const formatPriceString = (stringValue) => {
  let numberFormat = stringValue.replace(/\D/g, "");

  if (numberFormat === "") {
    return "";
  } else {
    // Strip of all non-numeric characters
    let numberLocaleString = Number(numberFormat).toLocaleString();
    return `$${numberLocaleString}`;
  }
};

/**
 * Converts a price string (e.g. "$123,456") to a number (e.g. 123456)
 */
export const getPriceNumber = (priceString) => {
  return parseInt(priceString.replace(/\D/g, ""));
};
