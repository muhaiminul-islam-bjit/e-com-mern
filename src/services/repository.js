const createHttpError = require('http-errors');
const { default: mongoose } = require('mongoose');

const getById = async (id, Model, options = {}) => {
  try {
    const item = await Model.findById(id, options);
    if (!item) throw createHttpError(400, `${Model.modelName} not found by the id: ${id}`);

    return item;
  } catch (error) {
    if (error instanceof mongoose.Error) throw createHttpError(400, 'Invalid User id');
    throw error;
  }
};

const deleteById = async (id, Model) => {
  try {
    const item = await Model.deleteOne({ _id: id });
    if (!item) throw createHttpError(400, `${Model.modelName} not found by the id: ${id}`);

    return item;
  } catch (error) {
    if (error instanceof mongoose.Error) throw createHttpError(400, 'Invalid User id');
    throw error;
  }
};

module.exports = { getById, deleteById };
