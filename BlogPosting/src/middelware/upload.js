const path = require('path');
const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: (req, file, cd) => {
//     cd(nill, 'uploads/');
//   },
//   filename: (req, flie, cd) => {
//     let ext = path.extname(flie.originalname);
//     cd(null, Date.now() + ext);
//   },
// });

const upload = multer({
  dest: 'uploads',
  fileFilter: (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error('Please Upload Image'));
    } else {
      console.log('Image Uploaded');
    }
    callback(undefined, true);
  },
  limits: {
    fileSize: 100000000,
  },
});

module.exports = upload;
