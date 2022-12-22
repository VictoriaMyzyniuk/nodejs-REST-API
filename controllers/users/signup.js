const { Conflict } = require("http-errors");
const { User } = require("../../models");

const signup = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const newUser = new User({ email, password });
  newUser.setPassword(password);
  newUser.save();

  res.json({
    user: {
      email: email,

      subscription: "starter",
    },
  });
};

module.exports = signup;
