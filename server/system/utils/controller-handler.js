const boom = require("@hapi/boom");

// eslint-disable-next-line consistent-return
const controllerHandler = (promise, params) => async (req, res, next) => {
  const boundParams = params ? params(req, res, next) : [];
  try {
    const result = await promise(...boundParams);
    return res.json(
      result || {
        message: "OK",
      }
    );
  } catch (error) {
    console.log(error, "error");
    if (!error.isBoom) {
      return next(boom.conflict("Something went wrong"));
    }
    next(error);
  }
};

module.exports = controllerHandler;
