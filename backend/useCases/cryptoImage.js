import mime from "mime-types";

import { upload_file } from "../utils/aws.js";

export const createCryptoUC = async(data) =>{
  const { logo, symbol } = data;
  let logoData = null;

  if(logo){
    const base64Pattern = /^data:(image\/\w+);base64,/;
    const match = base64Pattern.exec(logo);

    if(match){
      const mimeType = match[1];
      const buffer = Buffer.from(logo.split(",")[1], "base64");
      const extension = mime.extension(mimeType);
      const logoName = `${symbol}.${extension}`;

      const logoUploadResult = await upload_file({
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
  }
  return logoData;
};