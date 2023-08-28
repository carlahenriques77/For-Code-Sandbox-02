Frontend & Backend Start:

1 - Basic React Frontend Start

On the Project Main Folder Terminal, Write in Sequence:

npx create-react-app frontend

npm i react-icons react-router-dom @reduxjs/toolkit react-redux

"Clean" the Project Frontend Next. Ex:

- Clean the Index.css, App.js, App.css

Get the Robot Font from Google Fonts, an Place it in the Public Index.HTMl File:

    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
      rel="stylesheet"
    />

Next, I will be Copy Pasting the CSS Files, haha

Do the React Router Basic Setup on App.js now:

...

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route to="/"></Route>
        </Routes>
      </BrowserRouter>
    </div>

Next, make some of the Components, Page, Home, Register&Login Folders and Files. I will be Skipping that Part, as it is just your Usual Basic Stuff...

2 - Important SetUps

Create an File called: "store". On it, Write this:

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {},
  // Does this "reducer" come's from Something we Wrote...? 
});

Next, on index.js, do the "Provider" thing, with the "store={store}" on the Provider:

import { Provider } from "react-redux";
import { store } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    // I don't know where the Initial "store" comes from... 
      <App />
    </Provider>
  </React.StrictMode>
);

// Let's do some Backend now, then we go Back here, haha

1 - Backend Setup & Start

Install: npm i bcryptjs cors dotenv express express-validator jsonwebtoken mongoose multer

On Package.json, add the "server" Command on Scripts:

  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "server": "nodemon ./app.js"
  },

Now, on App.js, Write this Starter Long Complicated Code:

require("dotenv").config();

// Import required modules
const expressLibrary = require("express"); // Express.js library for web application

const pathModule = require("path"); // Node.js path module for working with file paths

const corsMiddleware = require("cors"); // CORS middleware for enabling Cross-Origin Resource Sharing

// Set the server port
const serverPort = process.env.ENV_PORT; // Port on which the server will listen

// Create the Express application
const expressApp = expressLibrary();

// Config JSON and Form Data Response
expressApp.use(expressLibrary.json()); // Middleware to parse incoming JSON data

expressApp.use(expressLibrary.urlencoded({ extended: false })); // Middleware to parse incoming URL-encoded data

// Routes
const expressRouter = require("./src/routes/Router");

expressApp.use(expressRouter)

// Start the server and listen on the specified port
expressApp.listen(serverPort, () => {
  console.log(`App Running in the Port | serverPort: ${serverPort}`);
});

Make an .env File on the same Folder as the App.js an Write this:

ENV_PORT=5000

Now, make an Folder called "src". On it, make some Folders like: controllers, models, routes.

Inside routes, router.js. Write this for now:

const expressLibrary = require("express");

const expressRouter = expressLibrary();

// Testing Route
expressRouter.get("/", (request, response) => {
  response.send("The Router API is Working");
}); // ChatGPT insisted on the "req, res" name being either "req, res" or "request, response"...

module.exports = expressRouter;

... This isn't being too Helpful, as nothing new is happening... That's troubling...

On Postman, go to Main Folder, Variables and create an URL Variable, so it can be easier to Input the URL Code for testing:

Variable: URL,
Initial value: http://localhost:5000,
Current value: http://localhost:5000

I might not use it, myself, for better Clarity and Understanding for this Project

... Anyway, "Questionable" Models now:

const mongooseLibrary = require("mongoose");

const { Schema } = mongooseLibrary;

const userDetailsSchema = new Schema(
  {
    userDisplayName: String,
    userEmail: String,
    userPassword: String,
    userProfileImage: String,
    userBio: String,
  }, // I honestly think this is Related to the Actual User Info, so we should Probably use the Same Names here...
  {
    timestamps: true,
  }
);

const userDetailsModel = mongooseLibrary.model("UserModel", userDetailsSchema); // I honestly don't know, but I think that "UserModel" refers to the Folder, but... Chances are, that is Wrong, as the Teacher's one had Both the Const and Folder with the same Name.

module.exports = userDetailsModel;


const mongooseLibrary = require("mongoose");

const { Schema } = mongooseLibrary;

const photoDetailsSchema = new Schema(
  {
    photoImage: String,
    photoTitle: String,
    photoLikesArray: Array,
    photoCommentsArray: Array,
    photoCreatorID: mongooseLibrary.ObjectId,
    photoCreatorName: String,
    // I don't get it... Why use another "userName" here? Maybe I'm doing something Wrong... We will have to look more into it later
  },
  {
    timestamps: true,
  }
);

const photoDetailsModel = mongooseLibrary.model("PhotoModel", photoDetailsSchema);

module.exports = photoDetailsModel;



      .custom((confirmPassValue, { req }) => {
        // The Req Name can't Changed here...
        if (confirmPassValue != req.body.userPassword) {
          throw new Error("The Password must be the same");
        }
        return true;
      }),


Here how this Code Works:

  const { userDisplayName, userEmail, userPassword } = request.body;
      
A user submits a registration form.

The data from the form is sent to your server in an HTTP request.

