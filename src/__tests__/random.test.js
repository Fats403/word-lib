const { random } = require("../index.cjs");

const testTypeError = (arg) => {
  try {
    random(arg);
  } catch (err) {
    expect(err).toBeInstanceOf(TypeError);
  }
};

const testError = (arg) => {
  try {
    random(arg);
  } catch (err) {
    expect(err).toBeInstanceOf(Error);
  }
};

test("Expect valid maximum length to return lengths that are less than or equal to it", () => {
  for (let i = 3; i <= 10; i++) {
    expect(random({ maxLength: i }).length).toBeLessThanOrEqual(i);
  }
});

test("Expect out of range max length values will return error", () => {
  for (let i = -1; i <= 2; i++) {
    testError({ maxLength: i });
  }
});

test("Expect non-numbers to throw a type error", () => {
  testTypeError("1");
  testTypeError([]);
  testTypeError(null);
  testTypeError(false);
  testTypeError(undefined);
});

test("Seeded random should be deterministic", () => {
  const a1 = random({ seed: 42 });
  const a2 = random({ seed: 42 });
  const b1 = random({ seed: 1337 });
  const b2 = random({ seed: 1337 });
  expect(a1).toBe(a2);
  expect(b1).toBe(b2);
  expect(a1).not.toBe(b1);
});

test("Seeded random respects maxLength", () => {
  const w = random({ maxLength: 5, seed: 7 });
  expect(w.length).toBeLessThanOrEqual(5);
});

test("Seeded random respects minLength", () => {
  const w = random({ minLength: 7, seed: 1234 });
  expect(w.length).toBeGreaterThanOrEqual(7);
});

test("minLength must be <= maxLength", () => {
  testError({ minLength: 8, maxLength: 7 });
});
