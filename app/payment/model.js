const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const Payment = new Schema(
  {
    transactionId: {
      type: String,
      required: [true, "transactionId is required "],
      unique: [true, "transactionId is already exist"],
    },
    paymentType: {
      type: String,
      required: [true, "Payment  is required"],
    },
    transactionStatus: {
      type: String,
      required: [true, "Transcation status  is required"],
    },
    grossAmount: {
      type: Number,
      required: [true, "Gross Amount is required"],
    },
    currency: {
      type: String,
      default: "IDR",
    },
    bank: {
      type: String,
    },
    fraudStatus: {
      type: String,
    },
    signatureKey: {
      type: String,
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  },
  { timestamps: true }
);

module.exports = model("Payment", Payment);
