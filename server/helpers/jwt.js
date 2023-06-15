const jwt = require('jsonwebtoken');

module.exports = {
  generateToken: ({ id, username }) => {
    return jwt.sign({ id, username }, process.env.ACCESS_TOKEN_KEY);
  },
  verifyToken: (token) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
  },
};