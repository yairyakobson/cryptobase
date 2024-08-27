import { readCryptos } from "../../dataAccess/cryptoCases.js";
import ErrorHandler from "../../utils/errorHandler.js";

export const getCustomCrypto = async(req, res, next) =>{
  try{
    const customCrypto = await readCryptos();
    res.json(customCrypto);
  }
  catch(error){
    return next(new ErrorHandler("Fetching custom cryptos error", 500));
  }
};