import express from "express";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);

app.use("*", (req, res) => {
  res.status(404).json({ success: false, error: "not found route" });
});

export default app;
