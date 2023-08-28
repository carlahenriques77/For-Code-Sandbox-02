// Importing the User Model from the "../models/UserModel" file
const userDetailsModel = require("../models/UserModel");

// Importing the jsonwebtoken library for token handling
const jwtLibrary = require("jsonwebtoken");

// Retrieving the JWT secret key from the environment variables
const jwtSecretKey = process.env.ENV_JWT_SECRET;

// Middleware function to handle authentication and authorization
const authGuardDefense = async (request, response, next) => {
  // Extracting the authorization header from the request
  const authHeader = request.headers["authorization"];

  // Extracting the token from the authorization header
  const authToken = authHeader && authHeader.split(" ")[1];

  // Checking if the token is missing
  if (!authToken) {
    return response.status(401).json({ authGuardError: ["Access denied"] });
  }

  // Verifying the validity of the token
  try {
    const verifyToken = jwtLibrary.verify(authToken, jwtSecretKey);

    // Retrieving the user details based on the token ID
    request.currentLoggedInUser = await userDetailsModel
      .findById(verifyToken.tokenID)
      .select("-userPassword");

    // Information:
    // [currentLoggedInUser from UserController Login]
    // [tokenID from UserController generateTokenController]
    // ["-userPassword" from Models User]

    // Proceeding to the next middleware or route handler
    next();
  } catch (error) {
    // Handling the case of an invalid token
    response.status(401).json({ authGuardError: ["Invalid Token"] });
  }
};

// Exporting the authGuardDefense middleware function
module.exports = authGuardDefense;