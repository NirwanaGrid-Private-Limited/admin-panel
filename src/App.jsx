
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <div className='min-h-screen bg-white text-slate-900'>
     
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product' element={<Product />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
     
    </div>
  );
}

export default App;
