import * as nameHelper from "../../utils/helpers/name-helper";

test("name is formatted correctly", () => {
  const nameToFormat = "12!@domenic17";
  const nameFormatted = nameHelper.formatName(nameToFormat);
  expect(nameFormatted).toBe("Domenic");
});
