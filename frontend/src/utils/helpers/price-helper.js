/**
 * Formats a price string (e.g. "123456" to "$123,456")
 * @param {string} stringValue - The price to format (e.g. "123456")
 * @returns {string} The formatted price (e.g. "$123,456")
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
 * Converts a price string to a number
 * @param {string} priceString - The price string to be formatted (e.g. "123456")
 * @returns {number} The price as a number (e.g. 123456)
 */
export const getPriceNumber = (priceString) => {
  return parseInt(priceString.replace(/\D/g, ""));
};
