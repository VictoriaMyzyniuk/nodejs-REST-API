const contactsOperations = require("../models/contacts");
const contactSchema = require("../schema/schema");
const { NotFound } = require("http-errors");

const updateContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = `missing fields`;
      throw error;
    }
    const { contactId } = req.params;
    const result = await contactsOperations.updateContact(contactId, req.body);
    if (!result) {
      throw new NotFound();
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
module.exports = updateContact;
