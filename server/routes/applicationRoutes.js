const express = require("express");
const {
    getAllApplications,
    createApplication
} = require("../controllers/applicationController.js");

const router = express.Router();

router.get("/", getAllApplications);
router.post("/", createApplication);

module.exports = router;
