/**
 * Formats a phoneNumber string (e.g. "1234567890" to "(123) 456-7890")
 */
export const formatPhoneString = (stringValue) => {
  // Strip of all non-numeric characters
  let phoneNumberString = stringValue.replace(/\D/g, "");

  if (phoneNumberString === "") {
    return "";
  } else {
    // returns: "x", "xx", "xxx"
    if (phoneNumberString.length < 4) return phoneNumberString;

    // returns: "(xxx)", "(xxx) x", "(xxx) xx", "(xxx) xxx",
    if (phoneNumberString.length < 7)
      return `(${phoneNumberString.slice(0, 3)}) ${phoneNumberString.slice(3)}`;

    // returns: "(xxx) xxx-", (xxx) xxx-x", "(xxx) xxx-xx", "(xxx) xxx-xxx", "(xxx) xxx-xxxx"
    return `(${phoneNumberString.slice(0, 3)}) ${phoneNumberString.slice(
      3,
      6
    )}-${phoneNumberString.slice(6, 10)}`;
  }
};
