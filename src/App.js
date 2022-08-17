import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import List from "./pages/List";
import Create from './pages/Create';
import Details from './pages/Details';
import { MainContext } from './context'

function App() {
  const [invoices, setInvoices] = useState([])

  const data = {
    invoices,
    setInvoices
  }

  return (
    <MainContext.Provider value={data}>
      <Routes>
        <Route path='/' element={<Create />} />
        <Route path='/list' element={<List />} />
        <Route path='/details/:id' element={<Details />} />
      </Routes>
    </MainContext.Provider>
  );
}

export default App;
