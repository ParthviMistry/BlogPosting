const express = require('express');
const multer = require('multer');
const routerPost = express.Router();
const postModel = require('../models/post');
const auth = require('../middelware/auth');

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

routerPost.post('/post', auth, upload.single('Image'), async (req, res) => {
  try {
    req.body.Image = req.file.path;
    const postBody = new postModel(req.body);
    // console.log(postBody);

    const createpost = await postBody.save();
    res.status(201).json('Post Created Successfully');
    // res.status(201).send(createpost);
  } catch (e) {
    res.status(400).json('Error' + e);
  }
});

// -- Read/Select All Post -- //

routerPost.get('/post', auth, async (req, res) => {
  try {
    const getPost = await postModel.find();

    res.status(201).json(getPost);
  } catch (e) {
    res.status(400).json('Error' + e);
  }
});

// -- Read/Select By Title post -- //

routerPost.get('/post/:title', auth, async (req, res) => {
  try {
    const titlee = req.params.title;
    // console.log(titlee);
    const getPost = await postModel.find({ title: titlee });
    // console.log(getPost);
    if (!getPost) {
      return res.status(404).json(getPost);
    } else {
      res.status(201).json(getPost);
    }
  } catch (e) {
    res.status(400).json('Error' + e);
  }
});

// -- Update post -- //

routerPost.put('/post/:id', auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const updatePost = await postModel.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    if (!updatePost) {
      return res.status(404).json(updatePost);
    } else {
      res.status(201).json('Updated Successfully');
    }
  } catch (e) {
    res.status(400).json('Error' + e);
  }
});

// -- Delete post -- //

routerPost.delete('/post/:id', auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const deletePost = await postModel.findByIdAndDelete(_id);

    if (!deletePost) {
      return res.status(404).json(deletePost);
    } else {
      res.status(201).json('Deleted Succesfully');
    }
  } catch (e) {
    res.status(400).json('Error' + e);
  }
});

//Like Post

// routerPost.put('/likePost/:id', auth, async (req, res) => {
//   const _id = req.params.id;
//   const post = await postModel.findById(_id);
//   if (!post) return res.status(400).send('Invalid Post!');

//   const updatedPost = await postModel.findByIdAndUpdate(
//     _id,
//     req.body,
//     // {
//     //   //$push: { like: _id },
//     //  $inc: { like: 1 },
//     // },
//     { new: true }
//   );
//   if (!updatedPost) {
//     return res.status(500).json('the post cannot be updated!');
//   }

//   res.json('You Liked Post');
// });

//Like Posts
routerPost.patch('/posts/like/:id', async (req, res) => {
  try {
    const post = await postModel
      .findByIdAndUpdate(
        { _id: req.params.id },
        // {
        //   $push: {
        //     like: req.user._id,
        //   },
        // },
        {
          new: true,
        }
      )
      .exec((error, result) => {
        if (error) {
          return res.status(404).send();
        } else {
          res.status(200).send(result);
        }
      });
  } catch (e) {
    res.status(400).send(e);
  }
});

//Comment Add
routerPost.put('/comments', auth, async (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.anyvariable,
  };
  const _id = req.params.id;
  const product = await postModel.findById(_id);
  if (!product) return res.status(400).json('Invalid Product!');
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
    return res.status(500).json('the product cannot be updated!');
  }
  res.json(updatedProduct);
});

module.exports = routerPost;
