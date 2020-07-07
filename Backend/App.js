const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require("fs");
const placesRoutes = require("./Routes/places");
const usersRoutes = require("./Routes/users");
const HttpError = require("./models/http-error");

const app = express();
app.use(bodyParser.json());
app.use("/uploads/images", express.static(path.join("uploads", "images")));
app.use(express.static(path.join("public")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  next();
});

app.use("/places", placesRoutes);
app.use("/users", usersRoutes);
app.use((req, res, next) => {
  return next(new HttpError("Cannot find the route.", 404));
});
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An Unknown error has occurred!!" });
});

mongoose
  .connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-shard-00-00-l1zw3.mongodb.net:27017,cluster0-shard-00-01-l1zw3.mongodb.net:27017,cluster0-shard-00-02-l1zw3.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(process.env.PORT || 5000, () =>
      console.log("Server Listening on PORT: 5000")
    );
  })
  .catch((error) => {
    console.log(error);
  });
