const wordLib = require("../index.cjs");

test("Expect whitespace and non-valid words to return false", () => {
  expect(wordLib.exists("")).toBe(false);
  expect(wordLib.exists(" ")).toBe(false);
  expect(wordLib.exists("z")).toBe(false);
  expect(wordLib.exists("--word")).toBe(false);
  expect(wordLib.exists("123456789")).toBe(false);
  expect(wordLib.exists("  s p a c e d  o u t  ")).toBe(false);
});

test("Expect real words to be true (including words with whitespace)", () => {
  expect(wordLib.exists("dictionary")).toBe(true);
  expect(wordLib.exists("library")).toBe(true);
  expect(wordLib.exists("  space  ")).toBe(true);
});

test("Expect it to return false if text is a single character and allowOneLetterWords is false", () => {
  expect(wordLib.exists("a")).toBe(false);
  expect(wordLib.exists("i")).toBe(false);
});

test("Expect it to return true if text is 'i' or 'a' and allowOneLetterWords is true", () => {
  expect(wordLib.exists("i", { allowOneLetterWords: true })).toBe(true);
  expect(wordLib.exists("a", { allowOneLetterWords: true })).toBe(true);
});

test("Expect it will throw an error if a non-string primitive is inputted", () => {
  const testError = (param) => {
    try {
      wordLib.exists(param);
    } catch (err) {
      expect(err).toBeInstanceOf(TypeError);
    }
  };

  testError(1);
  testError(1.0);
  testError({});
  testError(null);
  testError(false);
  testError(undefined);
});
