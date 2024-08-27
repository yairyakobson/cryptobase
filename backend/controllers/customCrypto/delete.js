import { deleteCrypto, findCrypto } from "../../dataAccess/cryptoCases.js";
import { delete_file } from "../../utils/aws.js";
import ErrorHandler from "../../utils/errorHandler.js";

export const deleteCustomCrypto = async(req, res, next) =>{
  const { id } = req.params;

  const numericId = parseInt(id, 10);
  if(isNaN(numericId)){
    console.error(`Invalid ID format: ${id}`);  // Log invalid ID format
    return next(new ErrorHandler("Invalid ID format", 400));
  }
  
  try{
    const result = await findCrypto({ id: numericId });

    if(!result){
      return next(new ErrorHandler("Custom crypto not found", 404));
    }

    if(result?.logo?.public_id){
      await delete_file(result?.logo?.public_id);
    }
    await deleteCrypto({ id: numericId })
    res.json({ message: "Removed from custom cryptos list", id: result.id });
  }
  catch(error){
    console.error(error);
    return next(new ErrorHandler("Error removing from custom cryptos list", 500));
  }
};