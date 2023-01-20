const { default: mongoose } = require("mongoose");
const emailRegex = /^[\w-\.\+]+@([\w-]+\.)+[\w-]{2,5}$/;
const response = require("./response");
const URL = require("url").URL;

/**
 * 
 * @param {*} email 
 * @returns validate the email
 */
exports.isEmail = (email) =>{
    return emailRegex.test(email);
}

/**
 * 
 * @param {*} body 
 * @returns validate the req.body
 */
exports.isValidRegisterUserBody = (body) =>{
    try{    
        
        if(typeof body.password != "string" || body.password.length < 8){
            return {
                isValid : false,
                payload : response.InvalidPassword
            }
        }
        if(!this.isEmail(body.email)){
            return {
                isValid : false,
                payload : response.InvalidEmail
            }
        }
        if(typeof body.name != "string" || body.name.trim().length < 1 ){
            return {
                isValid : false,
                payload : response.InvalidUserName
            }
        }
        return {
            isValid:true
        }
    }catch(err){
        return {
            isValid : false,
            payload : response.InvalidReqBody
        }
    }

}
