const express = require("express");
const router = express.Router();
const asyncHandler = require("../utils/asyncHandler");
const loansController = require("../controllers/loans.controller");
const id = require("../middlewares/id");

router.get("/" ,asyncHandler(loansController.getAll) )
router.get("/:id" ,[id] ,asyncHandler(loansController.getone) )
router.post("/" ,asyncHandler(loansController.add) )
router.put("/:id" ,[id] ,asyncHandler(loansController.update) )
// router.delete("/:id" ,[id] ,asyncHandler(materialController.deleteM) ) بذكر قلتلنا لا نحذف سجل الاعارة ممكن نستفاد منو

module.exports = router;