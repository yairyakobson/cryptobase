import Watchlist from "../../models/Watchlist.js";

export const getWatchlist = async(req, res) =>{
  try{
    const watchlist = await Watchlist.find({});
    res.json(watchlist);
  }
  catch(error){
    res.status(500).json({ error: "Error fetching watchlist details" });
  }
};

export const getWatchlistDetails = async(req, res) =>{
  const { id } = req.params;

  try{
    const watchlistDetails = await Watchlist.findOne({ id: id });
    res.json(watchlistDetails);
  }
  catch(error){
    console.error("Error fetching watchlist details:", error);
    res.status(500).json({ error: "Error fetching watchlist details" });
  }
};