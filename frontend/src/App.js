import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import Header from "./components/Header";
import Homepage from "./pages/Homepage"
import useCryptoRoutes from "./hooks/useCryptoRoutes";

function App(){
  const cryptoRoutes = useCryptoRoutes();
  return(
    <>
      <Router>
        <Header/>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<Homepage/>}/>
            {cryptoRoutes}
          </Routes>
        </div>
      </Router>
      <Toaster richColors position="top-right"/>
    </>
  );
}

export default App;