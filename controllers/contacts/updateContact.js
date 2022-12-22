const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw new NotFound();
  }
  res.json(result);
};
module.exports = updateContact;
