import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useFetchCryptoDetailsQuery } from "../redux/service/cryptoService";
import { toast } from "sonner";

const CryptoDetails = () =>{
  const { id } = useParams();
  const { data: response, error, isLoading } = useFetchCryptoDetailsQuery(id);

  useEffect(() =>{
    if(error){
      toast.error(error?.data?.message);
    }
  }, [error]);

  const details = response?.data[id];

  return(
    <section className="container mx-auto p-4">
      {isLoading && (
        <section className="skeleton flex items-center justify-center">
          <section className="h-40 w-40"/>
        </section>
      )}
      {details?.name && (
        <>
          <img src={details?.logo} alt={details?.name} />
          <h1 className="text-2xl font-bold mb-4">{details?.name}</h1>
          <p>Symbol: {details?.symbol}</p>
          <p>Description: {details?.description}</p>
        </>
      )}
    </section>
  );
};

export default CryptoDetails;