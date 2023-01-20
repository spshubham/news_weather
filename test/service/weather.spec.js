const sinon = require("sinon")
const {expect} = require("chai")
const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
const axios = require("axios")
const weatherService = require("../../service/weather")


const jwt = require('jsonwebtoken')
chai.use(chaiAsPromised);

describe("test_weather",()=>{
    let axiosStub;
    beforeEach(()=>{
        axiosStub = sinon.stub(axios,"get");
    })

    it("test_weather_success",async()=>{
        let news={
            data:{cnt:1,list:[
                {
                  "dt": 1674140400,
                  "main": {
                    "temp": 5.16,
                    "feels_like": 5.16,
                    "temp_min": 4.28,
                    "temp_max": 5.16,
                    "pressure": 1017,
                    "sea_level": 1017,
                    "grnd_level": 1016,
                    "humidity": 77,
                    "temp_kf": 0.88
                  },
                  "weather": [
                    {
                      "id": 501,
                      "main": "Rain",
                      "description": "moderate rain",
                      "icon": "10d"
                    }
                  ],
                  "clouds": {
                    "all": 100
                  },
                  "wind": {
                    "speed": 0.79,
                    "deg": 195,
                    "gust": 0.84
                  },
                  "visibility": 5582,
                  "pop": 0.97,
                  "rain": {
                    "3h": 4.01
                  },
                  "sys": {
                    "pod": "d"
                  },
                  "dt_txt": "2023-01-19 15:00:00"
                }],
                city:{
                  name:"Sangli"
                }}
    }
    let req={
      
      user:"sp"
  }
        axiosStub.returns(news)
        let res = await weatherService.getWeather(req)

        expect(res.location).to.be.equals("Sangli")
    })

    it("test_weather_failt",async()=>{
        axiosStub.returns(true)
         await weatherService.getWeather().catch((res)=>{
            expect(res.code).to.be.equals(500)
        }) 
    })
    it("test_weather_unauthorized",async()=>{
      axiosStub.returns(true)
       await weatherService.getWeather({}).then((res)=>{
          expect(res.code).to.be.equals(403)
      }) 
  })
    afterEach(()=>{
        axiosStub.restore();
    })
})
