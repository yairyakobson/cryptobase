import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { fetchCustomCryptos, createCustomCryptos } from "../redux/features/watchlistSlice";

const AddCrypto = () =>{
  const [cryptoData, setCryptoData] = useState({
    id: "",
    name: "",
    logo: "",
    symbol: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);
  const { id, name, symbol, description, logo } = cryptoData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async(e) =>{
    setLoading(true);
    const loadingToastId = toast.loading("Loading...");

    e.preventDefault();
    try{
      const payload = {
        id,
        name,
        symbol,
        description,
        ...(logo && { logo }),  // Include logo only if it exists
      };
      await dispatch(createCustomCryptos(payload)).unwrap();
      dispatch(fetchCustomCryptos());

      toast.success("Cryptocurrency added successfully!", {
        duration: 2000
      });
      navigate("/");
    }
    catch(error){
      const errorMessage = error.response?.data?.error;
      toast.error(`${errorMessage}`);
    }
    finally{
      toast.dismiss(loadingToastId);
      setLoading(false);
    }
  };

  const handleInputChange = (e) =>{
    const { name, value } = e.target;
    setCryptoData(prevData =>({
      ...prevData,
      [name]: value
    }));
  };

  const handleIdChange = (e) =>{
    const { value } = e.target;
    // Allow only numeric values
    if (/^\d*$/.test(value)){
      setCryptoData(prevData =>({
        ...prevData,
        id: value
      }));
    }
  };

  const handleSymbolChange = (e) =>{
    const { value } = e.target;
    // Convert input to uppercase
    setCryptoData(prevData => ({
      ...prevData,
      symbol: value.toUpperCase()
    }));
  };

  const validateImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onload = () => {
      if (reader.readyState === 2) {
        setCryptoData((prevData) => ({
          ...prevData,
          logo: reader.result,
        }));
      }
    };
  
    if(file){
      reader.readAsDataURL(file);
    }
  };

  return(
    <form onSubmit={handleSubmit} className="flex items-center justify-center h-[50rem]">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg space-y-6">
      <h1 className="mt-4 text-center text-2xl font-bold text-gray-900">Add New Cryptocurrency</h1>
      
      <section className="mb-4">
        <label className="block mb-2">ID</label>
        <input className="w-full p-2 border rounded-lg"
        type="number"
        name="id"
        value={id}
        onChange={handleIdChange}
        required/>
      </section>

      <section className="mb-4">
        <label className="block mb-2">Name</label>
        <input className="w-full p-2 border rounded-lg"
        type="text"
        name="name"
        value={name}
        onChange={handleInputChange}
        required/>
      </section>
      
      <section className="mb-4">
        <label className="block mb-2">Symbol</label>
        <input className="w-full p-2 border rounded-lg"
        type="text"
        name="symbol"
        value={symbol}
        onChange={handleSymbolChange}
        required/>
      </section>

      <section className="mb-4">
        <label className="block mb-2">Description</label>
        <textarea className="w-full p-2 border rounded-lg"
        rows="2"
        type="text"
        name="description"
        value={description}
        onChange={handleInputChange}
        required/>
      </section>

      <section>
        <label className="block mb-2">Logo</label>
        <input type="file" className="file-input-small file-input-bordered w-full max-w-xs"
        onChange={validateImage}/>
      </section>

      <button type="submit" className={`p-2 bg-blue-500 text-white rounded-lg ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>Add Cryptocurrency</button> 
      </div>
    </form>
  );
};

export default AddCrypto;