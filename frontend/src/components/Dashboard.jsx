import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { fetchCryptos } from "../redux/features/cryptoSlice";
import CustomCryptos from "./CustomCryptos";

const Dashboard = () =>{
  const dispatch = useDispatch();
  const cryptos = useSelector((state) => state.crypto.cryptos);
  const status = useSelector((state) => state.crypto.status);

  useEffect(() => {
    if(status === "idle"){
      dispatch(fetchCryptos());
    }
  }, [status, dispatch]);

  return(
    <section className="container mx-auto p-4 grid">
      <h1 className="pl-1 text-3xl font-semibold my-2">Watchlist</h1>
      <CustomCryptos/>
      <section className="grid grid-cols-4 mt-12
      sm:grid-cols-1
      md:grid-cols-2
      lg:grid-cols-3 lg:gap-4">
        {cryptos.map((crypto) =>(
          <Link to={`/crypto/${crypto.id}`} key={crypto.id} className="block p-4 border rounded-lg shadow-lg">
            <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`} alt={`${crypto.name} logo`} className="w-10 h-10 mb-2"/>
            <h2 className="text-xl font-semibold">{crypto.name}</h2>
            <p>Price: ${crypto.quote.USD.price.toFixed(2)}</p>
          </Link>
        ))}
      </section>
    </section>
  );
}

export default Dashboard;