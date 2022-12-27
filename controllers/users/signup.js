const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { User } = require("../../models");
const { v4: uuidv4 } = require("uuid");
const sendEmail = require("../../sendgrid");

const signup = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();
  const newUser = new User({ email, password, avatarURL, verificationToken });
  newUser.setPassword(password);
  await newUser.save();
  const mail = {
    to: email,
    subject: "Email verification",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Verify email please</a>`,
  };
  await sendEmail(mail);

  res.json({
    user: {
      email: email,
      avatarURL: avatarURL,
      subscription: "starter",
      verificationToken,
    },
  });
};

module.exports = signup;
