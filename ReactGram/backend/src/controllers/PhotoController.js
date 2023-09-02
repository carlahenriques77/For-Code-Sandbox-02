// Import required modules and libraries
const photoDetailsModel = require("../models/PhotoModel");
const mongooseLibrary = require("mongoose");
const userDetailsModel = require("../models/UserModel");

// Insert a Photo, with an User related to it
const insertPhotoController = async (request, response) => {
  const { photoTitle } = request.body;

  const photoImage = request.file.filename;

  const requestCurrentUser = request.currentLoggedInUser;

  const photoOwnerDetails = await userDetailsModel.findById(
    requestCurrentUser._id
  );

  // Create a Photo
  const newlyCreatedPhoto = await photoDetailsModel.create({
    photoTitle,
    photoImage,
    photoCreator_ID: photoOwnerDetails._id,
    photoCreatorName: photoOwnerDetails.userDisplayName,
  });

  // If Photo was Created Sucessfully, return Data
  if (!newlyCreatedPhoto) {
    response.status(422).json({
      formValidationErrors: ["An Error Occurred. Please, try again later"],
    });

    return;
  }

  response.status(201).json(newlyCreatedPhoto);
};

// Remove a Photo from DB
const deletePhotoController = async (request, response) => {
  const { pathDeletePhotoID } = request.params;

  const requestCurrentUser = request.currentLoggedInUser;

  try {
    const photoDetails = await photoDetailsModel.findById(
      new mongooseLibrary.Types.ObjectId(pathDeletePhotoID)
    );

    if (!photoDetails) {
      response.status(404).json({
        formValidationErrors: ["Photo Not Found"],
      });

      return;
    }

    // Check if Photo Belongs to the Current Logged In User
    if (!photoDetails.photoCreator_ID.equals(requestCurrentUser._id)) {
      response.status(422).json({
        formValidationErrors: [
          "An Error Occurred while trying to Acess the Photo Delete. Please, try again later.",
        ],
      });

      return;
    }

    await photoDetailsModel.findByIdAndDelete(photoDetails._id);

    response.status(200).json({
      bodyDeletePhotoID: photoDetails._id,
      backendPhotoDeleteMessage: "Photo Removed Sucessfully [Backend]",
    });
  } catch (error) {
    response.status(422).json({
      formValidationErrors: [
        "An Error Occurred while trying to Delete the Photo. Please, try again later",
      ],
    });

    return;
  }
};

// Get All Photos
const getAllPhotosController = async (request, response) => {
  const allOfThePhotos = await photoDetailsModel
    .find({})
    .sort([["createdAt", -1]])
    .exec();

  return response.status(200).json(allOfThePhotos);
};

// Get Photos from an Specific User by their ID / photoCreatort_ID
const getPhotosFromAnUserByTheirIdController = async (request, response) => {
  const { pathGetUserPhotosByUserID } = request.params;

  const userPhotos = await photoDetailsModel
    .find({ photoCreator_ID: pathGetUserPhotosByUserID })
    .sort([["createdAt", -1]])
    .exec();

  return response.status(200).json(userPhotos);
};

// Get An Specific Photo By ID
const getSpecificPhotoByIdController = async (request, response) => {
  const { pathFindPhotoID } = request.params;

  try {
    const foundPhoto = await photoDetailsModel.findById(
      new mongooseLibrary.Types.ObjectId(pathFindPhotoID)
    );

    if (!foundPhoto) {
      response.status(404).json({
        formValidationErrors: ["Photo Not Found"],
      });

      return;
    }

    return response.status(200).json(foundPhoto);
  } catch (error) {
    response.status(422).json({
      formValidationErrors:
        "An Error Occurred while trying to find the Photo. Please, try again later.",
    });

    return;
  }
};

