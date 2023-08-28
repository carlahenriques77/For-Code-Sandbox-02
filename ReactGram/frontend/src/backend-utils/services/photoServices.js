import { serverHost, generateRequestConfig } from "../utils/config";

// Publish a photo on the server
const publishPhotoService = async (photoData, userToken) => {
  // Create request settings using the provided data
  const requestSettings = generateRequestConfig(
    "POST", // HTTP method
    photoData, // Data to be sent
    userToken, // User authentication token
    true // Include credentials
  );

  try {
    // Send a POST request to publish the photo
    const fetchPhotoData = await fetch(`${serverHost}/photos`, requestSettings)
      .then((response) => response.json()) // Parse response as JSON
      .catch((error) => error); // Catch any network or parsing errors

    return fetchPhotoData; // Return the fetched photo data
  } catch (error) {
    // Log any caught errors to the console
    console.log(error);
  }
};

// Get photos associated with a user by their ID
const getUserPhotosByUserIdService = async (userID, userToken) => {
  // Create request settings using the provided data
  const requestSettings = generateRequestConfig("GET", null, userToken);

  try {
    // Send a GET request to retrieve user's photos
    const fetchPhotoData = await fetch(
      `${serverHost}/photos/user/${userID}`,
      requestSettings
    )
      .then((response) => response.json()) // Parse response as JSON
      .catch((error) => error); // Catch any network or parsing errors

    return fetchPhotoData; // Return the fetched photo data
  } catch (error) {
    // Log any caught errors to the console
    console.log(error);
  }
};

// Delete a photo by its ID
const deleteUserPhotoService = async (photoID, userToken) => {
  // Create request settings using the provided data
  const requestSettings = generateRequestConfig("DELETE", null, userToken);

  try {
    // Send a DELETE request to delete the photo
    const fetchPhotoData = await fetch(
      `${serverHost}/photos/${photoID}`,
      requestSettings
    )
      .then((response) => response.json()) // Parse response as JSON
      .catch((error) => error); // Catch any network or parsing errors

    return fetchPhotoData; // Return the fetched photo data
  } catch (error) {
    // Log any caught errors to the console
    console.log(error);
  }
};

// Update a photo's information
const updatePhotoService = async (photoData, updatePhotoID, userToken) => {
  // Create request settings using the provided data
  const requestSettings = generateRequestConfig("PUT", photoData, userToken);

  try {
    // Send a PUT request to update the photo
    const fetchPhotoData = await fetch(
      `${serverHost}/photos/${updatePhotoID}`,
      requestSettings
    )
      .then((response) => response.json()) // Parse response as JSON
      .catch((error) => error); // Catch any network or parsing errors

    return fetchPhotoData; // Return the fetched photo data
  } catch (error) {
    // Log any caught errors to the console
    console.log(error);
  }
};

// Get a specific photo using its ID
const getPhotoUsingPhotoIdService = async (photoID, userToken) => {
  // Create request settings using the provided data
  const requestSettings = generateRequestConfig("GET", null, userToken);

  console.log("userToken Test 01:", userToken)

  try {
    // Send a GET request to retrieve the specific photo
    const fetchPhotoData = await fetch(
      `${serverHost}/photos/${photoID}`,
      requestSettings
    )
      .then((response) => response.json()) // Parse response as JSON
      .catch((error) => error); // Catch any network or parsing errors

    return fetchPhotoData; // Return the fetched photo data
  } catch (error) {
    // Log any caught errors to the console
    console.log(error);
  }
};

// Like a photo using its ID
const likeAnPhotoService = async (likePhotoID, userToken) => {
  // Create request settings using the provided data
  const requestSettings = generateRequestConfig("PUT", null, userToken);

  try {
    // Send a PUT request to like the photo
    const fetchPhotoData = await fetch(
      `${serverHost}/photos/like/${likePhotoID}`,
      requestSettings
    )
      .then((response) => response.json()) // Parse response as JSON
      .catch((error) => error); // Catch any network or parsing errors

    return fetchPhotoData; // Return the fetched photo data
  } catch (error) {
    // Log any caught errors to the console
    console.log(error);
  }
};

const photoService = {
  publishPhotoService,
  getUserPhotosByUserIdService,
  deleteUserPhotoService,
  updatePhotoService,
  getPhotoUsingPhotoIdService,
  likeAnPhotoService
};

export default photoService;
