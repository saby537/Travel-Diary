const express = require("express");
const { check } = require("express-validator");

const router = express.Router();
const userControllers = require("../controllers/user-controllers");
const fileUpload = require("../Middleware/file-upload");

router.get("/Buddy/:uid", userControllers.getUsersByID);
router.post(
  "/signup",
  [
    (check("name").not().isEmpty(),
    check("password").isLength({ min: 6 }),
    check("email").normalizeEmail().isEmail()),
  ],
  userControllers.signup
);
router.post("/login", userControllers.login);

module.exports = router;
