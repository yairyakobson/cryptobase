import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { deleteCustomCryptos, fetchCustomCryptos } from "../redux/features/watchlistSlice";
import cryptoicon from "../assets/cryptoicon.png"
import { toast } from "sonner";

const CustomCryptos = () =>{
  const dispatch = useDispatch();
  const customCryptos = useSelector((state) => state.watchlist.customCryptos);
  const customStatus = useSelector((state) => state.watchlist.status);

  useEffect(() =>{
    if(customStatus === "idle"){
      dispatch(fetchCustomCryptos());
    }
  }, [customStatus, dispatch]);

  if(customStatus === "loading"){
    return <p>Loading...</p>;
  }

  if(!customCryptos){
    return <p>Cryptocurrency not found</p>;
  }

  const handleDeleteCryptos = (id) =>{
    const numericId = Number(id);

    if(isNaN(numericId)){
      toast.error("Invalid ID format");
      return;
    }

    dispatch(deleteCustomCryptos(id)).unwrap()
    .then(() =>{
      toast.success("Cryptocurrency deleted successfully!", {
        duration: 2000
      });
    })
    .catch((error) =>{
      toast.error(`Failed to delete cryptocurrency: ${error.response ? error.response.data.error : error.message}`);
    });
  };

  return(
    <section className="container mx-auto grid">
      <section className="grid grid-cols-4
      sm:grid-cols-1
      md:grid-cols-2
      lg:grid-cols-3 lg:gap-4">
        {customCryptos.map((crypto) => (
          <section key={crypto.id} className="relative mb-4 p-4 border rounded-lg shadow-lg group">
            <Link to={`/custom-crypto/${crypto.id}`} className="block">
            {crypto.logo && crypto.logo.url ? (
                <img
                  src={crypto.logo.url}
                  alt={crypto.name}
                  className="w-10 h-10 object-cover rounded-full"
                  onError={(e) => { e.target.src = cryptoicon }} // Fallback image
                />
              ) : (
                <img
                  src={cryptoicon}
                  alt="Default Crypto Icon"
                  className="w-10 h-10 object-cover"
                />
              )}
              <h2 className="text-xl font-semibold">{crypto.name}</h2>
              <p>{crypto.symbol}</p>
              </Link>
            <button className="absolute right-2 top-6 hidden group-hover:block
            text-white px-4 py-2 rounded btn btn-sm btn-error
            sm:top-8
            md:top-7"
            onClick={() => handleDeleteCryptos(crypto.id)}>Delete
            </button>
          </section>
        ))}
      </section>
    </section>
  );
};

export default CustomCryptos;