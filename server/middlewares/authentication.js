const { verifyToken } = require("../helpers/jwt");
const model = require('../models');

module.exports = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    const { username } = verifyToken(access_token);
    const user = await model.findUserByUsername(username);
  
    if (!user) {
      throw { name: 'Invalid token' }
    }

    req.user = {
      id: user.id,
      username: user.username,
    };

    next();
  } catch (error) {
    next(error);
  }
};