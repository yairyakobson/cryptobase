import mime from "mime-types";

import { upload_file } from "../../utils/aws.js";
import ErrorHandler from "../../utils/errorHandler.js";
import CustomCrypto from "../../models/CustomCrypto.js";

export const createCustomCrypto = async (req, res, next) =>{
  try{
    const { id, name, logo, symbol, description } = req.body;
    
    let logoData = null;
    let logoUploadResult = null;

    if(logo){
      const base64Pattern = /^data:(image\/\w+);base64,/;
      const match = base64Pattern.exec(logo);

      const mimeType = match[1];
      const buffer = Buffer.from(logo.split(",")[1], "base64");
      const extension = mime.extension(mimeType);
      const logoName = `${symbol}.${extension}`;

      logoUploadResult = await upload_file({
        buffer,
        name: logoName,
        mimeType: mimeType,
      }, "Logos");

      logoData = {
        public_id: logoUploadResult.public_id,
        url: logoUploadResult.url,
        signed_url: logoUploadResult.signed_url
      };
    }

    const existingItem = await CustomCrypto.findOne({
      $or: [{ id }, { name }, { symbol }]
    });

    if(existingItem){
      return next(new ErrorHandler(
        "A currency with this id, name, or symbol already exists.", 400
      ));
    }

    const newCustomCrypto = new CustomCrypto({
      id,
      name,
      logo: logoData,
      symbol,
      description
    });

    await newCustomCrypto.save();
    res.status(201).json(newCustomCrypto);
  }
  catch(error){
    console.error(error);
    return next(new ErrorHandler("Error adding new custom crypto", 500));
  }
};