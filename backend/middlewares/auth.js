require('dotenv').config();
const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

const { JWT_SECRET_KEY = 'super-secret-key' } = process.env;
module.exports = (req, res, next) => {
  const cookieAuthorization = req.cookies.jwt;
  if (!cookieAuthorization) {
    return next(new Unauthorized('Ошибка авторизации'));
  }
  let payload;
  try {
    payload = jwt.verify(cookieAuthorization, JWT_SECRET_KEY);
  } catch (err) {
    return next(new Unauthorized('Ошибка авторизации'));
  }
  req.user = payload;
  return next();
};