import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import Dashboard from "./components/Dashboard";
import CryptoDetails from "./components/CryptoDetails";
import AddCrypto from "./components/AddCrypto";
import Header from "./components/Header";
import CustomCryptoDetails from "./components/CustomCryptoDetails";

function App(){
  return(
    <>
      <Router>
        <Header/>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/crypto/:id" element={<CryptoDetails/>}/>
            <Route path="/custom-crypto/:id" element={<CustomCryptoDetails/>}/>
            <Route path="/add-crypto" element={<AddCrypto/>}/>
          </Routes>
        </div>
      </Router>
      <Toaster richColors position="top-right"/>
    </>
  );
}

export default App;