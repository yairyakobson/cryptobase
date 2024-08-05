import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./connection.js";
import cryptoRoutes from "./routes/cryptoRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";

const app = express();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({
  limit: "10mb",
  verify: (req, res, buf) =>{
    req.rawBody = buf.toString();
  }
}));
app.use(cors({ origin: "http://51.17.112.249:3000" }));

app.use("/api/v1/crypto", cryptoRoutes);
app.use("/api/v1/watchlist", watchlistRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../frontend/build")));

// The catch-all handler for other routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

app.listen(process.env.PORT, () =>{
  console.log(
    `Server connected to port ${process.env.PORT}`
  );
});