const express = require("express");
const router = express.Router();
const controller = require("../../controllers/users/profile-controller");



router.get("/report", (req, res) => controller.generateUserReport(req, res));
// POST /profile/create - Create profile (for both user and business)
router.post("/", (req, res) => controller.createProfile(req, res));

// GET /profile - Get current user profile
router.get("/", (req, res) => controller.getMyProfile(req, res));

// PUT /profile - Update profile (for both user and business)
router.put("/", (req, res) => controller.updateProfile(req, res));

// DELETE /profile - Delete account
router.delete("/", (req, res) => controller.deleteAccount(req, res));

// POST /profile/logout - Logout
router.post("/logout", (req, res) => controller.logout(req, res));

module.exports = router;
