import express from "express";
const router = express.Router();

import { getRates, getDetails } from "../controllers/crypto/readCrypto.js";

router.get("/rates", getRates);
router.get("/details/:id", getDetails);

export default router;