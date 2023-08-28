const expressLibrary = require("express"); // Import the Express.js library

const userRouter = expressLibrary.Router(); // Create an instance of the Express router

// Import controller functions for user registration and login
const {
  userRegistrationController,
  userLoginController,
  getCurrentUserController,
  userUpdateController,
  getUserByIdController,
} = require("../controllers/UserController");

// Import middleware for handling user validation
const formValidationDefense = require("../middlewares/handleValidation");

// Import middleware functions for user registration and login validation
const {
  userRegisterValidation,
  userLoginValidation,
  userUpdateValidation,
} = require("../middlewares/userValidation");

const authGuardDefense = require("../middlewares/authGuard");

const { multerImageUpload } = require("../middlewares/imageUpload");

// Define routes for user registration and login
userRouter.post(
  "/register",
  userRegisterValidation(), // Validate user registration inputs
  formValidationDefense, // Handle overall validation result
  userRegistrationController // Handle user registration process
);

userRouter.post(
  "/login",
  userLoginValidation(), // Validate user login inputs
  formValidationDefense, // Handle overall validation result
  userLoginController // Handle user login process
);

userRouter.get("/profile", authGuardDefense, getCurrentUserController);

userRouter.get("/:pathgetUserByID", getUserByIdController);

userRouter.put(
  "/",
  authGuardDefense,
  // userUpdateValidation(),
  // Doesn't Work because of Multer. I don't know how to Fix it for the time being...
  formValidationDefense,
  multerImageUpload.single("userProfileImage"),
  userUpdateController
);

module.exports = userRouter; // Export the user router for use in other modules
