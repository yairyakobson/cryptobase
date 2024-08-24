import { delete_file } from "../../utils/aws.js";
import CustomCrypto from "../../models/CustomCrypto.js";
import ErrorHandler from "../../utils/errorHandler.js";

export const deleteCustomCrypto = async(req, res, next) =>{
  const { id } = req.params;

  const numericId = parseInt(id, 10);
  if(isNaN(numericId)){
    console.error(`Invalid ID format: ${id}`);  // Log invalid ID format
    return next(new ErrorHandler("Invalid ID format", 400));
  }
  
  try{
    const result = await CustomCrypto.findOneAndDelete({ id: numericId });
    if(result?.logo?.public_id){
      await delete_file(result?.logo?.public_id);
    }
    if(result){
      res.json({ message: "Removed from custom cryptos list", id: result.id });
    }
    else{
      return next(new ErrorHandler("Custom crypto not found", 404));
    }
  }
  catch(error){
    console.error(error);
    return next(new ErrorHandler("Error removing from custom cryptos list", 500));
  }
};