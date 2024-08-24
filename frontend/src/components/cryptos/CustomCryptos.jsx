import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import {
  useDeleteCustomCryptosMutation,
  useFetchCustomCryptosMutation
} from "../../redux/service/customcryptoService";
import cryptoicon from "../../assets/cryptoicon.png";

const CustomCryptos = () =>{
  const [fetchCustomCryptos, { data, error, isLoading }] = useFetchCustomCryptosMutation();
  const [deleteCustomCryptos] = useDeleteCustomCryptosMutation();

  const [customCryptos, setCustomCryptos] = useState([]);

  useEffect(() => {
    const fetchData = async() =>{
      const result = await fetchCustomCryptos();
      setCustomCryptos(result.data);
    };
    
    fetchData();
  }, [fetchCustomCryptos]);

  useEffect(() =>{
    if(error){
      toast.error(error?.data?.message);
    }
  });

  useEffect(() => {
    if (data) {
      setCustomCryptos(data);
    }
  }, [data]);

  const handleDeleteCryptos = async(id) =>{
    const numericId = Number(id);

    if(isNaN(numericId)){
      toast.error("Invalid ID format");
      return;
    }

    // Optimistic update
    const updatedCryptos = customCryptos.filter(crypto => crypto.id !== numericId);
    setCustomCryptos(updatedCryptos);

    try{
      await deleteCustomCryptos(numericId).unwrap();
      toast.success("Cryptocurrency deleted successfully!", {
        duration: 1000
      });
      await fetchCustomCryptos();
    }
    catch(error){
      // Rollback the optimistic update if there's an error
      setCustomCryptos(customCryptos);
      toast.error("Failed to delete cryptocurrency");
    }
  };

  return(
    <section className="container mx-auto grid">
      <h1 className="pl-1 text-3xl font-semibold my-2">{!isLoading && "Custom Currencies"}</h1>
      <section className="grid grid-cols-4
      sm:grid-cols-1
      md:grid-cols-2
      lg:grid-cols-3 lg:gap-4">
        {customCryptos?.map((crypto) => (
          <section key={crypto.id}
          className="relative mb-4 p-4 border rounded-lg shadow-lg group">
            
            <Link to={`/custom-crypto/${crypto.id}`} className="block">
              <img
              src={crypto?.logo ? crypto?.logo?.url : cryptoicon}
              alt={crypto?.logo ? crypto?.name : "Default Crypto Icon"}
              className="w-10 h-10 object-cover rounded-full"
              onError={(e) => { e.target.src = cryptoicon }}/>
              <h2 className="text-xl font-semibold">{crypto.name}</h2>
              <p>{crypto.symbol}</p>
            </Link>

            <button
            className="absolute right-2 top-6 hidden group-hover:block
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