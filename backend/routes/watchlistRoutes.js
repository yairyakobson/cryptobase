import express from "express";
const router = express.Router();

import { addToWatchlist } from "../controllers/watchlist/create.js";
import { getWatchlist, getWatchlistDetails } from "../controllers/watchlist/read.js";
import { removeFromWatchlist } from "../controllers/watchlist/delete.js";

router.post("/add", addToWatchlist);
router.get("/", getWatchlist);
router.get("/:id", getWatchlistDetails);
router.delete("/:id", removeFromWatchlist);

export default router;