const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');

// const pathh = require('path');

require('../src/db/conn');

const routerUser = require('./controller/userRegistrationCtrl');
const routerTopic = require('./controller/topicCtrl');
const routerPost = require('./controller/postCtrl');

const auth = require('./middelware/auth');
const upload = require('./middelware/upload');

const port = process.env.PORT || 5000 || 3000;

app.use(express.json());
app.use(routerUser);
app.use(routerTopic);
app.use(routerPost);
app.use(auth);
app.use(upload.array());

// auth.authenticateToken.unless = unless;
// app.use(
//   auth.authenticateToken.unless({
//     path: [
//       { url: '/login', method: ['POST'] },
//       { url: '/registration', method: ['POST'] },
//     ],
//   })
// );

// const static_path = pathh.join(__dirname, '../public');
// console.log(static_path);
// app.use(express.static(static_path));

// const myFunction = async () => {
//   const token = jwt.sign({ _id: 'abc123' }, 'BlogPosting', {
//     expiresIn: '7 days',
//   });
//   console.log('myfunction  token: ' + token);

//   const data = jwt.verify(token, 'BlogPosting');
//   console.log(data);
// };

// myFunction();

app.listen(port, () => {
  console.log('Running on ' + port);
});
