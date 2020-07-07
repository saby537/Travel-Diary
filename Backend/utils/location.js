const axios = require("axios");
const HttpError = require("../models/http-error");
const API_TOKEN = process.env.MAP_API_TOKEN;

async function getCoordinates(address) {
  try {
    console.log(API_TOKEN);
    const response = await axios.get(
      `https://eu1.locationiq.com/v1/search.php?key=${API_TOKEN}&q=${encodeURIComponent(
        address
      )}&format=json`
    );

    const data = response.data;

    const location = {
      lat: Number(data[0].lat),
      lng: Number(data[0].lon),
    };
    return location;
  } catch (error) {
    throw new HttpError("Coordinates not found!!", 422);
  }
}
module.exports = getCoordinates;
