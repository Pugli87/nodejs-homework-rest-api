const express = require('express');
const { validation, ctrlWrapper } = require('../../middlewares');
const { contacts: ctrl } = require('../../controllers');
const { joiSchema, favoriteJoiSchema } = require('../../models');

const routerContacts = express.Router();

routerContacts.get('/', ctrlWrapper(ctrl.getContacts));

routerContacts.get('/:id', ctrlWrapper(ctrl.getContactById));

routerContacts.post('/', validation(joiSchema), ctrlWrapper(ctrl.createContact));

routerContacts.put('/:id', ctrlWrapper(ctrl.updateContact));

routerContacts.patch('/:id/favorite', validation(favoriteJoiSchema), ctrlWrapper(ctrl.updateStatusContacts));

routerContacts.delete('/:id', ctrlWrapper(ctrl.removeContact));

module.exports = routerContacts;
