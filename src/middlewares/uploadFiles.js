const multer = require('multer');
const { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } = require('../config/image');

// const path = require('path');
// const { UPLOAD_DIRECTORY, ALLOWED_FILE_TYPES, MAX_FILE_SIZE } = require('../config/image');

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, UPLOAD_DIRECTORY);
//   },
//   filename(req, file, cb) {
//     const extname = path.extname(file.originalname);

//     const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//     cb(null, `${uniqueSuffix}${extname}`);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const extname = path.extname(file.originalname);
//   if (!ALLOWED_FILE_TYPES.includes(extname.substring(1))) {
//     return cb(new Error('File type not allowed'));
//   }

//   return cb(null, true);
// };

// const upload = multer({ storage, limits: { fileSize: MAX_FILE_SIZE }, fileFilter });

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Only image files are allowed'), false);
  }

  if (file.size > MAX_FILE_SIZE) {
    return cb(new Error('File size exceeds the maximum limit'), false);
  }

  if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
    return cb(new Error('File type is not allowed'), false);
  }
  return cb(null, true);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
