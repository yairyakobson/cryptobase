import cors from "cors";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
// import path from "path";
// import { fileURLToPath } from "url";

import { connectDB } from "./config/connection.js"
import errorMiddleware from "./middleware/errors.js";
import router from "./routes/index.js";

const app = express();
connectDB();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100,
  message: "Reached the limit requests",
  validate: {xForwardedForHeader: false}
});
app.use(limiter);

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

app.use(express.json({
  limit: "10mb",
  verify: (req, res, buf, encoding) =>{
    if(buf.length > 10 * 1024 * 1024){
      throw new Error("Request Too Large");
    }
    req.rawBody = buf.toString(encoding);
  }
}));
app.use(cors({
  origin: process.env.FRONTEND_URL
}));

app.use(helmet());
app.use("/api/v1", router)
app.use(errorMiddleware);

// // Serve static files from the React app
// app.use(express.static(path.join(__dirname, "../frontend/build")));

// // The catch-all handler for other routes
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });

app.listen(process.env.PORT, () =>{
  console.log(
    `Server connected to port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});