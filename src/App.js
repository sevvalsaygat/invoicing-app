import { Routes, Route } from 'react-router-dom';
import List from "./components/List/index"
import Form from "./components/Form/index"
import "react-datepicker/dist/react-datepicker.css";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Form />} />
      <Route path='/list' element={<List />} />
    </Routes>
  );
}

export default App;
