var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({

  text:{
    type: String,
    required: true,
  },
  createdAt:{
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt:{
    type: Date,
    required: true,
    default: Date.now,
  },

  post: {
    type: Schema.Types.ObjectId, //mongoose uses the objectId to find the post
    ref: 'Post'//refers to the Post model
  },
  user:{
    type: Schema.Types.ObjectId,//mongoose uses the objectId to find the post
    ref:'User'//refers to the User model 
  }

});

module.exports = mongoose.model('Comment', CommentSchema);