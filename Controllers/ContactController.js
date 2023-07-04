const asyncHandler = require("express-async-handler");

const Contact = require("../Models/ContactModel");

//@desc Get all contact
//@route GET api/contacts
//@access private

const getAllContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_Id: req.user.id });
  res.status(200).json(contacts);
});

//@desc Create New contact
//@route POST api/contacts
//@access private

const createContact = asyncHandler(async (req, res) => {
  console.log("contact data body", req.body);
  const { name, phone, email } = req.body;
  if (!name || !phone || !email) {
    res.status(400);
    throw new Error("All Fields Are Mandetory");
  }
  const contacts = await Contact.create({
    name,
    email,
    phone,
    user_Id: req.user.id,
  });
  res.status(201).json(contacts);
});

//@desc Update contact
//@route PUT api/contacts/:id
//@access private

const updateContactOfId = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(400);
    throw new Error("Contact not found");
  }
  if (contact.user_Id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("user dont have permission to update another user contact");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

//@desc delete contact
//@route DELETE api/contacts/:id
//@access private

const deleteContactOfId = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndRemove(req.params.id);
  if (!contact) {
    res.status(400);
    throw new Error("Contact not found");
  } else if (contact.user_Id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("user dont have permission to delete another user contact");
  } else {
    res.status(200).json(contact);
  }
});

//@desc Get contact of specific id
//@route GET api/contacts/:id
//@access private

const getContactOfId = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(400);
    throw new Error("Contact not found");
  } else {
    res.status(200).json(contact);
  }
});

module.exports = {
  getAllContact,
  createContact,
  updateContactOfId,
  deleteContactOfId,
  getContactOfId,
};
