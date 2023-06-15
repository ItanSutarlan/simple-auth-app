// eslint-disable-next-line no-unused-vars
module.exports = (error, req, res, next) => {
  if (
    error.name === 'Username is required'
    || error.name === 'Password is required'
    || error.name === 'Age is required'
    || error.name === 'Username is not available'
    || error.name === 'Email format is invalid'
    || error.name === 'Password should have six characters which contain at least One capital letter and the combination of letter and number'
    || error.name === 'Password must be greater than or equal to 18 years old'
  ) {
    res.status(400).json({ message: error.name });
  } else if (error.name === 'Invalid email/password') {
    res.status(401).json({ message: error.name });
  } else if (error.name === 'Invalid token' || error.name === 'JsonWebTokenError') {
    res.status(401).json({ message: 'Invalid token' });
  } else {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};