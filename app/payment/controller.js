const Payment = require("./model");
const Order = require("../order/model");

const { coreApi } = require("../../utils/midtrans");
const midtransClient = require("midtrans-client");

// Create Payment
const charge = async (req, res, next) => {
  const { orderId } = req.params;
  const { grossAmount, bankName, paymentType } = req.body;

  const order = await Order.findById(orderId).catch((err) => {
    if (err) {
      res.status(404).json({ message: "Order not found" });
    }
  });
  //   Sent payment request
  let parameter = {
    payment_type: paymentType,
    transaction_details: {
      gross_amount: grossAmount,
      order_id: `${order._id}`,
    },
    bank_transfer: {
      bank: bankName,
    },
  };
  coreApi
    .charge(parameter)
    .then(async (chargeResponse) => {
      const {
        payment_type,
        transaction_status,
        gross_amount,
        currency,
        fraud_status,
        signature_key,
        transaction_id,
      } = chargeResponse;
      let dataPayment = new Payment({
        transactionId: transaction_id,
        paymentType: payment_type,
        transactionStatus: transaction_status,
        grossAmount: gross_amount,
        currency,
        bank: parameter.bank_transfer.bank,
        fraudStatus: fraud_status,
        signatureKey: signature_key,
        order: order._id,
      });
      dataPayment.save();
      req.notificaton = chargeResponse;
      return res.status(200).json({ data: dataPayment });
    })
    .catch((e) => {
      console.log(e.message); // JSON of the API response
      res.status(500).json({ message: e.message });
    });
};

const getPayment = async (req, res, next) => {
  const { paymentId } = req.params;
  coreApi.transaction
    .status(paymentId)
    .then((response) => {
      req.notification = response;
      return res.status(200).json(response);
    })
    .catch(() => res.status(404).json({ message: "Payment not found" }));
};

module.exports = { charge, getPayment };
