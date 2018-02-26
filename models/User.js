var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  username:{
    type: String,
    require: true,
  },
  firstname:{
    type: String,
    required: true,
  },
  lastname:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true
  },
  birthdate:{
    type: Date,
    required: false,
  },
createdAt:{
  type: Date,
  required: true,
  default: Date.now,
},
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  }

});

module.exports= mongoose.model('User', UserSchema);