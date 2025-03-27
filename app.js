require("dotenv").config(); // Load environment variables from .env

const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./database/dabase"); // Import the database connection function
const http = require("http"); // HTTP module to create server
const path = require("path");

// Initialize Express app
const app = express();

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // to access public files

// 3. Create an HTTP server using Express
const server = http.createServer(app);

// Connect to MongoDB
(async () => {
  try {
    await connectDB();
  } catch (err) {
    console.error("Failed to initialize database connection:", err.message);
    process.exit(1);
  }
})();

// Serve the client HTML file
app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "index.html"));
});

// Middleware: Parse incoming JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const authenticationRoutes = require("./src/routes/auth-signup-login-routes");
app.use("/api/auth", authenticationRoutes);

const PORT = process.env.PORT || 3000; // Use PORT from .env or default to 3000
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
