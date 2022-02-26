const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

const auth = async (req, res, next) => {
  try {
    // console.log(req.body);
    const token = req.header('Authorization').replace('Bearer ', '');
    console.log('token :' + token);
    const decoded = jwt.verify(token, 'BlogPosting');
    console.log('decoded :' + decoded);
    const user = await userModel.findOne({
      _id: decoded._id,
      email: decoded.email,
    });
    console.log('user :' + user);
    if (!user) {
      throw new Error();
    }
    req.currentUser = user;
    req._id = user._id;
    req.token = token;
    req.user = user;
    // localStorage('userData');
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;

//     //get token from client
//     const token = req.header("Authorization");
//     const decodeUser = jwt.verify(token, process.env.SECRET_KEY);
//     const data = await User.findOne({ email: decodeUser.email });
//     if (!data) {
//       throw new Error();
//     }
//     req.currentUser = data;
//     req._id = data._id;
//     next();
//   } catch (err) {
//     res.send({
//       success: false,
//       message: "Please Login First....",
//       err: err.message,
//     });
//   }
// };
// module.exports = auth;
