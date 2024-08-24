import joiCustomCryptoSchemea from "../models/JoiSchema.js";
import ErrorHandler from "../utils/errorHandler.js";

const validateJoiSchema = (req, res, next) =>{
  const { error } = joiCustomCryptoSchemea.validate(req.body);

  if(error){
    console.error("Joi validation error:", error.details[0].message);
    return next(new ErrorHandler(error.details[0].message, 400));
  }
  next();
};

export default validateJoiSchema;