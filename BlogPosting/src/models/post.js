const mongoose = require('mongoose');
// const validator = require('validator');
const auth = require('../middelware/auth');
const userModel = require('./user');

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

  like: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  comments: [
    {
      type: String,
      optional: true,
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'topic',
  },
  dateCreated: {
    type: Date,
    default: Date.now,
    required: true,
  },
  // avatar: { type: String },
});

const postModel = new mongoose.model('post', postSchema);

module.exports = postModel;
