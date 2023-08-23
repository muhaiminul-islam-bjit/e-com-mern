const path = require('path');
const multer = require('multer');
const { UPLOAD_DIRECTORY, ALLOWED_FILE_TYPES, MAX_FILE_SIZE } = require('../config/image');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, UPLOAD_DIRECTORY);
  },
  filename(req, file, cb) {
    const extname = path.extname(file.originalname);

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}${extname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const extname = path.extname(file.originalname);
  if (!ALLOWED_FILE_TYPES.includes(extname.substring(1))) {
    return cb(new Error('File type not allowed'));
  }

  return cb(null, true);
};

const upload = multer({ storage, limits: { fileSize: MAX_FILE_SIZE }, fileFilter });

module.exports = upload;
