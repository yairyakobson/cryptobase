import CustomCrypto from "../../models/CustomCrypto.js";
import ErrorHandler from "../../utils/errorHandler.js";

export const getCustomCryptoDetails = async(req, res, next) =>{
  const { id } = req.params;

  try{
    const customCryptoDetails = await CustomCrypto.findOne({ id: id });
    res.json(customCryptoDetails);
  }
  catch(error){
    console.error("Couldn't fetch custom cryptos details:", error);
    return next(new ErrorHandler("Fetching custom cryptos' details error", 500));
  }
};