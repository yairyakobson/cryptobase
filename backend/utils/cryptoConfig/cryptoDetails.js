import axios from "axios";

export const fetchCryptoDetails = async(id) =>{
  try{
    const response = await axios.get(`${process.env.COINMARKETCAP_V2_API_URL}/info`, {
      params: { id },
      headers: {
        "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY
      }
    });
    return response.data;
  }
  catch(error){
    console.error("Error fetching crypto details:", error.response ? error.response.data : error.message);
    throw new Error(error.response ? JSON.stringify(error.response.data) : error.message);
  }
};