// Update An Photo
const updatePhotoController = async (request, response) => {
  const { pathUpdatePhotoID } = request.params;

  const { photoTitle } = request.body;

  const requestCurrentUser = request.currentLoggedInUser;

  try {
    const photoDetails = await photoDetailsModel.findById(
      new mongooseLibrary.Types.ObjectId(pathUpdatePhotoID)
    );

    if (!photoDetails) {
      response.status(404).json({
        formValidationErrors: ["Photo Not Found"],
      });

      return;
    }

    // Check if Photo Belongs to the Current Logged In User
    if (!photoDetails.photoCreator_ID.equals(requestCurrentUser._id)) {
      response.status(422).json({
        formValidationErrors: [
          "An Error Occurred while trying to Access the Photo Update Feature. Please, try again later.",
        ],
      });

      return;
    }

    if (photoTitle) {
      photoDetails.photoTitle = photoTitle;
    }

    await photoDetails.save();

    response.status(200).json({
      photoDetails,
      backendUpdateMessage: "Photo Updated Sucessfully [Backend]",
      bodyUpdatePhotoID: photoDetails._id,
      bodyUpdatePhotoTitle: photoDetails.photoTitle,
    });
  } catch (error) {
    response.status(422).json({
      formValidationErrors:
        "An Error Occurred while Updating the Photo. Please, try again later.",
    });

    return;
  }
};

// Like Functionality
const likeAnPhotoController = async (request, response) => {
  const { pathLikeAnPhotoID } = request.params;

  const requestCurrentUser = request.currentLoggedInUser;

  try {
    const photoDetails = await photoDetailsModel.findById(pathLikeAnPhotoID);

    if (!photoDetails) {
      response.status(404).json({
        formValidationErrors: ["Photo Not Found"],
      });

      return;
    }

    // Check if Current Logged In User Already Liked the Photo
    const chatGPT_userIndex = photoDetails.photoLikesArray.indexOf(
      requestCurrentUser._id
    );

    if (chatGPT_userIndex !== -1) {
      // If user already liked the photo, remove their ID from the array
      photoDetails.photoLikesArray.splice(chatGPT_userIndex, 1);
    } else {
      // If user didn't like the photo, place Current User ID in the Likes Array
      photoDetails.photoLikesArray.push(requestCurrentUser._id);
    }

    await photoDetails.save();

    response.status(200).json({
      photoLikesID: pathLikeAnPhotoID,
      photoLikeCurrentUser_ID: requestCurrentUser._id,
      photoLikesSuccessMessage: "Photo Liked Sucessfully [Backend]",
    });
  } catch (error) {
    response.status(422).json({
      formValidationErrors:
        "An Error Occurred while Updating the Photo. Please, try again later.",
    });

    return;
  }
};

// Comment on a Photo Functionality
const commentOnPhotoController = async (request, response) => {
  const { pathCommentOnPhotoID } = request.params;

  const { theUserCommentText } = request.body;
  // Error: Wrong part to be passing here [Probably]. In his Code, it's called "comment"

  const requestCurrentUser = request.currentLoggedInUser;

  try {
    const userDetails = await userDetailsModel.findById(requestCurrentUser._id);

    const photoDetails = await photoDetailsModel.findById(pathCommentOnPhotoID);

    if (!photoDetails) {
      response.status(404).json({
        formValidationErrors: ["Photo Not Found"],
      });

      return;
    }

    // Put User Comment in the Array of Comments
    const currentUserComment = {
      thePhotoComment: theUserCommentText,
      commentUserDisplayName: userDetails.userDisplayName,
      commentUserProfileImage: userDetails.userProfileImage,
      commentUser_ID: userDetails._id,
    };

    // Place Current User ID in the Likes Array
    photoDetails.photoCommentsArray.push(currentUserComment);

    await photoDetails.save();

    response.status(200).json({
      newPhotoComment: currentUserComment,
      photoCommentSuccessMessage: "Comment Made Sucessfully [Backend]",
    });
  } catch (error) {
    response.status(422).json({
      formValidationErrors:
        "An Error Occurred while Updating the Photo. Please, try again later.",
    });

    return;
  }
};

// Search and Find Photos by Title
const searchPhotoByTitleController = async (request, response) => {
  const { searchQuery } = request.query;

  try {
    const searchTitleResult = await photoDetailsModel
      .find({ photoTitle: new RegExp(searchQuery, "i") })
      .exec();

    return response.status(200).json(searchTitleResult);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  insertPhotoController,
  deletePhotoController,
  getAllPhotosController,
  getPhotosFromAnUserByTheirIdController,
  getSpecificPhotoByIdController,
  updatePhotoController,
  likeAnPhotoController,
  commentOnPhotoController,
  searchPhotoByTitleController,
};
