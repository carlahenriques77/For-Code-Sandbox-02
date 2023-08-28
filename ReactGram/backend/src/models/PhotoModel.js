// Import the 'mongoose' library
const mongooseLibrary = require("mongoose");

// Destructure 'Schema' and 'ObjectId' from 'mongoose' library
const { Schema, ObjectId } = mongooseLibrary;

// Create a photo details schema
const photoDetailsSchema = new Schema(
  {
    // Define fields for photo details
    photoImage: String,
    photoTitle: String,
    photoLikesArray: Array,
    photoCommentsArray: Array,
    photoCreator_ID: mongooseLibrary.ObjectId, // Use the 'ObjectId' type for creator ID
    photoCreatorName: String,
  },
  {
    // Options for the schema
    timestamps: true, // Include timestamps for creation and modification
  }
);

// Create a photo details model using the schema
const photoDetailsModel = mongooseLibrary.model("PhotoDetailsCollection", photoDetailsSchema);

// Export the photo details model to be used by other parts of the application
module.exports = photoDetailsModel;
