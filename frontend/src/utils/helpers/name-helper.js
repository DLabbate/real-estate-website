/**
 * Formats a name (e.g. firstName, lastName) by removing all numeric characters
 */
export const formatName = (stringValue) => {
  // Strip of all numeric characters
  const nameString = stringValue.replace(/\d/g, "");

  return nameString;
};
