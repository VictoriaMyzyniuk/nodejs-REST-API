const express = require("express");

const { validation, ctrlWrapper, auth } = require("../../middlewares");
const { users: controller } = require("../../controllers");
const { joiSignupSchema, joiLoginSchema } = require("../../models/user");

const router = express.Router();

router.post(
  "/signup",
  validation(joiSignupSchema),
  ctrlWrapper(controller.signup)
);

router.post(
  "/login",
  validation(joiLoginSchema),
  ctrlWrapper(controller.login)
);

router.get("/current", auth, ctrlWrapper(controller.getCurrent));

router.get("/logout", auth, ctrlWrapper(controller.logout));

module.exports = router;