Express.js parses this data and populates the request.body object with it.

In your userRegistrationController function, you use object destructuring to extract the userDisplayName, userEmail, and userPassword properties from request.body.


  // Generate Password Hash
  const saltForHash = await bcryptLibrary.genSalt();

  const hashedPassword = await bcryptLibrary.hash(userPassword, saltForHash);

  // Create User
  const newUser = await userDetailsModel.create({
    userDisplayName,
    userEmail,
    userPassword: hashedPassword,
    // Oh, so that's how the Password "turns into the Hash Version" of it...
  });


            <p>{theMsg}</p>
            
        {hasError && <Message theMsg={hasError} />}
        // A bit out of nowhere, but... Now that I see it, I believe it means that this thing really turns the "theMsg" into the "hasError" in this case

Funny Little Mistake:

  const [isAuthenticated, loadingStatus] = useAuthenticationStatus();

Instead of:  const { isAuthenticated, loadingStatus } = useAuthenticationStatus();


        const getProfileToken = thunkAPI.getState().authReducer.userReducer.token
        // Whick Token could it be...? Tests will need to be done...


  // Load User Data
  useEffect(() => {
    editProfileDispatch(profileAsyncThunk());
  }, [editProfileDispatch]);

  // Clean all Auth States
  useEffect(() => {
    registrationDispatch(resetAuth());
  }, [registrationDispatch]);

  // Weird... Maybe that's how the Dispatch works? It just Plays whatever is in there? Hmm...

  That's the resetAuth:

      resetAuth: (resetState) => {
      resetState.isLoading = false;
      resetState.hasError = false;
      resetState.isSuccess = false;
    },

That's the Profile Async Thunk:
  
  export const profileAsyncThunk = createAsyncThunk(
  "userSlice/profileIndentifier",
  async (userData, thunkAPI) => {
    const getProfileToken =
      thunkAPI.getState().authReducer.userReducer.userToken;

    const profileData = await userServiceExport.getProfileService(
      userData,
      getProfileToken
    );

    return profileData;
  }
);



        if(request.baseUrl.includes("user")) {

        } // Probably okay to leave it as "user", as it looks like it might be refering to the "url". Example: "https://example.com/uploads/user"


User more Console.log(), as it Helped a Great Deal in the Update User Controller Problem:

Console.log(request.user_ID)
// Result: undefined

