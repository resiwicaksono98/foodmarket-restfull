const router = require("express").Router();
const { verifyUser } = require("../../middleware");
const tagContrroller = require("./controller");

router.post("/tags", verifyUser, tagContrroller.store);
router.get("/tags", tagContrroller.index);

router.put("/tags/:id", verifyUser, tagContrroller.update);

router.delete("/tags/:id", verifyUser, tagContrroller.destroy);

module.exports = router;
