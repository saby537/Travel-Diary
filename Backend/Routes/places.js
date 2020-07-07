const express = require("express");
const { check } = require("express-validator");
const fileUpload = require("../Middleware/file-upload");
const router = express.Router();
const placeControllers = require("../controllers/places-controllers");
const checkAuth = require("../Middleware/check-auth");

router.use(checkAuth);
router.get("/Diary", placeControllers.getPlacesbyUserID);
router.post(
  "/Diary",
  fileUpload.single("image"),
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placeControllers.createPlace
);
router.patch(
  "/Diary/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placeControllers.updatePlace
);
router.delete("/Diary/:pid", placeControllers.deletePlace);
module.exports = router;
