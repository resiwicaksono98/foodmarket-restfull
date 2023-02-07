/** @format */

const mongoose = require("mongoose");

// Local
// mongoose.connect("mongodb://127.0.0.1:27017/foodstore");
// const db = mongoose.connection;

// Production
mongoose.connect(`mongodb+srv://resiwicaksono:thonkwaq123@cluster0.a3dlh.mongodb.net/wakburgerbar?retryWrites=true&w=majority`);
const db = mongoose.connection;

module.exports = db;
