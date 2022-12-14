const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf8");
  return await JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const listOfContacts = await listContacts();
  const [neededContact] = listOfContacts.filter(
    (item) => item.id === contactId
  );
  return neededContact;
};

async function removeContact(contactId) {
  const listOfContacts = await listContacts();
  const idx = listOfContacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removedContact] = listOfContacts.splice(idx, 1);

  await fs.writeFile(contactsPath, JSON.stringify(listOfContacts));

  return removedContact;
}

const addContact = async (body) => {
  const contact = { id: uuidv4(), ...body };
  const contactList = await listContacts();

  contactList.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(contactList));
  return contact;
};

const updateContact = async (contactId, body) => {
  const listOfContacts = await listContacts();
  const idx = listOfContacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }

  listOfContacts[idx] = { contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(listOfContacts));
  return listOfContacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
