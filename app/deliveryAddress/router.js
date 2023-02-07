/** @format */

const router = require("express").Router();
const { verifyUser } = require("../../middleware");
const deliveryAddressController = require("./controller");

router.post("/delivery-address", verifyUser, deliveryAddressController.store);
router.get("/delivery-address", verifyUser, deliveryAddressController.index);

router.put("/delivery-address/:id", verifyUser, deliveryAddressController.update);

router.delete("/delivery-address/:id", verifyUser, deliveryAddressController.destory);

module.exports = router;
