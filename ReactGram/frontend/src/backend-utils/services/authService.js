// Import necessary dependencies and utilities
import { serverHost, generateRequestConfig } from "../utils/config";

// Function to perform user registration
const registrationService = async (registerData) => {
  // Create request settings using the provided data
  const requestSettings = generateRequestConfig("POST", registerData);

  try {
    // Send a registration request to the server
    const registrationResponse = await fetch(
      `${serverHost}/users/register`,
      requestSettings
    )
      .then((response) => response.json()) // Parse response as JSON
      .catch((error) => error); // Catch any network or parsing errors

    // Check if the registration response exists
    if (registrationResponse.user_ID) {
      // Store user registration response in local storage
      localStorage.setItem("itemUser", JSON.stringify(registrationResponse));
    }

    return registrationResponse;
  } catch (error) {
    // Log any caught errors to the console
    console.log(error);
  }
};

// Logout User
const logoutService = () => {
  localStorage.removeItem("itemUser");
};

// Log in an User
const loginService = async (loginData) => {
  // Create request settings using the provided data
  const requestSettings = generateRequestConfig("POST", loginData);

  try {
    // Send a registration request to the server
    const loginResponse = await fetch(
      `${serverHost}/users/login`,
      requestSettings
    )
      .then((response) => response.json()) // Parse response as JSON
      .catch((error) => error); // Catch any network or parsing errors

    // Check if the registration response exists
    if (loginResponse.user_ID) {
      // Store user registration response in local storage
      localStorage.setItem("itemUser", JSON.stringify(loginResponse));
    }

    return loginResponse;
  } catch (error) {
    // Log any caught errors to the console
    console.log(error);
  }
};


// Export an object containing registration service
const authenticationService = {
  registrationService,
  logoutService,
  loginService,
};

// Export the authentication service object as default
export default authenticationService;
