const express = require("express");
const router = express.Router();
const asyncHandler = require("../utils/asyncHandler");
const materialController = require("../controllers/material.controller");
const id = require("../middlewares/id");

router.get("/" ,asyncHandler(materialController.getAll) )
router.get("/:id" ,[id] ,asyncHandler(materialController.getone) )
router.post("/" ,asyncHandler(materialController.addM) )
router.put("/:id" ,[id] ,asyncHandler(materialController.updateM) )
router.delete("/:id" ,[id] ,asyncHandler(materialController.deleteM) )

module.exports = router;