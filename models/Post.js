var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  text: {
    type: String,
    required: true
  },

  createdAt:{
    type: Date,
    required:true,
    default: Date.now
  },
  updatedAt:{
    type: Date,
    required: true,
    default: Date.now
  },
  user:{
    type: Schema.Types.ObjectId,
  ref: 'User'
  },
  likes:{
    type: Number,
    default: 0,
  }
});

module.exports= mongoose.model('Post', PostSchema);