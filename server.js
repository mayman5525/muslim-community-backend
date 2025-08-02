require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./utils/logger");
const initDb = require("./utils/initDB");
const winston = require("winston");

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || "*",
    credentials: true,
  })
);

// Logging middleware
app.use(
  morgan("combined", {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
const authRoutes = require("./routers/auth_router");

app.use("/api/auth", authRoutes);

// Test middleware chain
function middleware(req, res, next) {
  console.log("middleware called");
  next();
}
function standardExpressCallBck(req, res, next) {
  res.send("hello world from the standard callback");
}
function middleware2(req, res, next) {
  console.log("middleware2 called");
  next();
}

app.get("/", middleware, middleware2, standardExpressCallBck);
app.get("/test", middleware, standardExpressCallBck);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

// API routes

// 404 handler (optional)
// app.all('*', (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Route not found'
//   });
// });

// Global error handler
app.use((error, req, res, next) => {
  logger.error("Unhandled error:", error);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// Graceful shutdown
process.on("SIGTERM", () => {
  logger.info("SIGTERM received, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  logger.info("SIGINT received, shutting down gracefully");
  process.exit(0);
});

// Initialize DB and start server
(async () => {
  await initDb();
  app.listen(PORT, () => {
    logger.info(`🚀 Server running on port ${PORT}`);
  });
})();

module.exports = app;
