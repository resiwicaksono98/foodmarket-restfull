/** @format */

const dotenv = require("dotenv").config();
const path = require("path");

module.exports = {
   rootPath: path.resolve(__dirname, ".."),
   secretKey: process.env.SECRET_KEY,
   serviceName: process.env.SERVICE_NAME,
   dbHost: process.env.DB_HOST,
   dbPort: process.env.DB_PORT,
   dbUser: process.env.DB_USER,
   dbPass: process.env.DB_PASS,
   dbName: process.env.DB_NAME,
   midtransServerKey: process.env.MIDTRANS_SERVER_KEY,
   appStatus: process.env.STATUS,
};
