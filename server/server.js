import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

// Load environment variables
dotenv.config();

// Setup Postgres connection (Neon)
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());

// Render required health endpoint
app.get("/healthz", (req, res) => {
  res.json({ status: "ok" });
});

// API health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "EliteGCI backend running"
  });
});

// Database test endpoint
app.get("/api/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      status: "ok",
      time: result.rows[0]
    });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
