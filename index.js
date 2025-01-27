import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import { allowedOrigins } from "./config/allowedOrigins.js";
import userRouter from "./api/userRoutes.js";
import newsRouter from "./api/newsRoutes.js";


dotenv.config();
connectDb().catch(console.dir);

const app = express();

// Configure CORS options
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));
app.use(express.json());

// Base health check route
app.get("/", (req, res) => {
  res.send(`Health check: Server running on port ${PORT}... 🚀`);

});



// Route imports
app.use("/api", userRouter);
app.use("/api", newsRouter);
// app.use("/api", studentRouter);


// Server configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.warn(`Server is up and running on port 🚀: ${PORT}`);
});

export default app;
