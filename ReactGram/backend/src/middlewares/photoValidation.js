const { body } = require("express-validator");

const photoInsertValidation = () => {
  return [
    // Check if display name is a string and not empty
    body("photoTitle")
      .not()
      .equals("undefined")
      .withMessage("Photo Title is required")
      .isString()
      .withMessage("Photo Title is required")
      .isLength({ min: 3 })
      .withMessage("Photo Title must be at least 3 characters"),

    // Check if email is a valid email format
    body("photoImage").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("The Image is required");
      }

      return true;
    }),
  ];
};

const photoUpdateValidation = () => {
  return [
    // Check if display name is a string and not empty
    body("photoTitle")
      .not()
      .equals("undefined")
      .withMessage("Photo Title is required")
      .isString()
      .withMessage("Photo Title is required")
      .isLength({ min: 3 })
      .withMessage("Photo Title must be at least 3 characters"),
  ];
};

const photoCommentValidation = () => {
  return [
    // Check if display name is a string and not empty
    body("photoCommentsArray")
      .isString()
      .withMessage("The Comment is required"),
  ];
};

module.exports = {
  photoInsertValidation,
  photoUpdateValidation,
  photoCommentValidation,
};
