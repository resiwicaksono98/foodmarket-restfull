const Invoice = require("./model");
const { coreApi } = require("../../utils/midtrans");

const show = async (req, res, next) => {
  try {
    let { order_id } = req.params;
    coreApi.transaction
      .status(order_id)
      .then(async (result) => {
        if (result.transaction_status == "settlement") {
          await Invoice.findOneAndUpdate(
            { order: order_id },
            { payment_status: "paid" }
          );
        } else if (result.transaction_status === "cancel") {
          await Invoice.findOneAndUpdate(
            { order: order_id },
            { payment_status: "cancel" }
          );
        }
      })
      .catch((err) => {});
    let invoice = await Invoice.findOne({ order: order_id })
      .populate("order")
      .populate("user", "-token -password -createdAt -updatedAt -role");

    return res.json(invoice);
  } catch (err) {
    return res.status(404).json({ message: "Invoice not found" });
  }
};

module.exports = { show };
