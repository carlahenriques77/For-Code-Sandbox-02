const { body } = require("express-validator");

// Validation for user registration
const userRegisterValidation = () => {
  return [
    // Check if display name is a string and not empty
    body("userDisplayName")
      .isString()
      .withMessage("Display name is required")
      .isLength({ min: 3 })
      .withMessage("Display name must be at least 3 characters"),

    // Check if email is a valid email format
    body("userEmail")
      .isString()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please provide a valid email address"),

    // Check if password is a string and has at least 5 characters
    body("userPassword")
      .isString()
      .withMessage("Password is required")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters"),

    // Custom validation: Check if confirmed password matches original password
    body("userConfirmPassword")
      .isString()
      .withMessage("Please confirm the password")
      .custom((confirmPassValue, { req }) => {
        if (confirmPassValue !== req.body.userPassword) {
          throw new Error("Passwords do not match");
        }
        return true;
      }),
  ];
};

// Validation for user login
const userLoginValidation = () => {
  return [
    // Check if email is a valid email format for login
    body("userEmail")
      .isString()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please provide a valid email address"),

    // Check if password is provided for login
    body("userPassword").isString().withMessage("Password is required"),
  ];
};

const userUpdateValidation = () => {
  return [
    // Check if display name is a string and not empty
    body("userDisplayName").custom((value, { req }) => {
      if (!value || value.length < 3) {
        throw new Error("Display name must be at least 3 characters");
      }
      return true;
    }),

    // Check if password is a string and has at least 5 characters
    body("userPassword")
      .optional()
      .isLength({ min: 5 })
      .withMessage("A senha precisa ter no mínimo 5 caracteres."),
  ];
};

// Export the validation functions
module.exports = {
  userRegisterValidation,
  userLoginValidation,
  userUpdateValidation,
};
