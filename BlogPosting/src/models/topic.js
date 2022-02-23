const mongoose = require('mongoose');
// const validator = require('validator');

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    trim: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const topicModel = new mongoose.model('topic', topicSchema);

module.exports = topicModel;
