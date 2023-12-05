// api/contacts.js (Updated protected route)
const express = require("express");
const controller = require("../../controller/contacts");
const auth = require("../../middleware/auth"); // Import the authentication middleware

const contactsRouter = express.Router();

contactsRouter.get("/", auth, controller.getAllContacts); // Use auth middleware
contactsRouter.get("/:contactId", auth, controller.getContactById); // Use auth middleware
contactsRouter.post("/", auth, controller.createContact); // Use auth middleware
contactsRouter.put("/:contactId", auth, controller.updateContact); // Use auth middleware
contactsRouter.delete("/:contactId", auth, controller.deleteContact); // Use auth middleware
contactsRouter.patch(
	"/:contactId/favorite",
	auth,
	controller.updateStatusContact
); // Use auth middleware

module.exports = contactsRouter;
