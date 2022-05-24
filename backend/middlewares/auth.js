require('dotenv').config();
const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

const { JWT_SECRET = 'super-secret-key' } = process.env;
module.exports = (req, res, next) => {
  const authorization =
  req.cookies.jwt || req.headers.authorization.replace('Bearer ', '');
  if (!authorization) {
    return next(new Unauthorized('Ошибка авторизации'));
  }
  let payload;
  try {
    payload = jwt.verify(authorization, JWT_SECRET);
  } catch (err) {
    return next(new Unauthorized('Ошибка авторизации'));
  }
  req.user = payload;
  return next();
};