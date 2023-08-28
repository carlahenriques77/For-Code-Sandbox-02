const multerInstance = require("multer");

const pathModule = require("path");

// Destination to Store Image
const diskImageStorage = multerInstance.diskStorage({
  destination: (request, destinationFile, setDestination) => {
    let storageFolder = "";

    if (request.baseUrl.includes("users")) {
      storageFolder = "users";
    } else if (request.baseUrl.includes("photos")) {
      storageFolder = "photos";
    }

    setDestination(null, `uploads/${storageFolder}/`);
  },

  filename: (request, filenameFile, handleFilenameGeneration) => {
    handleFilenameGeneration(null, Date.now() + pathModule.extname(filenameFile.originalname));
  },
});

const multerImageUpload = multerInstance({
  storage: diskImageStorage,

  fileFilter(request, filterFile, fileFilterCallback) {
    if (!filterFile.originalname.match(/\.(png|jpg)$/)) {
      // Upload Only PNG and JPG Formats
      return fileFilterCallback(
        new Error("Please, Upload only PNG or JPG Formats")
      );
    }

    fileFilterCallback(undefined, true);
  },
});

module.exports = {
  diskImageStorage,
  multerImageUpload,
};
