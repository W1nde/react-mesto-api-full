const jwt = require("jsonwebtoken");
const Unauthorized = require("../errors/Unauthorized");

module.exports = (req, res, next) => {
  const cookieAuthorization = req.cookies.jwt;
  if (!cookieAuthorization) {
    return next(new Unauthorized("Ошибка авторизации"));
  }
  let payload;
  try {
    payload = jwt.verify(cookieAuthorization, "super-secret-key");
  } catch (err) {
    return next(new Unauthorized("Ошибка авторизации"));
  }
  req.user = payload;
  return next();
};
