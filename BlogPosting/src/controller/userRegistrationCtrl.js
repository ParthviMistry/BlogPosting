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
      console.log(user);
      await user.save();

      const token = await user.generateAuthToken();

      res.status(201).send({ user, token });
      res.status(201).send('Added Successfully');
    } catch (e) {
      res.status(400).send(e);
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

// -- Read/Select User -- //

routerUser.get('/users', async (req, res) => {
  try {
    const userGet = await userModel.find();

    res.status(201).send(userGet);
  } catch (e) {
    res.status(400).send('Error' + e);
  }
});

// -- Read/Select User By Id -- //

routerUser.get('/users/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const userGetId = await userModel.findById(_id);

    if (!userGetId) {
      return res.status(404).send(userGetId);
    } else {
      res.status(201).send(userGetId);
    }
  } catch (e) {
    res.status(400).send('Error' + e);
  }
});

// -- Update User By Id -- //

routerUser.put('/users/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const userUpdate = await userModel.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    if (!userUpdate) {
      return res.status(404).send(userUpdate);
    } else {
      res.status(201).send(userUpdate);
    }
  } catch (e) {
    res.status(400).send('Error' + e);
  }
});

// -- Delete User By Id -- //

routerUser.delete('/users/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const userDelete = await userModel.findByIdAndDelete(_id);

    if (!userDelete) {
      return res.status(404).send(userDelete);
    } else {
      res.status(201).send(userDelete);
    }
  } catch (e) {
    res.status(400).send('Error' + e);
  }
});

// -- Login --//

routerUser.post('/users/login', auth, async (req, res) => {
  try {
    console.log(req.body);
    const user = await userModel.findByCredentials(
      req.body.email,
      req.body.password
    );
    console.log(user);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(404).send();
  }
});

routerUser.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

routerUser.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send('Logged out');
  } catch (e) {
    res.status(500).send();
  }
});

routerUser.get('/users/me', auth, async (req, res) => {
  res.send(req.user);
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
