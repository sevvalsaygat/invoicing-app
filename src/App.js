import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import List from "./components/List/index"
import Home from './pages/Home';

function App() {
  const [invoices, setInvoices] = useState([])

  return (
    <Routes>
      <Route path='/' element={<Home invoices={invoices} setInvoices={setInvoices} />} />
      <Route path='/list' element={<List invoices={invoices} />} />
    </Routes>
  );
}

export default App;
