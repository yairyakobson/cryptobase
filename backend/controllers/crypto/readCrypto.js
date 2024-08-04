import { getCurrentRates, getCryptoDetails } from "../../utils/cryptoConfig.js";

export const getRates = async(req, res) =>{
  try{
    const data = await getCurrentRates();
    res.json(data);
  }
  catch(error){
    res.status(500).json({ error: error.message });
  }
};

export const getDetails = async(req, res) =>{
  const { id } = req.params;
  
  try{
    const data = await getCryptoDetails(id);
    res.json(data);
  }
  catch(error){
    res.status(500).json({ error: error.message });
  }
};