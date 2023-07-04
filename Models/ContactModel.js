const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_Id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "please add the contact name"],
    },

    email: {
      type: String,
      required: [true, "please add the email address "],
    },

    phone: {
      type: String,
      required: [true, "please add the contact number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
