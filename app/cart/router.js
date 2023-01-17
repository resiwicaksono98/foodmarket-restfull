/** @format */

const router = require("express").Router();
const cartController = require("./controller");

router.put("/carts", cartController.update);

router.get("/carts", cartController.index);

module.exports = router;
