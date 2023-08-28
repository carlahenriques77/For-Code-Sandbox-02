const { validationResult } = require("express-validator");

// Middleware for handling user validation
const formValidationDefense = (request, response, next) => {
  // Get validation errors from the request
  const formValidationErrors = validationResult(request);

  // If there are no validation errors, move to the next middleware
  if (formValidationErrors.isEmpty()) {
    return next();
  }

  // If there are validation errors, extract and format them
  const extractedErrors = [];

  // Convert validation error messages into an array
  formValidationErrors.array().map((mapItem) => extractedErrors.push(mapItem.msg));

  // Send a response with the formatted validation errors
  return response.status(422).json({
    formValidationErrors: extractedErrors,
  });
};

module.exports = formValidationDefense;
