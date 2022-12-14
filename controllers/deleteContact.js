const { NotFound } = require("http-errors");
const contactsOperations = require("../models/contacts");
const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if (!result) {
      throw new NotFound("what a fuck");
    }
    res.json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
