function sum(numbers) {
  if (!Array.isArray(numbers)) {
    throw new TypeError('sum() 只接受陣列');
  }
  return numbers.reduce((total, n) => total + n, 0);
}
module.exports = { sum };
