const express = require("express");

const getAllContacts = require("../../controllers/getAllContacts");
const getContactById = require("../../controllers/getContactById");
const addContact = require("../../controllers/addContact");
const deleteContact = require("../../controllers/deleteContact");
const updateContact = require("../../controllers/updateContact");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", getContactById);

router.post("/", addContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", updateContact);

module.exports = router;
