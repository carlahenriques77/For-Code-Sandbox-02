// Import required modules and libraries
const userDetailsModel = require("../models/UserModel");
const mongooseLibrary = require("mongoose");
const bcryptLibrary = require("bcryptjs");
const jwtLibrary = require("jsonwebtoken");
const jwtSecretKey = process.env.ENV_JWT_SECRET;

// Generate User Token
const generateTokenController = (tokenID) => {
  return jwtLibrary.sign({ tokenID }, jwtSecretKey, {
    expiresIn: "7d", // Token expiration time: 7 days
  });
};

// Handle User Registration and Sign In
const userRegistrationController = async (request, response) => {
  const { userDisplayName, userEmail, userPassword } = request.body;

  // Check if User Exists
  const existingRegisteredUser = await userDetailsModel.findOne({ userEmail });

  // If user already exists, return an error response
  if (existingRegisteredUser) {
    response
      .status(422)
      .json({ formValidationErrors: ["Email Already in Use"] });

    return;
  }

  // Generate Password Hash
  const saltForHash = await bcryptLibrary.genSalt();
  const hashedPassword = await bcryptLibrary.hash(userPassword, saltForHash);

  // Create User
  const newlyCreatedUser = await userDetailsModel.create({
    userDisplayName,
    userEmail,
    userPassword: hashedPassword,
  });

  // If User was Created Successfully, return the Token
  if (!newlyCreatedUser) {
    response.status(422).json({
      formValidationErrors: ["An Error Occurred. Please, try again later"],
    });

    return;
  }

  // Return User ID and Token in response
  response.status(201).json({
    user_ID: newlyCreatedUser._id,
    userToken: generateTokenController(newlyCreatedUser._id),
  });
};

// Handle User Login
const userLoginController = async (request, response) => {
  const { userEmail, userPassword } = request.body;

  // Check if User Exists
  const currentLoggedInUser = await userDetailsModel.findOne({ userEmail });

  // If user doesn't exist, return an error response
  if (!currentLoggedInUser) {
    response
      .status(404)
      .json({ formValidationErrors: ["User Email doesn't Exist"] });

    return;
  }

  // Check if Password Matches
  if (
    !(await bcryptLibrary.compare(userPassword, currentLoggedInUser.userPassword))
  ) {
    response.status(422).json({ formValidationErrors: ["Wrong Password"] });

    return;
  }

  // Return User ID, Profile Image, and Token in response
  response.status(201).json({
    user_ID: currentLoggedInUser._id,
    userProfileImage: currentLoggedInUser.userProfileImage,
    userToken: generateTokenController(currentLoggedInUser._id),
  });
};

// Get Current Logged In User
const getCurrentUserController = async (request, response) => {
  const currentLoggedUser = request.currentLoggedInUser;

  response.status(200).json(currentLoggedUser);
};

// Update User
const userUpdateController = async (request, response) => {
  const { userDisplayName, userPassword, userBio } = request.body;

  try {
    let userProfileImage = null;

    if (request.file) {
      userProfileImage = request.file.filename;
    }

    const requestUser = request.currentLoggedInUser;

    const updatingUser = await userDetailsModel
      .findById(new mongooseLibrary.Types.ObjectId(requestUser._id))
      .select("-userPassword");

    if (!updatingUser) {
      return response.status(404).json({
        formValidationErrors: ["User not found"],
      });
    }

    if (userDisplayName) {
      updatingUser.userDisplayName = userDisplayName;
    }

    if (userPassword) {
      const saltForHash = await bcryptLibrary.genSalt();
      const hashedPassword = await bcryptLibrary.hash(
        userPassword,
        saltForHash
      );

      updatingUser.userPassword = hashedPassword;
    }

    if (userProfileImage) {
      updatingUser.userProfileImage = userProfileImage;
    }

    if (userBio) {
      updatingUser.userBio = userBio;
    }

    await updatingUser.save();

    return response.status(200).json(updatingUser);
  } catch (error) {
    return response.status(500).json({
      error: "True Error: " + error.message + " / Fake Error: ",
    });
  }
};

// Get User By ID
const getUserByIdController = async (request, response) => {
  const { pathgetUserByID } = request.params;

  try {
    const getUserFromID = await userDetailsModel
      .findById(new mongooseLibrary.Types.ObjectId(pathgetUserByID))
      .select("-userPassword");

    // If user doesn't exist, return an error response
    if (!getUserFromID) {
      response.status(404).json({ formValidationErrors: ["User not found"] });
      return;
    }

    response.status(200).json(getUserFromID);
  } catch (error) {
    response.status(404).json({ formValidationErrors: ["User not found"] });

    return;
  }
};

// Export the functions for use in other modules
module.exports = {
  userRegistrationController,
  userLoginController,
  getCurrentUserController,
  userUpdateController,
  getUserByIdController,
};
