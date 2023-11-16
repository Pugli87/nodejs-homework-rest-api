const { Contact } = require('../../models');

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);

  if (!result) {
    return res.status(404).json({
      message: 'Not found',
    });
  }

  return res.status(200).json({
    message: 'Deleted contact',
  });
};
module.exports = removeContact;
