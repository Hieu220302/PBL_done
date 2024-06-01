const express = require("express");

const router = express.Router();

const orderServiceController = require("../controllers/orderService.controller");

router.post("/postOrder", orderServiceController.postOrder);
router.get("/", orderServiceController.getAll);
router.get("/idUser/:id", orderServiceController.getByIdUser);
module.exports = router;
