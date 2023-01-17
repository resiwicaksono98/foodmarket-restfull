/** @format */

const mongoose = require("mongoose");

mongoose.connect(`mongodb+srv://resiwicaksono:thonkwaq123@cluster0.a3dlh.mongodb.net/wakburgerbar?retryWrites=true&w=majority`);
const db = mongoose.connection;

module.exports = db;
