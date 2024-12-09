import "./App.css";
import NavBar from "./components/Navbar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ChatForum from "./Pages/ChatForum";
import Orders from "./Pages/Orders";
import LoginSignup from "./Pages/LoginSignup";
import ReceivedOrders from "./Pages/ReceivedOrders";
import InprocessOrders from "./Pages/InprocessOrders";
import ShippedOrders from "./Pages/ShippedOrders";
import DeliveredOrders from "./Pages/DeliveredOrders";
import OrderDetails from "./components/OrderDetails/OrderDetails";
import ProfilePage from "./Pages/Profile";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatForum" element={<ChatForum />} />
          <Route path="/allorders" element={<Orders />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/receivedorders" element={<ReceivedOrders />} />
          <Route path="/inprocessorders" element={<InprocessOrders />} />
          <Route path="/shippedorders" element={<ShippedOrders />} />
          <Route path="/deliveredorders" element={<DeliveredOrders />} />
          <Route path="/order/:orderId" element={<OrderDetails />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
