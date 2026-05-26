const express = require("express");
const router = express.Router();
const asyncHandler = require("../utils/asyncHandler");
const reviewController = require("../controllers/review.controller");
const id = require("../middlewares/id");

router.get("/", asyncHandler(reviewController.getAll));
router.get("/:id", [id], asyncHandler(reviewController.getone));
router.post("/", asyncHandler(reviewController.add));
router.delete("/:id",[id] , asyncHandler(reviewController.delete));

module.exports = router;
