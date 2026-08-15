import express from "express";
import cors from "cors";
import helmet from "helmet";
import deliveryRoutes from "./routes/delivery.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/deliveries", deliveryRoutes);

app.use(errorHandler);

export default app;
