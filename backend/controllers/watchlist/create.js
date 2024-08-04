import mime from "mime-types";

import Watchlist from "../../models/Watchlist.js";
import { upload_file } from "../../utils/aws.js";

export const addToWatchlist = async (req, res) =>{
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
        signed_url: logoUploadResult.signed_url,
      };
    }

    const existingItem = await Watchlist.findOne({
      $or: [{ id }, { name }, { symbol }]
    });

    if(existingItem){
      return res.status(400).json({
        error: "A currency with this id, name, or symbol already exists."
      });
    }

    const newWatchlistItem = new Watchlist({
      id,
      name,
      logo: logoData,
      symbol,
      description
    });

    await newWatchlistItem.save();
    res.status(201).json(newWatchlistItem);
  }
  catch(error){
    console.error(error);  // Log the error for debugging purposes
    res.status(500).json({ error: "Error adding to watchlist" });
  }
};