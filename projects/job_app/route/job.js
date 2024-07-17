const express = require("express");
const jobController = require("../controller/job")
const router = express.Router();

router.post("/api/jobs", jobController.createJob); //Job Posting

router.get("/api/jobs", jobController.listJob); // Job Retrieval

router.put("/api/jobs/:id", jobController.updateJob); // Job Update

router.delete("/api/jobs/:id", jobController.deleteJob); // Job Delete

module.exports = router;