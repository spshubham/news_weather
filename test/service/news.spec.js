const sinon = require("sinon")
const {expect} = require("chai")
const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")

const axios = require("axios")
const newsService = require("../../service/news")

chai.use(chaiAsPromised);

describe("test_news",()=>{
    let axiosStub;
    beforeEach(()=>{
        axiosStub = sinon.stub(axios,"get");
    })
    let req={
        query:{
            keyword:"India"
        },
        user:"sp"
    }
    it("test_news_success",async()=>{
        let news={
            data:{
                "articles": [
                  {
                    "title": "Google",
                    "url": "https://www.google.com/"
                }
            ]
        }
    }
        
        axiosStub.returns(news);
       
        let res = await newsService.getNews(req)
        expect(res.count).to.be.equals(1)
    })

    it("test_news_fail",async()=>{
        let news={

                "articles": [
                  {
                    "title": "Google",
                    "url": "https://www.google.com/"
                }
            ]
        
    }
        
        axiosStub.returns(news);
    
        await newsService.getNews(req).catch((res)=>{
            expect(res.code).to.be.equals(500)
        })

       
    })

    it("test_news_unauthorized",async()=>{
        let news={

                "articles": [
                  {
                    "title": "Google",
                    "url": "https://www.google.com/"
                }
            ]
    }
        axiosStub.returns(news);
    
        await newsService.getNews({}).then((res)=>{
            expect(res.code).to.be.equals(403)
        })
    })
    afterEach(()=>{
        axiosStub.restore();
    })
})
