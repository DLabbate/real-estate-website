import * as nameHelper from "../../utils/helpers/name-helper";

test("name is formatted correctly", () => {
  const nameString = "12!@domenic17";
  const nameStringFormatted = nameHelper.formatName(nameString);
  expect(nameStringFormatted).toBe("Domenic");
});
