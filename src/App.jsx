import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";

function App() {
  return (
     <div className='app-container'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
         <Route path='/aboutus' element={<AboutUs />} />
      </Routes>
    </div>
    
  );
}

export default App;
