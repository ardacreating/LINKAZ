const { Schema, model } = require("mongoose");

const Link = Schema({
  author: String,
  shortUrl: { type: String, required: true },
  url: { type: String, required: true },
  view: Number,
});

module.exports = model("Link", Link);