Console.log(request._id)
// Result: 64d289d5b718ae129eff4f44 < - - - The User ID


    const updatingUser = await userDetailsModel
      .findById(new mongooseLibrary.Types.ObjectId(requestUser._id))
      .select("-userPassword"); // Maybe we should Read these "Properties / Functions" more often...
      // It looks like that, when it didn't have the "select", the Code was Diplaying the userPassword in an Hashformat


  destination: (request, destinationFile, setDestination) => {
  filename: (request, filenameFile, setDestination) => {
  fileFilter(request, filterFile, setDestination) {
    // Looks like the: 
        if (request.file) {
      userProfileImage = request.file.filename;
    }
    //  isn't related to them...


const getUserByIdController = async (request, response) => {
  const { id } = request.params;
  // From where could this possible be...? Maybe it's an new thing? 

  Oh, here's ChatGPT Explanation: 

  Here, request.params is used to access the parameters that are extracted from the URL. In this case, the id parameter is being extracted from the URL and assigned to the id variable. For example, if the URL for this route is something like /users/123, then request.params would contain { id: '123' }.

To explain further, let's say you have defined a route like this in your Express.js application:

app.get('/users/:id', getUserByIdController);

In this route definition, :id is a route parameter placeholder. When a request is made to a URL like /users/123, Express.js will capture the value 123 and store it in the request.params object. This way, you can access the captured value within your route handler using request.params.id.


  const handleFileOnChange = (changeEvent) => {
    // Image Preview
    const imagePreview = changeEvent.target.files[0]
  
  };

ChatGPT Explaining the Files[0]:

changeEvent.target.files is an array-like object that holds the selected files. It's an array because a file input element can have the multiple attribute, allowing users to select multiple files at once.

changeEvent.target.files[0] refers to the first selected file in the array. This is often used when you expect users to select only one file.

So, in your handleFileOnChange function, imagePreview would contain the first selected file for preview or further processing.


      {(currentUser.userProfileImage || userPreviewImage) && (
        <img src={userPreviewImage ? URL.createObjectURL(userPreviewImage) : `${uploads}/users/${currentUser.userProfileImage}`} alt={currentUser.userDisplayName} />
      )}

ChatGPT Explanation about "createObjectURL":

URL.createObjectURL() is a built-in JavaScript function that generates a unique URL representing an object or file. It's commonly used to create URLs for files that are selected or generated dynamically within a web application, like in your code where you are using it to display a preview image.

In your code snippet, URL.createObjectURL(userPreviewImage) is used to create a temporary URL for the image that the user has selected as a preview. This allows you to display the selected image in an <img> tag by setting the src attribute to the generated URL. If userPreviewImage is not available, it falls back to using the URL of the user's profile image from the server.

This approach helps to display the image without needing to upload it to the server first. It's especially useful for previewing images before deciding to upload them permanently. Keep in mind that these URLs are temporary and are revoked automatically when the page is closed or the image is no longer needed, helping to manage memory usage.


Troubleshooting:

The Config Names doesn't seems to need to be the same as the userService ones

The Token is the Token from userToken

Error:

From this

    const userProfileToken = thunkAPI.getState().authReducer.userReducer.userToken;


To this

    const userProfileToken = thunkAPI.getState().authReducer.user.userToken;

It doesn't make sense to put userReducer there, as it wasn't even declared yet in the Code.



        {userSliceCurrentUser.userProfileImage && (
          <>
            <img
              src={`${uploads}/users/${userSliceCurrentUser.userProfileImage}`}
              alt={userSliceCurrentUser.userDisplayName}
            />
          </>
        )} // Could this "Fetching" of the User Data work because the currentUser / userSliceCurrentUser already Stores their Info? So, if there was, I don't know, "randomThing" inside the currentUser, we would be able to use it like this userSliceCurrentUser.randomThing, right(?)
  

  1. The code is using the  await  keyword, which means it is likely inside an asynchronous function. This allows the code to pause and wait for the  findById  method to complete before moving on. 

  // Oh, so that's how the await works... I didn't think about it too much before


Tip: Always Add an "return" in an Error, so we can "prevent further execution from the Code"


Unrelated, but... Do you think this is where these Errors appear from? : 

    return databaseConfig; // Return the database connection configuration
  } catch (error) {
    console.log(error); // Log any errors that occur during connection
  }

On the config database.js file...



      <div className="user-photos">
        <h2>Photos Published by You:</h2>

        <div className="photos-container">
          {allPhotosArray &&
            allPhotosArray.map((mapItem) => (
              <div className="photo" key={mapItem / currentPhoto._id}>
                {mapItem / currentPhoto.photoImage && (
                  <img
                    src={`${uploads}/photos/${mapItem / currentPhoto.photoImage}`}
                    alt={mapItem / currentPhoto.photoTitle}
                  />
                )}

                {pathgetUserByID === authSliceCurrentUser._id ? (
                  <p>Actions</p>
                ) : (
                  <Link className="btn" to={`/photos/${mapItem / currentPhoto._id}`}>
                    View
                  </Link>
                )}
              </div>
            ))}

          {allPhotosArray.length === 0 && (
            <p>You don't have any Photos published...</p>
          )}
        </div>
      </div>

Error: Passing currentPhoto instead of "mapItem" on the forEach fields... By the way... Does the user_ID and the currentPhoto / mapItem ID share the same name of _id? Maybe we can try to fix that without breaking the Code...?


If an Error happens, might be because of this "id":


        photoState.allPhotosArray = photoState.allPhotosArray.filter(
          (filterItem) => {
            return filterItem._id !== photoAction.payload.id;
          }
        );
        

                    <BsXLg
                      onClick={() => {
                        console.log("mapItem._id:", mapItem._id); // Adding the console.log() here
                        deletePhotoOnClick(mapItem._id);
                      }}
                    /> // The way to put an Log in an JSX / HTML Element. Very useful.


        photoState.allPhotosArray = photoState.allPhotosArray.filter(
          (currentPhoto) => {
            return currentPhoto._id !== photoAction.payload.bodyDeletePhotoID;
          },
        
            console.log("photoAction: ", photoAction)
        ); // Add more Logs even in Stuff that might not make too much sense for us. Big Example wa this Log on the photoAction, as it have Shown us the Object that it had, in which it had the deletePhotoID inside it, somthing we Forgot that Existed



          <div className="edit-photo hide" ref={editPhotoFormRef}>
            <p>Editing:</p>

  const showPhotoEditScreenOnClick = (handleEvent) => {
    if(editPhotoFormRef.current.classList.contains("hide")) {

    }
  };

  // Was that one of the ways to use the "useRef" command? I mean, I didn't think about it that much, but how would you take something like this div in the react to do some type of js on it? You can't do the "document id / class" thing here, right? So, maybe was that it?


      const editPhotoDetails = {
      photoTitle: editPhotoTitle,
      updatePhotoID: editPhotoID, // <- Might be Wrong. Also, might be just an Name. But... Why would the photoTitle be called photoTitle, then ? Can we change it?
    };



    const editPhotoDetails = {
      photoTitle: editPhotoTitle,
      updatePhotoID: editPhotoID,
    };

      const updatingPhotoResponse = await photoService.updatePhotoService(
        { photoTitle: photoData.photoTitle },
        photoData.updatePhotoID,
        getCurrentUserToken
      );

// Both of these "updatePhotoID" are Linked Together. I don't know if they are Related to the "updatePhotoID" from the useParams. More Tests will be made to make sure everything is alright



    const editPhotoDetails = {
      photoTitle: editPhotoTitle,
      bodyUpdatePhotoID: editPhotoID,
    }; // I'm assuming the "photoTitle: " turns the "editPhotoTitle" into the "photoTitle" field, somehow...
