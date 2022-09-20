import Header from './components/Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FullCart from './components/FullCart';
import CartItem from './components/CartItem';

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
          <Routes>
            <Route path='/BooksApp' element={<Header/>}/> 
            <Route path='/' element={<Header/>}/> 
            <Route path='/cart/:id' element={<FullCart/>}/> 
            <Route path='/asd' element={<CartItem/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
