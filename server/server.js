//Pacakges
import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;
// Database
import connectDB from "./config/mongoDB.js";
import { connectRedis } from "./config/redis.js";

// Routes
import categoryRoutes from "./routes/category.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.routes.js";

// Middlewares
import { authinticate } from "./middlewares/auth.middleware.js";

connectDB();
// connectRedis();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);
app.use(authinticate);
app.use("/api", categoryRoutes);
app.use("/api", customerRoutes);
app.use("/api", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
