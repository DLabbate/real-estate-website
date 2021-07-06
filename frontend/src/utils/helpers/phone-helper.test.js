import * as phoneHelper from "../../utils/helpers/phone-helper";

test("phone string is formatted correctly", () => {
  const phoneString = "1234567890";
  const phoneStringFormatted = phoneHelper.formatPhoneString(phoneString);
  expect(phoneStringFormatted).toBe("(123) 456-7890");
});
