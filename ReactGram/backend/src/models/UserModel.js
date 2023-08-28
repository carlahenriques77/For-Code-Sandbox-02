// Import the 'mongoose' library
const mongooseLibrary = require("mongoose");

// Destructure 'Schema' from 'mongoose' library
const { Schema } = mongooseLibrary;

// Create a user details schema
const userDetailsSchema = new Schema(
  {
    // Define fields for user details
    userDisplayName: String,
    userEmail: String,
    userPassword: String,
    userProfileImage: String,
    userBio: String,
  },
  {
    // Options for the schema
    timestamps: true, // Include timestamps for creation and modification
  }
);

// Create a user details model using the schema
const userDetailsModel = mongooseLibrary.model("UserDetailsCollection", userDetailsSchema);

// Export the user details model to be used by other parts of the application
module.exports = userDetailsModel;
