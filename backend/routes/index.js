import express from "express";

import cryptoRoutes from "./cryptoRoutes.js";
import customCryptoRoutes from "./customCryptoRoutes.js";

const router = express.Router();

router.use("/crypto", cryptoRoutes);
router.use("/customcrypto", customCryptoRoutes);

export default router;