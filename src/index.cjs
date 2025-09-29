"use strict";

const dictionary = require("./dictionary/en/en.json");
const { createWordLib } = require("./core.js");

const api = createWordLib(dictionary);

module.exports = api;
module.exports.default = api;
module.exports.exists = api.exists;
module.exports.random = api.random;
