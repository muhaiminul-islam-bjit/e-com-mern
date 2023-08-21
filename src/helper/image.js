const fs = require('fs').promises;

const deleteImage = async imagePath => {
  try {
    await fs.access(imagePath);
    await fs.unlink(imagePath);
    console.log('user deleted successfully');
  } catch (error) {
    console.error(error);
  }
};

module.exports = { deleteImage };
