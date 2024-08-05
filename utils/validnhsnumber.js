const isValidNHSNumber = (nhs_num) => {
  // regex to check if the NHS number is exactly 10 digits long
  if (!/^\d{10}$/.test(nhs_num)) {
    return false;
  }
  const digits = nhs_num.split("").map(Number);
  const checkDigit = digits.pop();
  const weights = [10, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = digits.reduce(
    (acc, digit, index) => acc + digit * weights[index],
    0
  );

  // calculate the remainder when the sum is divided by 11
  const remainder = sum % 11;
  const calculatedCheckDigit = remainder === 0 ? 0 : 11 - remainder;

  return calculatedCheckDigit === checkDigit;
};

module.exports = isValidNHSNumber;
