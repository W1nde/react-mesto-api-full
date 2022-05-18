const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const {
  getUser, getMe, getUserId, patchProfile, patchAvatar
} = require("../controllers/user");

router.get("/", getUser);

router.get("/me", getMe);

router.get(
  "/:userId",
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex().required(),
    }),
  }),
  getUserId,
);

router.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  patchProfile,
);

router.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/)
        .required(),
    }),
  }),
  patchAvatar,
);

module.exports = router;
