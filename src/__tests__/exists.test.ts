import { exists } from "../exists";

test("Expect whitespace and non-valid words to return false", () => {
  expect(exists("")).toBe(false);
  expect(exists(" ")).toBe(false);
  expect(exists("z")).toBe(false);
  expect(exists("--word")).toBe(false);
  expect(exists("123456789")).toBe(false);
  expect(exists("  s p a c e d  o u t  ")).toBe(false);
});

test("Expect real words to be true (including words with whitespace)", () => {
  expect(exists("dictionary")).toBe(true);
  expect(exists("library")).toBe(true);
  expect(exists("  space  ")).toBe(true);
});

test("Expect it to return false if text is a single character and allowOneLetterWords is false", () => {
  expect(exists("a")).toBe(false);
  expect(exists("i")).toBe(false);
});

test("Expect it to return true if text is 'i' or 'a' and allowOneLetterWords is true", () => {
  expect(exists("i", { allowOneLetterWords: true })).toBe(true);
  expect(exists("a", { allowOneLetterWords: true })).toBe(true);
});

test("Expect it will throw an error if a non-string primitive is inputted", () => {
  const testError = (param: any): void => {
    try {
      exists(param);
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
