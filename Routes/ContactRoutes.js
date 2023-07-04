const express = require("express");
const {
  getAllContact,
  createContact,
  updateContactOfId,
  deleteContactOfId,
  getContactOfId,
} = require("../Controllers/ContactController");
const validateToken = require("../Middleware/ValidateTokenHandler");
const router = express.Router();

router.use(validateToken);

router.route("/").get(getAllContact);

router.route("/").post(createContact);

router.route("/:id").put(updateContactOfId);

router.route("/:id").delete(deleteContactOfId);

router.route("/:id").get(getContactOfId);

module.exports = router;
