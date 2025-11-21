import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "EliteGCI backend running" });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend running");
});
