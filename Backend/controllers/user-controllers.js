const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const HttpError = require("../models/http-error");
const Users = require("../models/users");
const jwt = require("jsonwebtoken");

const getUsersByID = async (req, res, next) => {
  let users;
  try {
    users = await Users.findById(userID).populate("buddy");
  } catch (error) {
    return next(new HttpError("Something gone wrong!!", 500));
  }
  if (!users || users.buddy.length == 0) {
    return next(new HttpError("No Buddies Found", 404));
  }
  res
    .status(200)
    .json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid data entry!!", 422));
  }
  const { name, password, email } = req.body;
  let hasEmail;
  try {
    hasEmail = await Users.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Something gone wrong!!", 500));
  }
  if (hasEmail) {
    return next(new HttpError("Email exists!!", 422));
  }
  let hashedPassword;
  try {
    hashedPassword = await bcryptjs.hash(password, 12);
  } catch (err) {
    return next(new HttpError("Couldnot create User, Please try again!!"), 500);
  }

  const newUser = new Users({
    name,
    email,
    password: hashedPassword,
    image:
      "https://images.unsplash.com/uploads/141148585662612248462/9dad59df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    places: [],
    buddy: [],
  });
  try {
    await newUser.save();
  } catch (error) {
    return next(new HttpError(error, 500));
  }
  let token;
  try {
    token = jwt.sign(
      { userID: newUser.id, email: newUser.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    return next(new HttpError("Couldnot create User, Please try again!!"), 500);
  }
  res
    .status(201)
    .json({ userId: newUser.id, email: newUser.email, token: token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let user;
  try {
    user = await Users.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Something gone wrong!!", 500));
  }
  if (!user) {
    return next(new HttpError("Credentials are wrong. Login Failed!!", 401));
  }
  let isValid = false;
  try {
    isValid = await bcryptjs.compare(password, user.password);
  } catch (err) {
    return next(new HttpError("Coulnot log in. Please try again", 500));
  }
  if (!isValid) {
    return next(new HttpError("Credentials are wrong. Login Failed!!", 401));
  }
  let token;
  try {
    token = jwt.sign(
      { userID: user.id, email: user.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    return next(new HttpError("Logging In failed, Please try again!!"), 500);
  }
  res.status(200).json({
    userId: user.id,
    email: user.email,
    token: token,
  });
};

module.exports = {
  getUsersByID,
  login,
  signup,
};
