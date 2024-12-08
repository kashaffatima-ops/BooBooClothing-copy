import './App.css';
import NavBar from './components/Navbar/NavBar';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home';
import HomeCategory from './Pages/HomeCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './components/Footer/Footer'
import Checkout from './Pages/Checkout';
import Profile from './Pages/Profile';


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
        <Route path = '/checkout' element = {<Checkout/>} />
        <Route path = '/profile' element = {<Profile/>} />




      </Routes>
      <Footer/>

    </BrowserRouter>
   </div>
  );
}

export default App;
