// Load environment variables from .env file
require("dotenv").config();

// Import required modules
const expressLibrary = require("express"); // Express.js library for web application
const pathModule = require("path"); // Node.js path module for working with file paths
const corsMiddleware = require("cors"); // CORS middleware for enabling Cross-Origin Resource Sharing

// Set the server port
const serverPort = process.env.ENV_PORT; // Port on which the server will listen

// Create the Express application
const expressApp = expressLibrary();

// Configure JSON and Form Data response parsing
expressApp.use(expressLibrary.json()); // Middleware to parse incoming JSON data
expressApp.use(expressLibrary.urlencoded({ extended: false })); // Middleware to parse incoming URL-encoded data

// Enable CORS with specified configuration
expressApp.use(
  corsMiddleware({
    credentials: true, // Allow credentials to be included in CORS requests
    origin: "http://localhost:3000", // Specify allowed origins
  })
);

// Serve uploaded files from the "uploads" directory
expressApp.use(
  "/uploads",
  expressLibrary.static(pathModule.join(__dirname, "/uploads"))
);

// Establish database connection
require("./config/database.js"); // Assuming this file contains the database connection setup

// Import and use routes from the Router module
const expressRouter = require("./src/routes/Router");

expressApp.use(expressRouter);

// Start the server and listen on the specified port
expressApp.listen(serverPort, () => {
  console.log(`App Running in the Port | serverPort: ${serverPort}`);
});
