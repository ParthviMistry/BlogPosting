const mongoose = require('mongoose');
// const validator = require('validator');
const auth = require('../middelware/auth');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    max: 50,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    max: 100,
    min: 10,
  },
  Image: {
    type: String,
    required: true,
    trim: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
    required: true,
  },
  like: {
    type: Number,
    default: 0,
  },
  comments: {
    text: { type: String },
    postedBy: { type: mongoose.Schema.Types.ObjectId },
  },
  // avatar: { type: String },
});

const postModel = new mongoose.model('post', postSchema);

module.exports = postModel;
