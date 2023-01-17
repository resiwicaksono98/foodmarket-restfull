const { charge, getPayment } = require("./controller");

const router = require("express").Router();

router.post("/payment/:orderId", charge);
router.get("/payment/:paymentId", getPayment);
module.exports = router;
