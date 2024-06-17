const express = require("express");

const router = express.Router();

const orderServiceController = require("../controllers/orderService.controller");

router.post("/postOrder", orderServiceController.postOrder);
router.get("/", orderServiceController.getAll);
router.get("/getAllState", orderServiceController.getAllState);
router.put("/changeStateOrder", orderServiceController.changeStateOrder);
router.put(
  "/changeCompletedOrder",
  orderServiceController.changeCompletedOrder
);
router.put("/changeOrderByStaff", orderServiceController.changeOrderByStaff);
router.put("/cancelStaff", orderServiceController.cancelStaff);
router.get("/idUser/:id", orderServiceController.getByIdUser);
router.post("/idGroupService", orderServiceController.getByIdGroupService);
router.get("/idStaff/:id", orderServiceController.getByIdStaff);
module.exports = router;
