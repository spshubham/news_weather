"use strict";
var Response = require("../utils/response");
const conf = require("../conf/conf")
const axios = require("axios")

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns get news
 */
exports.getNews = async function (req, res) {
  try {

    if(!req.user)
      return Response.UnauthorizedUser
    const apiKey = conf.NEWS_API_KEY
    let keyword = req.query["keyword"]

    var url=`https://newsapi.org/v2/everything?q=${keyword}&apiKey=${apiKey}`;
    let news =await axios.get(url)

    let res = {};
    
    let newsArr = [...news.data.articles]
    newsArr = newsArr.map(doc=>{
      let abc = {
        headline: doc.title,
        link: doc.url
      }
      return abc
    })
    res = {
      count : news.data.articles.length,
      data: newsArr
    }

    return res
  } catch (error) { console.log(error);
    throw Response.UnexpectedError;

  }
};

