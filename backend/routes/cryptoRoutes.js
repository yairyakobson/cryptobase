import express from "express";
const router = express.Router();

import { getCryptoDetails } from "../controllers/crypto/readCryptoDetails.js";
import { getCryptoRates } from "../controllers/crypto/readCryptoRates.js";

router.get("/rates", getCryptoRates);
router.get("/details/:id", getCryptoDetails);

export default router;