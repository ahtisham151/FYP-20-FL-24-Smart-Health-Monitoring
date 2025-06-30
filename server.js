require("dotenv").config();
const fs = require("fs");
const path = require("path");
const http = require("http");
const https = require("https");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");

const connectToDatabase = require("./src/config/mongodb");
const { handlers } = require("./src/utilities/handlers/handlers");
const userRoutes = require("./src/routes/users/index");

const app = express();
const port = process.env.PORT || 3000;
const nodeEnv = process.env.NODE_ENV || "development";
const secretKey = process.env.SECRET_KEY;
const maxAge = Number(process.env.MAX_AGE) || 2592000000;
const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : "*";

// Serve static files (if needed)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge },
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(morgan("tiny"));
app.use(cookieParser());

// Routes
app.use(userRoutes);

// Server setup
const server =
  nodeEnv === "production"
    ? (() => {
        try {
          const options = {
            key: fs.readFileSync(
              "/etc/letsencrypt/live/client1.appsstaging.com/privkey.pem"
            ),
            cert: fs.readFileSync(
              "/etc/letsencrypt/live/client1.appsstaging.com/cert.pem"
            ),
            ca: fs.readFileSync(
              "/etc/letsencrypt/live/client1.appsstaging.com/chain.pem"
            ),
          };
          return https.createServer(options, app);
        } catch (error) {
          console.error(
            "SSL certificate files are missing or incorrect:",
            error
          );
          process.exit(1);
        }
      })()
    : http.createServer(app);

// Start server
server.listen(port, () => {
  connectToDatabase();
  handlers.logger.success({
    message: `SHM interface is live at ${baseUrl}`,
  });
});
