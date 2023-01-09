const { Schema, model } = require("mongoose");

const User = Schema({
  ip: { type: String, required: true },
  urls: { type: Array, default: [] },
  timeouted: { type: Boolean, default: false },
});

module.exports = model("User", User);
