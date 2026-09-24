import express from "express";
import servicesRoutes from "./servicesRoutes";
import dotenv from "dotenv";
import authRoutes from "./authRoute";
import cors from "cors";
dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use("/api/services", servicesRoutes);
app.use("/api/auth", authRoutes);
app.listen(PORT, () => {
  console.log(`PulseDesk API running on http://localhost:${PORT}`);
});
