const { NotFound } = require("http-errors");

const contactsOperations = require("../models/contacts");
const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);
    if (!result) {
      throw new NotFound(`Contact ${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
module.exports = getContactById;
