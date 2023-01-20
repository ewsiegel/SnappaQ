const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
  name: String,
  // TODO post MVP :)
});

// compile model from schema
module.exports = mongoose.model("organization", OrganizationSchema);
