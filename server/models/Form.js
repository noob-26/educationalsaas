const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  fields: {
    type: Array,
    required: true,
  },
  observerId: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const formData = mongoose.model("form", formSchema);
module.exports = formData;
