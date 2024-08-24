import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { useFetchCustomCryptoDetailsQuery } from "../redux/service/customcryptoService";
import cryptoicon from "../assets/cryptoicon.png";

const CustomCryptoDetails = () =>{
  const { id } = useParams();

  const { data: cryptoDetails, error, isLoading } = useFetchCustomCryptoDetailsQuery(id);
  
  useEffect(() =>{
    if(error){
      toast.error(error?.data?.message || "An error occurred");
    }
    toast.dismiss();
  }, [error]);

  const logoSrc = cryptoDetails?.logo?.url || cryptoicon;

  return (
    <section className="container mx-auto p-4 relative">
      {isLoading ? (
      <section className="skeleton flex items-center justify-center">
        <section className="h-40 w-40"/>
      </section>
      ) : (
        cryptoDetails && (
          <>
            <img src={logoSrc}
            alt={cryptoDetails.name || "Crypto Icon"}
            className="w-16 h-16 object-cover rounded-full"
            onError={(e) => { e.target.src = cryptoicon; }}/>
            <h1 className="text-2xl font-bold mb-4">{cryptoDetails.name}</h1>
            <p>Symbol: {cryptoDetails.symbol}</p>
            <p>Description: {cryptoDetails.description}</p>
          </>
        )
      )}
    </section>
  );
}

export default CustomCryptoDetails;