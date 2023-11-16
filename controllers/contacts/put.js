const { Contact } = require('../../models');

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'Missing field' });
  }

  return res.status(200).json({
    result,
  });
};

module.exports = updateContact;
