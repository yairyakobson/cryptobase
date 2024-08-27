import { createCryptoUC } from "../../useCases/cryptoImage.js";
import {
  createCrypto,
  findCrypto
} from "../../dataAccess/cryptoCases.js";
import ErrorHandler from "../../utils/errorHandler.js";

export const createCustomCrypto = async(req, res, next) =>{
  try{
    const { id, name, logo, symbol, description } = req.body;

    const logoData = await createCryptoUC({ logo, symbol });

    const existingItem = await findCrypto({
      $or: [{ id }, { name }, { symbol }]
    });

    if(existingItem){
      return next(new ErrorHandler(
        "A currency with this id, name, or symbol already exists.", 400
      ));
    }

    const newCustomCrypto = await createCrypto({
      id,
      name,
      logo: logoData || null,
      symbol,
      description
    });
    await newCustomCrypto.save();
    res.status(200).json(newCustomCrypto);
  }
  catch(error){
    console.error(error);
    return next(new ErrorHandler("Error adding new custom crypto", 500));
  }
};