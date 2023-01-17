const getPaymentsFromDatabase = require("../app/payment/model");
const Payment = require("../app/payment/model");
const { coreApi } = require("../utils/midtrans");

async function syncPaymentData() {
  // Get data from database
  const payments = await getPaymentsFromDatabase.find();

  //   Loop each payment data
  payments.forEach(async (payment) => {
    const transactionId = payment.transactionId;
    const statusDb = payment.transactionStatus;

    try {
      // sync payment to midtrans
      coreApi.transaction.status(transactionId).then(async (response) => {
        // Data for push to database
        let paymentData = {
          transactionStatus: response.transaction_status,
          grossAmount: response.gross_amount,
          bank: response.va_numbers.bank,
          fraudStatus: response.fraud_status,
          signatureKey: response.signature_key,
        };
        // if midtrans data and db not match so update data
        if (response.transaction_status !== statusDb) {
          await Payment.findOneAndUpdate(
            { transactionId: transactionId },
            paymentData,
            {
              runValidators: true,
              new: true,
            }
          );
          console.log("Success All syncing payment ");
        }
      });
    } catch (error) {
      console.log(`Error syncing payment ${orderId}: ${error.message}`);
    }
  });
}

module.exports = { syncPaymentData };
