import mongoose from "mongoose";

const CustomCryptoSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  logo: {
    public_id: {
      type: String,
      default: null
    },
    url: {
      type: String,
      default: null
    },
    signed_url: {
      type: String,
      default: null
    }
  },
  symbol: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  }
});

export default mongoose.model("CustomCryptos", CustomCryptoSchema);