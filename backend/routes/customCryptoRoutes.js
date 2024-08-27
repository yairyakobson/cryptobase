import express from "express";
const router = express.Router();

import { createCustomCrypto } from "../controllers/customCrypto/create.js";
import { getCustomCrypto } from "../controllers/customCrypto/read.js";
import { getCustomCryptoDetails } from "../controllers/customCrypto/readDetails.js";
import { deleteCustomCrypto } from "../controllers/customCrypto/delete.js";
import validateJoiSchema from "../middleware/joi.js";

router.post("/add", validateJoiSchema, createCustomCrypto);
router.get("/", getCustomCrypto);
router.get("/:id", getCustomCryptoDetails)
.delete("/:id", deleteCustomCrypto);

export default router;