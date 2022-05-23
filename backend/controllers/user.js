require('dotenv').config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const NotFound = require("../errors/NotFound");
const ValidationError = require("../errors/ValidationError");
const Conflict = require("../errors/Conflict");
const CastError = require("../errors/CastError")

const { JWT_SECRET_KEY = 'super-secret-key' } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      const { _id } = user;
      res.send({
        _id,
        name,
        about,
        avatar,
        email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict('Пользователь с таким e-mail уже зарегистрирован'));
      } else if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные id пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.getUser = (req, res, next) => {
  User.find({})
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new CastError("Переданы некорректные данные"));
    }
    next(err);
  })
};

module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        next(new NotFound("Пользователь с указанным ID не найден"));
      }
      return res.send(user);
    })
    .catch(next);
};

module.exports.patchProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true, new: true  })
    .then((user) => res.send({ _id: user._id, name, about }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new ValidationError("Переданы некорректные данные"));
      }
      if (err.name === "CastError") {
        next(new CastError("Переданы некорректные данные"));
      }
      next(err);
    });
};

module.exports.patchAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true, new: true  })
    .then((user) => res.send({ _id: user._id, avatar }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new ValidationError("Переданы некорректные данные"));
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET_KEY,
        { expiresIn: "7d" },
      );
      // создание куки токена
      res.cookie("jwt", token, {
        maxAge: 3600000,
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      });
      res.send({ token });
    })
    .catch(next);
};

module.exports.getMe = (req, res, next) => {
  const { _id } = req.user;
  User.findById({ _id })
    .then((user) => {
      if (!user) {
        next(new NotFound("Указанный пользователь не найден"));
      }
      return res.send(user);
    })
    .catch(next);
};
