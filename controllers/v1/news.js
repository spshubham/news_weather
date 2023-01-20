"use strict";

var utils = require("../../utils/writer.js");
var News = require("../../service/news");
const response = require("../../utils/response")


module.exports.getNews = function getNews (req, res, next ) {
  News.getNews(req, res)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
