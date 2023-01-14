const random = require("../random");

const testTypeError = (max?: any): void => {
  try {
    random(max);
  } catch (err) {
    expect(err).toBeInstanceOf(TypeError);
  }
};

const testError = (max?: any): void => {
  try {
    random(max);
  } catch (err) {
    expect(err).toBeInstanceOf(Error);
  }
};

test("Expect valid maximum length to return lengths that are less then or equal to it", () => {
  for (let i = 3; i <= 10; i++) {
    expect(random(i).length).toBeLessThanOrEqual(i);
  }
});

test("Expect out of range max length values will return error", () => {
  for (let i: number = -1; i <= 2; i++) {
    testError(i);
  }
});

test("Expect non-numbers to throw a type error", () => {
  testTypeError("1");
  testTypeError({});
  testTypeError(null);
  testTypeError(false);
  testTypeError(undefined);
});

export {};
