"use strict";
var Response = require("../utils/response");
const conf = require("../conf/conf")
const axios = require("axios")

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns weather information
 */
exports.getWeather = async function (req, res) {
  try {

    if(!req.user)
      return Response.UnauthorizedUser
  
    const apiKey = conf.FORECAST_API_KEY
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=New%20York&appid=${apiKey}&cnt=40&units=metric`
    let weather =await axios.get(url)
    let res = {};
    let weatherArr = [...weather.data.list]
    weatherArr = weatherArr.map(doc=>{
      let abc = {
        date: new Date(doc.dt_txt).toString(),
        main: doc.weather[0].main,
        temp:doc.main.temp
      }
      return abc
    })

    res.location = weather.data.city.name;
    res.data = weatherArr;
    res.count = weather.data.cnt;
    
    return res
  } catch (error) {
    throw Response.UnexpectedError;

  }
};