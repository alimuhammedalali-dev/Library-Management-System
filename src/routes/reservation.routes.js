const express = require("express");
const router = express.Router();
const asyncHandler = require("../utils/asyncHandler");
const reservationController = require("../controllers/reservation.controller");
const id = require("../middlewares/id");

router.get("/", asyncHandler(reservationController.getAll));
router.get("/:id", [id], asyncHandler(reservationController.getone));
router.post("/", asyncHandler(reservationController.add));
router.delete("/:id", [id], asyncHandler(reservationController.delete));

module.exports = router;
