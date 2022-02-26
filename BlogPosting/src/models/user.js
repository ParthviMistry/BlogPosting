const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    fname: {
      type: String,
      required: true,
      trim: true,
    },
    lname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      // match:
      //   /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      // validate(value) {
      //   if (!validator.isEmail(value)) {
      //     throw new Error('Invalid Email');
      //   }
      // },
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    // tokens: [
    //   {
    //     token: {
    //       type: String,
    //       required: true,
    //     },
    //   },
    // ],
  },
  { timestamps: true }
);

// UserSchema.methods.generateAuthToken = async function (_id) {
//   // const user = this;

//   // const token = jwt.sign({ _id: user._id.toString() }, 'BlogPosting');

//   // user.tokens = user.tokens.concat({ token });
//   // await user.save();

//   // return token;

//   try {
//     const token = jwt.sign({ _id }, 'BlogPosting', {
//       expiresIn: '1 days',
//     });
//     return token;
//   } catch (err) {
//     console.log(err);
//   }
// };

UserSchema.methods.generateAuthToken = () => {
  // const _id = req.params.id;
  try {
    const token = jwt.sign({ _id: 'abc123' }, 'BlogPosting', {
      expiresIn: '1 days',
    });
    // console.log(token);
    return token;
  } catch (err) {
    console.log(err);
  }
};

UserSchema.statics.findByCredentials = async (email, password, res) => {
  const user = await userModel.findOne({ email });
  // console.log(user);

  if (!user) {
    throw new Error('Unable to login');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch);

  // if (!isMatch) {
  //   throw new Error('Unable to login');
  // }

  if (isMatch) {
    const token = await user.generateAuthToken();
    user.toJSON = function () {
      return { email, token };
    };
  } else {
    throw new Error('Unable to login');
  }

  return user;
};

// Hash the plain text password before saving
UserSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const userModel = new mongoose.model('user', UserSchema);
module.exports = userModel;

// const me = new User({
//   fname: 'Parthvi',
//   lname: 'Mistry',
//   email: 'parthvi@gmail.com',
//   password: '123',
//   contact: 1234567895,
// });

// me.save()
//   .then(() => {
//     console.log('Connection Successful');
//     console.log(me);
//   })
//   .catch((error) => {
//     console.log('Error!', error);
//   });
