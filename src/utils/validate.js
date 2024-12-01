const validate = require("validator");

function validateSignup(req) {
  const userKeys = Object.keys(req.body);
  const requiredFields = ["name", "phone", "email", "password"];
  const missingFields = requiredFields.filter(
    (field) => !userKeys.includes(field)
  );

  if (missingFields.length > 0) {
    throw new Error(
      `The following mandatory fields are missing: ${missingFields.join(", ")}`
    );
  }
}

function validateProfileEdit(data) {
  const { gender, fullName, country } = data;

  if (!gender && !fullName && !country) {
    return "At least one field must be provided to modify your profile.";
  }

  if (
    gender &&
    !["male", "female", "others"].includes(gender.trim().toLowerCase())
  ) {
    return "Gender must be one of the following: 'male', 'female', or 'others'.";
  }

  if (fullName && fullName.trim().length < 2) {
    return "Full name must have at least 2 characters.";
  }

  if (country && country.trim().length < 2) {
    return "Country name must have at least 2 characters.";
  }

  return null;
}

module.exports = {
  validateSignup,
  validateProfileEdit,
};
