const router = require("express").Router();
const { police_check, verifyUser } = require("../../middleware");
const orderController = require("./controller");

router.post("/orders", verifyUser, orderController.store);

router.get("/orders", verifyUser, orderController.index);

module.exports = router;
