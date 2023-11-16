const createError = require('http-errors');
const ctrlWrapper = ctrl => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      return next(createError(404, 'Not found'));
    }
  };
};

module.exports = ctrlWrapper;
