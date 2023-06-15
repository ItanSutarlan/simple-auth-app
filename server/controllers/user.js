const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const model = require('../models');

class UserController {
  static async register(req, res, next) {
    try {
      const { username, password, age } = req.body;

      const errMessage = UserController.validateRegisterPayload({username, password, age});
      if (errMessage) {
        throw { name: errMessage };
      }

      const user = await model.findUserByUsername(username);

      if (user) {
        throw { name: 'Username is not available' };
      }

      await model.createUser({ username, password, age });

      res.status(201).json({
        statusCode: 201,
        message: 'User created successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body;

      const errMessage = UserController.validateLoginPayload({username, password});
      if (errMessage) {
        throw { name: errMessage };
      }

      const user = await model.findUserByUsername(username);

      if (!user) {
        throw { name: 'Invalid email/password' };
      }

      const isMatch = comparePassword(password, user.password);
      if (!isMatch) {
        throw { name: 'Invalid email/password' };
      }

      const access_token = generateToken({
        id: user.id,
        username: user.username,
      });

      res.status(200).json({
        access_token,
        username: user.username,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUsers(req, res, next) {
    try {
      const result = await model.getUsers();
      const mappedResult = result.map(e => UserController.mapToModel(e));
      res.json(mappedResult);
    } catch (error) {
      next(error)
    }
  }

  static mapToModel({id, username, age}) {
    return {
      id, username, age
    }
  }

  static validateRegisterPayload({
    username, password, age,
  }) {
    if (!username) {
      return 'Username is required'
    }
    if (!password) {
      return 'Password is required'
    }
    if (!age) {
      return 'Age is required'
    }
    const Emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!Emailregex.test(username)) {
      return 'Email format is invalid'
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-zA-Z0-9]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return 'Password should have six characters which contain at least One capital letter and the combination of letter and number'
    }
    if (age < 18) {
      return 'Password must be greater than or equal to 18 years old'
    }
    return null
  }

  static validateLoginPayload({
    username, password
  }) {
    if (!username) {
      return 'Username is required'
    }
    if (!password) {
      return 'Password is required'
    }
    return null
  }
}

module.exports = UserController;