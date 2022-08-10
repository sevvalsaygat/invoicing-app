import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import List from "./components/List/index"
import Home from './pages/Home';
// import i18next from 'i18next';
// import{ initReactI18next } from "react-i18next"

// const translationEn = {}
// const translationTr = {}

// i18n
//   .use(initReactI18next)
//   .init(options{
//     resources: {
//       en: { translation: translationEn },
//       tr: { translation: translationTr},
//     },
//     lng:"en",
//     fallbackLng:"en",
//     interpolation: { escapeValue: false}
//   });
 

function App() {
  const [invoices, setInvoices] = useState([])

  // const [count, setCount] = useState()

  // const onChange = (e) => {
  //   setCount((previousCount) => previousCount)
  // }

  return (
    // <div>
    //   <select name='language' onChange={onChange}>
    //   <option value="en">English</option>
    //   <option value="tr">Turkish</option>
    // </select>
    <Routes>
      <Route path='/' element={<Home invoices={invoices} setInvoices={setInvoices} />} />
      <Route path='/list' element={<List invoices={invoices} />} />
    </Routes>
    // </div>
  );
 
}

export default App;
