/********************************************************************************
 * WEB422 – Test 05
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 * https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 * Name: Diego B Soares Student ID: ____145820239____ Date: __Apr - 04 - 2025_______
 * Published URL: _________________https://github.com/dbarbozasoares/WEB422/tree/main__________________________________________
 ********************************************************************************/

const functions = require("./square");

// Question 1
const numbers = [-2, -7, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Helper function just to avoid repetitive zero checkers
const zeroChecker = (n) => {
  return n === 0;
};

// Simple square test
numbers.map((n) => {
  test(`Square of ${n} to equal ${zeroChecker(n) ? 1 : n * n}`, () => {
    expect(functions.square(n)).toBe(zeroChecker(n) ? 1 : n * n);
  });
});

// Question 2
// Explain in your own words what the expect function and the toBe matcher do in a Jest test. Why are these assertions important when writing tests?
// Answer: Well, first of all it allows us to do the basic comparison tests with raw data, it uses === to compare and also performs unit test making our test efficient since we can set things like max/min boundaries, max/min length for many cases isolated and separately.

// Question 3
// List one key benefit of unit testing in the software development process, especially in terms of catching bugs early.
// Answer: Well, as I already mentioned on question 2, it allows to perform edges and boundaries tests and various user/client inputs like max/min values, max/min length and any possible data the user might input, doing in a unit test one by one. Doing it early, we can avoid future "simple" problems coming from user/client.

// Question 4 (A) checking for any error with Error type
numbers.map((n) => {
  test(`Compile square with negative number, checking ${n} should ${
    n < 0 ? "Throw" : "Not Throw"
  }`, () => {
    const currentNumber = () => functions.squareWithError(n);
    if (n < 0) {
      expect(currentNumber).toThrow(Error);
    } else {
      expect(currentNumber).not.toThrow(Error);
    }
  });
});

// Question 4 (B) checking for any error with exact Error message
numbers.map((n) => {
  test(`Compile square with negative number, checking ${n} should ${
    n < 0 ? "Throw" : "Not Throw"
  }`, () => {
    const currentNumber = () => functions.squareWithError(n);
    if (n < 0) {
      expect(currentNumber).toThrow(/^Input must be non-negative$/);
    } else {
      expect(currentNumber).not.toThrow(/^Input must be non-negative$/);
    }
  });
});

// Question 4 (C) checking for any error that includes certain string
numbers.map((n) => {
  test(`Compile square with negative number, checking ${n} should ${
    n < 0 ? "Throw" : "Not Throw"
  }`, () => {
    const currentNumber = () => functions.squareWithError(n);
    if (n < 0) {
      expect(currentNumber).toThrow("non-negative");
    } else {
      expect(currentNumber).not.toThrow("non-negative");
    }
  });
});
