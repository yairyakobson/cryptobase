import { fetchCryptoDetails } from "../../utils/cryptoConfig/cryptoDetails.js";

import ErrorHandler from "../../utils/errorHandler.js";

export const getCryptoDetails = async(req, res, next) =>{
  const { id } = req.params;
  
  try{
    const data = await fetchCryptoDetails(id);
    res.json(data);
  }
  catch(error){
    return next(new ErrorHandler(error.message, 500));
  }
};