import * as phoneHelper from "../../utils/helpers/phone-helper";

test("phone number is formatted correctly", () => {
  const phoneToFormat = "1234567890";
  const phoneFormatted = phoneHelper.formatPhoneString(phoneToFormat);
  expect(phoneFormatted).toBe("(123) 456-7890");
});
