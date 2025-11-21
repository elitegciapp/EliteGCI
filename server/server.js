import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Render health check
app.get("/healthz", (req, res) => {
  res.json({ status: "ok" });
});

// App-specific health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "EliteGCI backend running"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

