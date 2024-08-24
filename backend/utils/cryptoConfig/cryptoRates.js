import axios from "axios";

export const fetchCryptoRates = async() =>{
  try{
    const response = await axios.get(`${process.env.COINMARKETCAP_V1_API_URL}/listings/latest`, {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY
      }
    });
    return response.data;
  }
  catch(error){
    console.error("Error fetching crypto rates:", error.response ? error.response.data : error.message);
    throw new Error(error.response ? JSON.stringify(error.response.data) : error.message);
  }
};