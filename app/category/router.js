const router = require("express").Router();
const { verifyUser } = require("../../middleware");
const categoryController = require("./controller");

router.post("/categories", verifyUser, categoryController.store);
router.get("/categories", categoryController.index);
router.put("/categories/:id", verifyUser, categoryController.update);
router.delete("/categories/:id", verifyUser, categoryController.destroy);

module.exports = router;
