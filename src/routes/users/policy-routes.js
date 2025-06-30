const express = require("express");
const router = express.Router();
const policyController = require("../../controllers/users/policy-controller");

// Create or Update Policy (Terms & Conditions or Privacy Policy)
router.post("/", policyController.createOrUpdatePolicy);

// Get a specific policy by title (e.g., /api/policy/Privacy%20Policy)
router.get("/:title", policyController.getPolicy);

// Get all policies
router.get("/", policyController.getAllPolicies);

// Delete policy by title
router.delete("/:title", policyController.deletePolicy);

module.exports = router;
