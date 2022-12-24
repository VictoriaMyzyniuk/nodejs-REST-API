const express = require("express");

const { validation, ctrlWrapper, auth, upload } = require("../../middlewares");
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

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(controller.updateAvatar)
);

module.exports = router;
