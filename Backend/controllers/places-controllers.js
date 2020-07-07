const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const fs = require("fs");
const getCoordinates = require("../utils/location");
const HttpError = require("../models/http-error");
const Place = require("../models/place");
const Users = require("../models/users");

const getPlacesbyUserID = async (req, res, next) => {
  const userID = req.userData.userId;
  let userPlaces;
  try {
    userPlaces = await Users.findById(userID).populate("places");
  } catch (error) {
    return next(
      new HttpError("Something went wrong with fetching places !!", 500)
    );
  }
  if (!userPlaces || userPlaces.places.length == 0) {
    return next(
      new HttpError("Couldnot find place with provided user ID", 404)
    );
  }
  res.json({
    places: userPlaces.places.map((place) => place.toObject({ getters: true })),
  });
};

const getPlacebyID = async (req, res, next) => {
  const placeID = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeID);
  } catch (error) {
    return next(new HttpError("Something went wrong!!", 500));
  }
  if (!place) {
    return next(
      new HttpError("Couldnot find place with provided place ID", 404)
    );
  }
  res.json({ place: place.toObject({ getters: true }) });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid data entry!!", 422));
  }
  const { title, description, creator } = req.body;
  let location;
  try {
    location = await getCoordinates(address);
  } catch (error) {
    return next(error);
  }
  const newPlace = new Place({
    title,
    description,
    image: req.file.path,
    location,
    creator,
  });
  let userExists;
  try {
    userExists = await Users.findById(creator);
  } catch (error) {
    return next(new HttpError("Couldnot find user!!", 422));
  }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction;
    await newPlace.save({ session: sess });
    userExists.places.push(newPlace);
    await userExists.save({ session: sess });
    await sess.commitTransaction;
  } catch (error) {
    return next(new HttpError("Couldnot add the place", 404));
  }
  res.status(201).json({ newPlace: newPlace.toObject({ getters: true }) });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid data entry!!", 422);
  }
  const { title, description } = req.body;
  const placeID = req.params.pid;
  try {
    place = await Place.findById(placeID);
    if (place.creator.toString() !== req.userData.userId) {
      return next(
        new HttpError("You are not allowed to edit this place!!", 401)
      );
    }

    place.title = title;
    place.description = description;
    await place.save();
  } catch (error) {
    return next(
      new HttpError("Something went wrong with the update process!!", 500)
    );
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeID = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeID).populate("creator");
  } catch (error) {
    return next(new HttpError("Something went wrong!!", 500));
  }
  if (!place) {
    return next(new HttpError("Place Not found!!", 500));
  }
  if (place.creator.id !== req.userData.userId) {
    return next(
      new HttpError("You are not allowed to delete this place!!", 401)
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.remove({ session: sess });
    place.creator.places.pull(place);
    await place.creator.save();
    await sess.commitTransaction();
  } catch (error) {
    return next(new HttpError("Something went wrong!!", 500));
  }
  const imPath = place.image;
  fs.unlink(imPath, (error) => {
    console.log(error);
  });

  res.status(200).json({ message: "Successfully removed the place" });
};

module.exports = {
  getPlacebyID,
  getPlacesbyUserID,
  createPlace,
  updatePlace,
  deletePlace,
};
