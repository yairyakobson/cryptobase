import { Route } from "react-router-dom";

import AddCrypto from "../pages/AddCrypto";
import CryptoDetails from "../pages/CryptoDetails";
import CustomCryptoDetails from "../pages/CustomCryptoDetails";

const useCryptoRoutes = () =>{
  return(
    <>
      <Route path="/add-crypto" element={<AddCrypto/>}/>
      <Route path="/crypto/:id" element={<CryptoDetails/>}/>
      <Route path="/custom-crypto/:id" element={<CustomCryptoDetails/>}/>
    </>
  )
}

export default useCryptoRoutes;