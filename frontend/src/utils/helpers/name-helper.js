/**
 * Formats a name (e.g. firstName, lastName) by removing all numeric characters
 * @param {string} stringValue - The name to be formatted (e.g. "Domenic123")
 * @returns {string} The formatted name (e.g. "Domenic")
 */
export const formatName = (stringValue) => {
  // Strip of all numeric characters
  const nameString = stringValue.replace(/[^a-z]/g, "");

  return nameString[0].charAt(0).toUpperCase() + nameString.slice(1);
};
