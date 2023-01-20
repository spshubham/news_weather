 var mongoose = require("mongoose");
 var user = mongoose.Schema({
   name: {
    type: String,
     required: true
   },
   email: {
     type: String,
     required: true,
     unique: true
   },
   password: {
     type: String,
     required: true
   }
 
  
 }, { timestamps: true });
 
 user.index({email:1}, {unique: true})

module.exports = mongoose.model("User", user);
