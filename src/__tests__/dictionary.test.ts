import {
  getDictionary,
  setLanguage,
  dictionaries,
  currentLanguage,
} from "../dictionary";

describe("getDictionary", () => {
  it("should return the dictionary of the current language", () => {
    setLanguage("en");
    expect(getDictionary()).toEqual(dictionaries["en"]);
  });
});

describe("setLanguage", () => {
  it("should set the language when passed a valid language code", () => {
    setLanguage("en");
    expect(currentLanguage).toEqual("en");
  });

  it("should throw an error when passed a non-string value", () => {
    expect(() => setLanguage(123)).toThrowError(TypeError);
  });

  it("should throw an error when passed a language code with more or less than two letters", () => {
    expect(() => setLanguage("en-us")).toThrowError(Error);
    expect(() => setLanguage("e")).toThrowError(Error);
  });

  it("should throw an error when passed a language code that is not in the allowedLanguages array", () => {
    expect(() => setLanguage("fr")).toThrowError(Error);
  });
});
