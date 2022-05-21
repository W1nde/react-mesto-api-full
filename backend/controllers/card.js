const Card = require("../models/card");
const NotFound = require("../errors/NotFound");
const Forbidden = require("../errors/Forbidden");
const ValidationError = require("../errors/ValidationError");
const CastError = require("../errors/CastError")

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new ValidationError("Переданы неккоректные данные"));
      } else {
        next(err);
      }
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFound("Карточки с таким ID не существует"));
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new CastError("Переданы некорректные данные"));
    }
  })
  .catch(next)
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFound("Карточки с указанным ID не существует"));
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new CastError("Переданы некорректные данные"));
    }
  })
  .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail()
    .catch(() => new NotFound('Карточка не найдена'))
    .then((card) => {
      console.log(card);
      if (req.user._id !== card.owner.toString()) {
        throw new Forbidden('Вы не можете удалить чужую карточку');
      }
      Card.findByIdAndDelete(req.params.cardId)
        .then((cardData) => {
          res.send({ data: cardData });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new CastError("Переданы некорректные данные"));
    }
  })
  .catch(next);
};