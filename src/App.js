import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import List from "./components/List/index"
import Create from './pages/Create';
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
        <Route path='/List' element={<List />} />
      </Routes>
    </MainContext.Provider>
  );
}

export default App;
