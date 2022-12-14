const contactsOperations = require("../models/contacts");
const contactSchema = require("../schema/schema");

const addContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = `missing required field`;
      throw error;
    }
    const result = await contactsOperations.addContact(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
