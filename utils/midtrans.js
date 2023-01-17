/** @format */

const midtransClient = require("midtrans-client");
const { midtransServerKey } = require("../config/Config");

const coreApi = new midtransClient.CoreApi({
   isProduction: false,
   serverKey: midtransServerKey,
   clientKey: "SB-Mid-client-Y8OjEH9X3Ibrq6Is",
});

module.exports = { coreApi };
