import { Routes, Route } from 'react-router-dom';
import List from "./components/List/index"
import Form from "./components/Form/index"
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';

function App() {
  const [invoices, setInvoices] = useState([])
  
  return (
    <Routes>
      <Route path='/' element={<Form invoices={invoices} setInvoices={setInvoices}/>} />
      <Route path='/list' element={<List setInvoices={setInvoices} invoices={invoices}/>} />
    </Routes>
  );
}

export default App;
