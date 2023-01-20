let response = require("./writer").respondWithCode;


exports.UnexpectedError = response(500, {
    message: "Internal server error"
});
exports.UserAlreayExist = response(400, {
    message: "User already exist"
});

exports.InvalidEmail = response(400, {
    message: "Invalid Email id"
});
exports.InvalidUserName = response(400, {
    message: "Invalid name"
});

exports.InvalidUserAndMail = response(400, {
    message: "Incorrect Email id or Password"
});

exports.InvalidPassword = response(400, {
    message : "Password should be string and lenght should be greater than 7"
});

exports.InvalidReqBody = response(400, {
    message : "Invalid Request body"
});
exports.UnauthorizedUser = response(403, {
  message : "Unauthorized user"
});