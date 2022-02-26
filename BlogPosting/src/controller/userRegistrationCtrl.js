const express = require('express');
const routerUser = new express.Router();

const userModel = require('../models/user');
const auth = require('../middelware/auth');

// -- Create User Registration -- //

routerUser.post(
  '/users',
  async (req, res) => {
    try {
      const user = new userModel(req.body);
      // console.log(user);

      if (
        req.body.fname == '' ||
        req.body.lname == '' ||
        req.body.email == ''
      ) {
        res.send({
          success: false,
          message: 'All Fields Are Required',
        });
      }

      await user.save();

      const token = await user.generateAuthToken();
      console.log(token);

      // res.status(201).send({ token });

      res.send({
        token,
        success: true,
        message: 'Added Successfully',
        // user,
      });
      // res.status(200).json('Added Successfully');
      // res.status(201).send('Added Successfully');
    } catch (e) {
      res.send({
        success: false,
        message: 'Faild To Signup,please Try Again',
        e: e.message,
      });
    }
  }
  // try {
  //   const userBody = new userModel(
  //     req.body
  //     // {
  //     // fname: req.body.fname,
  //     // lname: req.body.lname,
  //     // email: req.body.email,
  //     // password: bcrypt.hashSync(req.body.password.toString(), 10),
  //     // contact: req.body.contact,
  //     // userType: req.body.userType,
  //     // }
  //   );

  //   const createUser = await userBody.save();
  //   res.status(201).send(createUser);
  //}
  // catch (e) {
  //   res.status(400).send('Error' + e);
  // }
);

// -- Login --//

routerUser.post('/users/login', async (req, res) => {
  try {
    console.log(req.body);
    const user = await userModel.findByCredentials(
      req.body.email,
      req.body.password
    );
    console.log(user);

    const token = await user.generateAuthToken();
    console.log(token);

    res.send({
      token,
      success: true,
      message: 'Login Succesfullyy',
      // user,
    });
    // res.json('Login Succesfully');
    // res.json({ user, token });
  } catch (e) {
    // res.status(404).json();
    res.send({
      success: false,
      message: 'Unable to login,please Try Again',
      e: e.message,
    });
  }
});

// -- Read/Select User -- //

routerUser.get('/users', auth, async (req, res) => {
  try {
    const userGet = await userModel.find();

    //res.status(200).json('Added Successfully');
    res.status(201).json(userGet);
  } catch (e) {
    res.status(400).json('Error' + e);
  }
});

// -- Read/Select User By Id -- //

routerUser.get('/users/:id', auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const userGetId = await userModel.findById(_id);
    console.log(userGetId);
    if (!userGetId) {
      return res.status(404).send(userGetId);
    } else {
      res.status(201).send(userGetId);
    }
    // res.status(201).json(userGetId);
  } catch (e) {
    res.status(400).json('Error' + e);
  }
});

// -- Update User By Id -- //

routerUser.put('/users/:id', auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const userUpdate = await userModel.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    // if (!userUpdate) {
    //   return res.status(404).json(userUpdate);
    // } else {
    //   res.status(201).json(userUpdate);
    // }
    res.status(201).json('Update Successfully');
  } catch (e) {
    res.status(400).json('Error' + e);
  }
});

// -- Delete User By Id -- //

routerUser.delete('/users/:id', auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const userDelete = await userModel.findByIdAndDelete(_id);

    if (!userDelete) {
      return res.status(404).json(userDelete);
    } else {
      res.status(201).json('Deleted Succesfully');
    }
  } catch (e) {
    res.status(400).json('Error' + e);
  }
});

routerUser.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.json('Logout');
  } catch (e) {
    res.status(500).json();
  }
});

routerUser.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.json('Logged out');
  } catch (e) {
    res.status(500).json();
  }
});

routerUser.get('/users/me', auth, async (req, res) => {
  res.json(req.user);
});

// routerUser.post('/login', async (req, res) => {
//   const user = await userModel.findOne({ email: req.body.email });
//   console.log(user);
//   const secret = 'marvel';
//   console.log(secret);
//   if (!user) {
//     return res.status(400).send('The user not found');
//   }
//   if (user && bcrypt.compareSync(req.body.password.toString(), user.password)) {
//     const token = jwt.sign(
//       {
//         userId: user.id,
//       },
//       secret,
//       {
//         expiresIn: '24h',
//       }
//     );
//     res.status(200).json({ user: user.email, token: token });
//   } else {
//     res.status(400).send('password is wrong!');
//   }
// });

module.exports = routerUser;
