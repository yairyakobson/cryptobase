import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { useFetchCryptosMutation } from "../../redux/service/cryptoService";
import CustomCryptos from "./CustomCryptos";

const Cryptos = () => {
  const [fetchCryptos, { data, isLoading, error }] = useFetchCryptosMutation();
  const cryptos = data ? data?.data : []

  useEffect(() =>{
    fetchCryptos();
  }, [fetchCryptos]);

  useEffect(() =>{
    if(error){
      toast.error(error?.data?.message);
    }
  }, [error]);

  return(
    <section className="container mx-auto p-4 grid relative">
      <CustomCryptos/>
      {isLoading ? (
      <section className="skeleton inset-0 flex items-center justify-center">
        <section className="h-dvh w-dvh"/>
      </section>) : (
        <section className="grid grid-cols-4 mt-12
        sm:grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3 lg:gap-4">
          {cryptos.map((crypto) =>(
            <Link to={`/crypto/${crypto.id}`} key={crypto.id}
            className="block p-4 border rounded-lg shadow-lg">
            
            <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`}
            alt={`${crypto.name} logo`}
            className="w-10 h-10 mb-2"/>
  
            <h2 className="text-xl font-semibold">{crypto.name}</h2>
            <p>Price: ${crypto.quote.USD.price.toFixed(2)}</p>
            </Link>
          ))}
        </section>
      )}
    </section>
  );
}

export default Cryptos