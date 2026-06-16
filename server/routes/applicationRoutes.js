const express = require("express");
const {
    getAllApplications,
    getApplicationById,
    createApplication
} = require("../controllers/applicationController.js");

const router = express.Router();

router.get("/", getAllApplications);
router.get("/:id", getApplicationById);
router.post("/", createApplication);

module.exports = router;
