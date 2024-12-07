import './App.css';
import NavBar from './components/Navbar/NavBar';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home';
import HomeCategory from './Pages/HomeCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './components/Footer/Footer'

function App() {
  return (
   <div>
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path = '/' element = {<Home/>} />
        <Route path = '/mens' element = {<HomeCategory category ="Mens"/>} />
        <Route path = '/kids' element = {<HomeCategory category ="Kids"/>} />
        <Route path = '/product' element= {<Product/>}>
          <Route path=':productId' element={<Product/>}></Route>
        </Route>
        <Route path = '/cart' element = {<Cart/>} />
        <Route path = '/login' element = {<LoginSignup/>} />


      </Routes>
      <Footer/>

    </BrowserRouter>
   </div>
  );
}

export default App;
