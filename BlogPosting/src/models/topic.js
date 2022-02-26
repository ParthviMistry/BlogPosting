const mongoose = require('mongoose');

// const validator = require('validator');

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    unique: true,
    trim: true,
  },

  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  dateCreated: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

// const User = mongoose.model('User', UserSchema);
// const Post = mongoose.model('Post', topicSchema);

const topicModel = new mongoose.model('topic', topicSchema);

module.exports = topicModel;
