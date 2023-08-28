import { serverHost, generateRequestConfig } from "../utils/config";

// Get User Details
const getProfileService = async (profileData, profileToken) => {
  // Create request settings using the provided data
  const requestSettings = generateRequestConfig(
    "GET",
    profileData,
    profileToken
  );

  try {
    // Send a GET request to fetch user profile from the server
    const fetchUserProfileData = await fetch(
      `${serverHost}/users/profile`,
      requestSettings
    )
      .then((response) => response.json()) // Parse response as JSON
      .catch((error) => error); // Catch any network or parsing errors

    return fetchUserProfileData;
  } catch (error) {
    // Log any caught errors to the console
    console.log(error);
  }
};

// Update User Details
const putUpdateProfileService = async (profileData, profileToken) => {
  // Create request settings using the provided data
  const requestSettings = generateRequestConfig(
    "PUT",
    profileData,
    profileToken,
    true
  );

  try {
    // Send a PUT request to update user profile on the server
    const updateUserProfileResponse = await fetch(
      `${serverHost}/users/`,
      requestSettings
    )
      .then((response) => response.json()) // Parse response as JSON
      .catch((error) => error); // Catch any network or parsing errors

    return updateUserProfileResponse;
  } catch (error) {
    // Log any caught errors to the console
    console.log(error);
  }
};

// Get User Details by ID
const getUserDetailsByIDService = async (userProfileID) => {
  // Create request settings using the provided data
  const requestSettings = generateRequestConfig("GET");

  try {
    // Send a PUT request to update user profile on the server
    const fetchUserProfileData = await fetch(
      `${serverHost}/users/${userProfileID}`,
      requestSettings
    )
      .then((response) => response.json()) // Parse response as JSON
      .catch((error) => error); // Catch any network or parsing errors

    return fetchUserProfileData;
  } catch (error) {
    // Log any caught errors to the console
    console.log(error);
  }
};

// Object containing user services
const userServiceExport = {
  getProfileService,
  putUpdateProfileService,
  getUserDetailsByIDService,
};

// Export the user service object as default
export default userServiceExport;
