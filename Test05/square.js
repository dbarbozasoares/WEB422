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

// regular square function
function square(n) {
  if (n === 0) return 1;
  return n * n;
}

// square function throwing error for negative numbers
function squareWithError(n) {
  if (n < 0) {
    throw new Error("Input must be non-negative");
  }
  return n * n;
}

module.exports = { square, squareWithError };
