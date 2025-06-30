const express = require("express");
const app = express();

// 🔹 Import Routes
const authRoutes = require("../users/auth-routes");
const policyRoutes = require("../users/policy-routes");
const profileRoutes = require("../users/profile-routes");
const openaiRoutes = require("../users/openai-routes");

// 🔹 Import Middlewares
const userAuthentication = require("../../middlewares/user-authentication-middleware");
const sessionAuthorization = require("../../middlewares/session-verification-middleware");
const accountStatus = require("../../middlewares/account-status-middleware");

// 🔹 Apply Global Middlewares
const middlewares = [userAuthentication, sessionAuthorization, accountStatus];

// 🔹 Register Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/policies", middlewares, policyRoutes);
app.use("/api/v1/profiles", middlewares, profileRoutes);
app.use("/api/v1/openai", middlewares, openaiRoutes);
module.exports = app;
