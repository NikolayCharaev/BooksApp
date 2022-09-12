import Header from './components/Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FullCart from './components/FullCart';

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Header/>}/> 
            <Route path='/cart/:id' element={<FullCart/>}/> 
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
