const Card = require("../models/card");
const NotFound = require("../errors/NotFound");
const Forbidden = require("../errors/Forbidden");
const ValidationError = require("../errors/ValidationError");

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
    .catch(next);
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
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => new NotFound("Нет карточки по заданному ID"))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return next(new Forbidden("Нельзя удалить чужую карточку"));
      }
      return card.remove()
        .then(() => res.send({ message: "Карточка удалена" }));
    })
    .catch(next);
};
