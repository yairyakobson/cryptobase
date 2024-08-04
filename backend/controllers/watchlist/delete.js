import { delete_file } from "../../utils/aws.js";
import Watchlist from "../../models/Watchlist.js";

export const removeFromWatchlist = async(req, res) =>{
  const { id } = req.params;

  const numericId = parseInt(id, 10);
  if(isNaN(numericId)){
    console.error(`Invalid ID format: ${id}`);  // Log invalid ID format
    return res.status(400).json({ error: "Invalid ID format" });
  }
  
  try{
    const result = await Watchlist.findOneAndDelete({ id: numericId });
    if(result?.logo?.public_id){
      await delete_file(result?.logo?.public_id);
    }
    if(result){
      res.json({ message: "Removed from watchlist", id: result.id });
    }
    else{
      res.status(404).json({ error: "Item not found" });
    }
  }
  catch(error){
    console.error(error)
    res.status(500).json({ error: "Error removing from watchlist" });
  }
};