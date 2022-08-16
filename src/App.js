import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import List from "./components/List/index"
import Create from './pages/Create';

function App() {
  const [invoices, setInvoices] = useState([])

  return (
    <Routes>
      <Route path='/' element={<Create invoices={invoices} setInvoices={setInvoices} />} />
      <Route path='/list' element={<List invoices={invoices} />} />
    </Routes>
  );
}

export default App;
