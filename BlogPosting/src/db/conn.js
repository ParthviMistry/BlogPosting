const mongoose = require('mongoose');

mongoose
  .connect(
    //process.env.CONNECTION_STRING,
    'mongodb+srv://parthvi:parthvi48@cluster0.vxgk8.mongodb.net/BlogPosting',
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log('Connection Successful');
    // console.log(me);
  })
  .catch((error) => {
    console.log('Error!' + error);
  });
