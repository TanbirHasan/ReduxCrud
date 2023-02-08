import { Route, Router, Routes } from "react-router-dom";
import Balance from "./components/Balance";
import Form from "./components/Form";
import Layout from "./components/Layout";
import Transaction from "./components/Transactions/Transaction";
import Transactions from "./components/Transactions/Transactions";
import AllTransaction from "./pages/AllTransaction";
import Home from "./pages/Home";
function App() {
  return (
    <div className="App">
  
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/transactions" element={<AllTransaction/>} />
        </Routes>
    
     
    </div>
  );
}

export default App;
