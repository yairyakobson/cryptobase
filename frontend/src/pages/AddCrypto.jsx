import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  useCreateCustomCryptosMutation,
  useFetchCustomCryptosMutation
} from "../redux/service/customcryptoService";
import CryptoForm from "../components/CryptoForm";

const AddCrypto = () =>{
  const cryptoDataRef = useRef({
    id: "",
    name: "",
    logo: "",
    symbol: "",
    description: "",
  });
  const navigate = useNavigate();

  const [createCustomCryptos] = useCreateCustomCryptosMutation();
  const [fetchCustomCryptos, { isLoading }] = useFetchCustomCryptosMutation();

  const handleSubmit = async(e) =>{
    e.preventDefault();

    const loadingMessage = toast.loading("Creating...");

    try{
      const { id, name, symbol, description, logo } = cryptoDataRef.current;
      const payload = {
        id,
        name,
        symbol,
        description,
        ...(logo && { logo }) // Shows logo if exists
      };
      await createCustomCryptos(payload).unwrap();

      toast.dismiss(loadingMessage);
      toast.success("Cryptocurrency added successfully!", {
        duration: 500
      });
      fetchCustomCryptos();
      navigate("/");
    }
    catch(error){
      const errorMessage = error?.data?.message || "An error occurred";
      toast.error(errorMessage);
    }
    toast.dismiss();
  };

  const handleIdChange = (e) =>{
    const { value } = e.target;
    // Allow only numeric values
    if(/^\d*$/.test(value)){
      cryptoDataRef.current.id = value;
    }
  };

  const handleInputChange = (e) =>{
    const { name, value } = e.target;
    cryptoDataRef.current[name] = value;
  };

  const handleSymbolChange = (e) =>{
    const { value } = e.target;
    // Convert input to uppercase
    cryptoDataRef.current.symbol = value.toUpperCase();
  };

  const validateImage = (e) =>{
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () =>{
      if(reader.readyState === 2){
        cryptoDataRef.current.logo = reader.result;
      }
    };

    if(file){
      reader.readAsDataURL(file);
    }
  };

  return(
    <form onSubmit={handleSubmit}
    className="flex items-center justify-center h-[50rem]">
      <section className="w-full max-w-md p-6
      bg-white shadow-md rounded-lg space-y-6">

        <h1 className="mt-4 text-center text-2xl
        font-bold text-gray-900">Add New Cryptocurrency</h1>
        
        <CryptoForm
        handleIdChange={handleIdChange}
        handleInputChange={handleInputChange}
        handleSymbolChange={handleSymbolChange}
        validateImage={validateImage}/>

        <button type="submit"
        className={`p-2 bg-blue-500 text-white rounded-lg
        ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}>Add Cryptocurrency
        </button> 
      </section>
    </form>
  );
};

export default AddCrypto;