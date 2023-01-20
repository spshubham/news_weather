var express = require("express");
var router = express.Router();
const newsController = require("../../controllers/v1/news");
const weatherController = require("../../controllers/v1/weather")
const userController = require("../../controllers/v1/user")
const auth = require("../../middleware/auth");


/*User API Routes */
router.post("/user/signup", function(req, res, next){
  userController.signUp(req, res, next, req.body);
});
router.get("/user/login", function(req, res, next){
  userController.getDetails(req, res, next, req.query["email"], req.query["password"]);
});

/**News API route */
router.get("/news",auth, function(req, res, next){
  newsController.getNews(req, res, next);
});

/**Weather API route */
router.get("/weather",auth, function(req, res, next){
  weatherController.getWeather(req, res, next);
});





module.exports = router;
