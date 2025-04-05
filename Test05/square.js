// square.js
function square(n) {
  if (n === 0) return 1;
  return n * n;
}

function squareWithError(n) {
  if (n < 0) {
    throw new Error("Input must be non-negative");
  }
  return n * n;
}

module.exports = { square, squareWithError };
