const express = require('express');
const multer = require('multer');
const routerPost = express.Router();
const postModel = require('../models/post');

const upload = require('../middelware/upload');

// -- Create post -- //

// const upload = multer({
//   dest: 'avatars',
//   fileFilter: (req, file, callback) => {
//     if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//       return callback(new Error('Please Upload Image'));
//     } else {
//       console.log('Image Uploaded');
//     }
//     callback(undefined, true);
//   },
//   limits: {
//     fileSize: 1000000,
//   },
// });

routerPost.post('/post', upload.single('Image'), async (req, res) => {
  try {
    req.body.Image = req.file.path;
    const postBody = new postModel(req.body);
    // console.log(postBody);

    const createpost = await postBody.save();
    res.status(201).send(createpost);
  } catch (e) {
    res.status(400).send('Error' + e);
  }
});

// -- Read/Select All Post -- //

routerPost.get('/post', async (req, res) => {
  try {
    const getPost = await postModel.find();

    res.status(201).send(getPost);
  } catch (e) {
    res.status(400).send('Error' + e);
  }
});

// -- Read/Select By Title post -- //

routerPost.get('/post/:title', async (req, res) => {
  try {
    const titlee = req.params.title;
    // console.log(titlee);
    const getPost = await postModel.find({ title: titlee });
    // console.log(getPost);
    if (!getPost) {
      return res.status(404).send(getPost);
    } else {
      res.status(201).send(getPost);
    }
  } catch (e) {
    res.status(400).send('Error' + e);
  }
});

// -- Update post -- //

routerPost.put('/post/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const updatePost = await postModel.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    if (!updatePost) {
      return res.status(404).send(updatePost);
    } else {
      res.status(201).send(updatePost);
    }
  } catch (e) {
    res.status(400).send('Error' + e);
  }
});

// -- Delete post -- //

routerPost.delete('/post/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const deletePost = await postModel.findByIdAndDelete(_id);

    if (!deletePost) {
      return res.status(404).send(deletePost);
    } else {
      res.status(201).send(deletePost);
    }
  } catch (e) {
    res.status(400).send('Error' + e);
  }
});

//Like Product
routerPost.put('/likePost/:id', async (req, res) => {
  const _id = req.params.id;
  const product = await postModel.findById(_id);
  if (!product) return res.status(400).send('Invalid Product!');

  const updatedProduct = await postModel.findByIdAndUpdate(
    _id,
    req.body,
    // {
    //   // $push: { like:  },
    //   $inc: { like: 1 },
    // },
    { new: true } //true to return the modified document rather than the original
  );
  if (!updatedProduct) {
    return res.status(500).send('the product cannot be updated!');
  }

  res.send(updatedProduct);
});

//Comment Add
routerPost.put('/comments', async (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.anyvariable,
  };
  const _id = req.params.id;
  const product = await postModel.findById(_id);
  if (!product) return res.status(400).send('Invalid Product!');
  const updatedProduct = await postModel.findByIdAndUpdate(
    _id,
    req.body,
    // {
    //   $push: { comments: comment },
    // },
    { new: true } //true to return the modified document rather than the original
  );
  //.populate('comments.postedBy');
  if (!updatedProduct) {
    return res.status(500).send('the product cannot be updated!');
  }
  res.send(updatedProduct);
});

module.exports = routerPost;
