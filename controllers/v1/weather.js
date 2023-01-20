"use strict";

var utils = require("../../utils/writer.js");
var Weather = require("../../service/weather");



module.exports.getWeather = function getWeather (req, res, next ) {
  Weather.getWeather(req, res)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
