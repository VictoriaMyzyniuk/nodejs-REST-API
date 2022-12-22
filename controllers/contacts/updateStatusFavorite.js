const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const updateStatusFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  if (!favorite) {
    res.json({ message: "missing field favorite" });
  }
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );
  if (!result) {
    throw new NotFound();
  }
  res.json(result);
};
module.exports = updateStatusFavorite;
