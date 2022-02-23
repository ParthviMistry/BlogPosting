const express = require('express');
const routerTopic = express.Router();
const topicModel = require('../models/topic');

// -- Create Topic -- //

routerTopic.post('/topic', async (req, res) => {
  try {
    const topicBody = new topicModel(req.body);
    const createtopic = await topicBody.save();
    res.status(201).send(createtopic);
  } catch (e) {
    res.status(400).send('Error' + e);
  }
});

// -- Read All Topic -- //

routerTopic.get('/topic', async (req, res) => {
  try {
    const getTopic = await topicModel.find();
    res.status(201).send(getTopic);
  } catch (e) {
    res.status(400).send('Error' + e);
  }
});

module.exports = routerTopic;
