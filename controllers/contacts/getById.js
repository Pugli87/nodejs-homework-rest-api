const { Contact } = require('../../models');
const createError = require('http-errors');

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);

  res.status(200).json(contact);
};

module.exports = getContactById;
