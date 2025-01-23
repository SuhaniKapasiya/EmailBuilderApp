const mongoose = require("mongoose");

const EmailTemplateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  footer: {
    type: String,
    required: true,
  },
  imageUrls: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("EmailTemplate", EmailTemplateSchema);
