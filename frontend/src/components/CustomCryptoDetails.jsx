import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchCustomCryptoDetails } from "../redux/features/watchlistSlice";
import cryptoicon from "../assets/cryptoicon.png"

const CustomCryptoDetails = () =>{
  const { id } = useParams();
  const dispatch = useDispatch();
  const { cryptoDetails, status } = useSelector((state) => state.watchlist);
  
  useEffect(() =>{
    if(id){
      dispatch(fetchCustomCryptoDetails(id));
    }
  }, [dispatch, id]);

  if(status === "loading"){
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="skeleton h-32 w-32"></div>
      </div>
    );
  }

  const logoSrc = cryptoDetails?.logo?.url || cryptoicon;

  return (
    <section className="container mx-auto p-4">
      {cryptoDetails && (
        <>
          <img
            src={logoSrc}
            alt={cryptoDetails.name || "Crypto Icon"}
            className="w-32 h-32 object-cover rounded-full"
            onError={(e) => { e.target.src = cryptoicon; }}/>
          <h1 className="text-2xl font-bold mb-4">Name: {cryptoDetails.name}</h1>
          <p>Symbol: {cryptoDetails.symbol}</p>
          <p>Description: {cryptoDetails.description}</p>
        </>
      )}
    </section>
  );
}

export default CustomCryptoDetails;