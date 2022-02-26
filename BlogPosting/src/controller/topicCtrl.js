const express = require('express');
const routerTopic = express.Router();
const topicModel = require('../models/topic');
const auth = require('../middelware/auth');
const userModel = require('../models/user');

// -- Create Topic -- //

routerTopic.post('/topic', auth, async (req, res) => {
  try {
    // const _id = req.userModel._id;
    // console.log('*****' + _id);
    const topicBody = new topicModel({
      ...req.body,
      createdBy: req.user._id,
    });

    // const topic = await userModel.find().populate('postedBy');
    // res.send(topic);

    // const topics = await userModel.findById(req.params.id).populate('postedBy');
    // res.send(topics);

    const title = req.body.title.toLowerCase();

    topicModel
      .findOne({ title })
      .then((category) => {
        if (category) {
          return res.send({
            success: false,
            message: 'Alredy Exists....',
          });
        }
      })
      .catch((err) => {
        return res.send({
          success: false,
          message: 'error in existance category',
          err: err.message,
        });
      });

    if (req.body.title == '') {
      return res.send({
        success: false,
        message: 'title is required',
      });
    }

    const createtopic = await topicBody.save();
    res.send({
      success: true,
      message: 'Topic Created Suceessfully',
    });
  } catch (e) {
    res.status(400).json('Error' + e);
  }
});
// create post
routerTopic.post('/topics', auth, async (req, res) => {
  const topic = new Topic({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await topic.save();
    res.status(201).send({ topic });
  } catch (e) {
    res.status(400).send(e);
  }
});

routerTopic.get('/topic', async (req, res) => {
  try {
    const getTopic = await topicModel.find();
    res.status(201).json(getTopic);
  } catch (e) {
    res.status(400).json('Error' + e);
  }
});

module.exports = routerTopic;
