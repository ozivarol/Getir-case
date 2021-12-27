const RecordController = require("../controller/recordController");
const express = require("express");
const reqChecker = require("../middlewares/reqChecker");

const router = express.Router();

//Endpoint is defined and route is created. Required validate parameters are given here.
router.route("/filter").post(reqChecker.checkParams,reqChecker.checkDataType,reqChecker.checkDate,reqChecker.checkNumber,RecordController.filter);

//The router is exported.
module.exports = router;
