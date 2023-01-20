"use strict";
var Response = require("../utils/response");
const conf = require("../conf/conf")
const axios = require("axios")

exports.getWeather = async function (req, res) {
  try {
    if(!req.user)
      return Response.UnauthorizedUser
  
    const apiKey = conf.FORECAST_API_KEY
    //let url="https://api.openweathermap.org/data/2.5/onecall?lat=44.34&lon=10.99&appid=fddd65b52d5a5550720794892b502bc9&cnt=5";
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=New%20York&appid=${apiKey}&cnt=40&units=metric`
    //var url="https://api.openweathermap.org/data/2.5/forecast?q=London,uk&APPID=fddd65b52d5a5550720794892b502bc9&cnt=5";
    //let url = "https://api.openweathermap.org/data/2.5/onecall?lat=38.7267&lon=-9.1403&exclude=current,hourly,minutely,alerts&units=metric&appid=fddd65b52d5a5550720794892b502bc9"
    //let url =  "https://api.openweathermap.org/data/2.5/onecall?lat=19.0760&lon=72.8777&appid=fddd65b52d5a5550720794892b502bc9"
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
    //return weather.data
    return res
  } catch (error) {
    throw Response.UnexpectedError;

  }
};