const checkWordExists = require("../checkWordExists");

test("Expect whitespace and non-valid words to return false", () => {
  expect(checkWordExists("")).toBe(false);
  expect(checkWordExists(" ")).toBe(false);
  expect(checkWordExists("z")).toBe(false);
  expect(checkWordExists("--word")).toBe(false);
  expect(checkWordExists("123456789")).toBe(false);
  expect(checkWordExists("  s p a c e d  o u t  ")).toBe(false);
});

test("Expect real words to be true (including words with whitespace)", () => {
  expect(checkWordExists("dictionary")).toBe(true);
  expect(checkWordExists("library")).toBe(true);
  expect(checkWordExists("  space  ")).toBe(true);
});

test("Expect it will throw an error if a non-string primitive is inputted", () => {
  const testError = (param: any) => {
    try {
      checkWordExists(param);
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
