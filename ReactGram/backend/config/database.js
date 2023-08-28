const mongooseLibrary = require("mongoose"); // Import the Mongoose library

// Load environment variables for database connection
const databaseUser = process.env.ENV_DATABASE_USER;
const databasePassword = process.env.ENV_DATABASE_PASS;

// Define the database connection function
const databaseConnection = async () => {
  try {
    // Create a connection to the MongoDB database using the provided credentials
    const databaseConfig = await mongooseLibrary.connect(
      `mongodb+srv://${databaseUser}:${databasePassword}@cluster0.mdqnb33.mongodb.net/?retryWrites=true&w=majority`
    );

    console.log("Connected to the Database Successfully");

    return databaseConfig; // Return the database connection configuration
  } catch (error) {
    console.log(error); // Log any errors that occur during connection
  }
};

databaseConnection(); // Call the database connection function to establish the connection

module.exports = databaseConnection; // Export the database connection function for reuse
