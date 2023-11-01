// const fs = require('fs/promises')
const service = require('../services/contacts');
const { nanoid } = require('nanoid');

const listContacts = async (req, res, next) => {
  //res.json({ message: 'template message 1' });
  //console.log(req.query);
  const result = await service.listAllContacts();

  res.status(200).json(result);
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const result = await service.getContactById(id);

  if (!result) {
    res.status(404).json({ message: 'Not found', error: '404' });
  } else {
    res.status(200).json(result);
  }
};

const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res
      .status(400)
      .json({ message: 'Missing required name, email, or phone field' });
  }

  const newContact = {
    id: nanoid(8),
    name,
    email,
    phone,
  };

  const result = await service.addContact(newContact);

  res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
  //res.json({ message: 'Contact was update successfully' });
  try {
    const { id } = req.params;

    const { success, result, message } = await service.updateUser(id, req.body);

    console.log(result);
    if (!success) {
      return res.status(400).json({
        result,
        message,
      });
    }

    return res.status(200).json({
      result,
      message,
    });
  } catch (error) {
    return res.status(500).json({
      result: null,
      message: error,
    });
  }
};

const removeContact = async (req, res, rext) => {
  //res.json({ message: 'Contact was deleted successfully.' });
  try {
    const { id } = req.params;

    const { success, result, message } = await service.deleteUser(id);

    console.log(result);
    if (!success) {
      return res.status(400).json({
        result,
        message,
      });
    }

    return res.status(200).json({
      result,
      message,
    });
  } catch (error) {
    return res.status(500).json({
      result: null,
      message: error,
    });
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
