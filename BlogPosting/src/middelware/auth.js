const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

const auth = async (req, res, next) => {
  try {
    console.log(req.body);
    const token = req.header('Authorization').replace('Bearer ', '');
    console.log(token);
    const decoded = jwt.verify(token, 'BlogPosting');
    console.log(decoded);
    const user = await userModel.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });
    console.log(user);
    if (!user) {
      throw new Error();
    }

    // req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;
