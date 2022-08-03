import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<div>Home</div>} />
      <Route path='/list' element={<div>List</div>} />
    </Routes>
  );
}

export default App;
