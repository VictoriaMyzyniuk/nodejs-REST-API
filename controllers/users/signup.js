const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { User } = require("../../models");

const signup = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const avatarURL = gravatar.url(email);
  const newUser = new User({ email, password, avatarURL });
  newUser.setPassword(password);
  newUser.save();

  res.json({
    user: {
      email: email,
      avatarURL: avatarURL,
      subscription: "starter",
    },
  });
};

module.exports = signup;
