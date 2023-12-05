// controller/index.js
const Joi = require("joi");
const Contact = require("../models/contact");

const getAllContacts = async (req, res, next) => {
	try {
		const ownerId = req.user._id; // Get the _id of the current user
		const contacts = await Contact.find({ owner: ownerId }); // Filter contacts by owner
		res.json({ contacts });
	} catch (error) {
		next(error);
	}
};

const getContactById = async (req, res, next) => {
	const { contactId } = req.params;
	try {
		const contact = await Contact.findById(contactId);
		if (!contact) {
			return res.status(404).json({ message: "Not found" });
		}
		res.json({ contact });
	} catch (error) {
		next(error);
	}
};

const createContact = async (req, res, next) => {
	try {
		const schema = Joi.object({
			name: Joi.string().required(),
			email: Joi.string().email(),
			phone: Joi.string(),
			favorite: Joi.boolean(),
		});

		const { error } = schema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.details[0].message });
		}

		const ownerId = req.user._id; // Get the authenticated user's _id
		const newContactData = { ...req.body, owner: ownerId };

		const newContact = await Contact.create(newContactData);
		res.status(201).json({ newContact });
	} catch (error) {
		next(error);
	}
};

const updateContact = async (req, res, next) => {
	const { contactId } = req.params;
	try {
		const updatedContact = await Contact.findByIdAndUpdate(
			contactId,
			req.body,
			{ new: true }
		);
		if (!updatedContact) {
			return res.status(404).json({ message: "Not found" });
		}
		res.json({ updatedContact });
	} catch (error) {
		next(error);
	}
};

const deleteContact = async (req, res, next) => {
	const { contactId } = req.params;
	try {
		const deletedContact = await Contact.findByIdAndDelete(contactId);
		if (!deletedContact) {
			return res.status(404).json({ message: "Not found" });
		}
		res.json({ deletedContact });
	} catch (error) {
		next(error);
	}
};

const updateStatusContact = async (req, res, next) => {
	const { contactId } = req.params;
	try {
		const updatedContact = await Contact.findByIdAndUpdate(
			contactId,
			{ favorite: req.body.favorite },
			{ new: true }
		);
		if (!updatedContact) {
			return res.status(404).json({ message: "Not found" });
		}
		res.json({ updatedContact });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAllContacts,
	getContactById,
	createContact,
	updateContact,
	deleteContact,
	updateStatusContact,
};
