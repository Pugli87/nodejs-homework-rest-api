const { Contact } = require('../../models');

const updateStatusContacts = async (req, res) => {
  const { id } = req.params;
  const favorite = req.body;
  const result = await Contact.findByIdAndUpdate(id, favorite, { new: true });

  if (Object.keys(favorite).length === 0) {
    return res.status(400).json({ message: 'Missing field favorite' });
  }

  return res.status(200).json({
    result,
  });
};

module.exports = updateStatusContacts;
