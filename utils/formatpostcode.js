const formatPostcode = (postcode) => {
  // normalize postcode to uppercase and remove spaces
  const normalizedPostcode = postcode.replace(/\s+/g, "").toUpperCase();

  // comprehensive regex pattern to cover various postcode formats
  const postcodeRegex = /^([A-Z]{1,2}\d{1,2}[A-Z]?)\s?(\d[A-Z]{2})$/;

  // check if the postcode matches the valid pattern
  const match = normalizedPostcode.match(postcodeRegex);

  if (match) {
    return `${match[1]} ${match[2]}`;
  } else {
    throw new Error(`Invalid postcode format: ${normalizedPostcode}`);
  }
};

module.exports = formatPostcode;
