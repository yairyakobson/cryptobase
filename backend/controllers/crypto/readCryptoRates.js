import { fetchCryptoRates } from "../../utils/cryptoConfig/cryptoRates.js";

import ErrorHandler from "../../utils/errorHandler.js";

export const getCryptoRates = async(req, res, next) =>{
  try{
    const data = await fetchCryptoRates();
    res.json(data);
  }
  catch(error){
    return next(new ErrorHandler(error.message, 500));
  }
};