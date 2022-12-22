const { Contact } = require("../../models");

const addContact = async (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  const result = await Contact.create({ ...req.body, owner: _id });
  res.json(result);
};

module.exports = addContact;
