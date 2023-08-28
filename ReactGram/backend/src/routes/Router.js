// Import the 'express' library
const expressLibrary = require("express");

// Create an instance of the express router
const expressRouter = expressLibrary();

expressRouter.use("/api/users", require("./UserRoutes"));
expressRouter.use("/api/photos", require("./PhotoRoutes"));

// Define a route for testing
expressRouter.get("/", (request, response) => {
  // Respond with a message indicating that the router API is working
  response.send("The Router API is Working");
});

// Export the express router to be used by other parts of the application
module.exports = expressRouter;
