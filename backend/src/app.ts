import express from "express";
import cors from "cors";
import salonsRoutes from "./routes/salons.routes";
import { initializeDatabase } from "./db/database";

initializeDatabase();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Warsaw Beauty Salon Explorer API is running",
  });
});

app.use("/api/salons", salonsRoutes);

export default app;