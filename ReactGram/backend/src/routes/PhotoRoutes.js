const expressLibrary = require("express");
const photoRouter = expressLibrary.Router();
const {
  insertPhotoController,
  deletePhotoController,
  getAllPhotosController,
  getPhotosFromAnUserByTheirIdController,
  getSpecificPhotoByIdController,
  updatePhotoController,
  likeAnPhotoController,
  commentOnPhotoController,
  searchPhotoByTitleController,
} = require("../controllers/PhotoController");
const {
  photoInsertValidation,
  photoUpdateValidation,
  photoCommentValidation,
} = require("../middlewares/photoValidation");
const authGuardDefense = require("../middlewares/authGuard");
const formValidationDefense = require("../middlewares/handleValidation");
const { multerImageUpload } = require("../middlewares/imageUpload");

photoRouter.get("/", authGuardDefense, getAllPhotosController);

photoRouter.get("/search", authGuardDefense, searchPhotoByTitleController);

photoRouter.get("/:pathFindPhotoID", authGuardDefense, getSpecificPhotoByIdController);

photoRouter.get(
  "/user/:pathGetUserPhotosByUserID",
  authGuardDefense,
  getPhotosFromAnUserByTheirIdController
);

photoRouter.post(
  "/",
  authGuardDefense,
  multerImageUpload.single("photoImage"),
  photoInsertValidation(),
  formValidationDefense,
  insertPhotoController
);

photoRouter.put(
  "/:pathUpdatePhotoID",
  authGuardDefense,
  photoUpdateValidation(),
  formValidationDefense,
  updatePhotoController
);

photoRouter.put(
  "/like/:pathLikeAnPhotoID",
  authGuardDefense,
  likeAnPhotoController
);

photoRouter.put(
  "/comment/:pathCommentOnPhotoID",
  authGuardDefense,
  photoCommentValidation(),
  formValidationDefense,
  commentOnPhotoController
);

photoRouter.delete("/:pathDeletePhotoID", authGuardDefense, deletePhotoController);

module.exports = photoRouter;
