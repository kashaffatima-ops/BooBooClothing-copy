import React from 'react'
import "./Inprocess.css";
import deliveredOrders  from '../assets/ordersData'
import Order from "../Order/Order";
const Inprocess = () => {
  const data = deliveredOrders.filter((order) => order.orderStatus === "in process");

  // const [alldelivered.setAllDelivered] =useState([]);
  // const fetchInfor=async ()=>{
  //   await fetch('http://localhost:').then((res)=>res.json()).then((data)=>{setAllDelivered(data)});
  // }
  // useEffect(()=>{
  //   fetchInfor();
  // },[])

  return (
    <>
    <div className="delivered-order">
      <br/><br/>
      <h1>In Process Orders</h1>
      <div className="listorders-format-main">
        <p>Order ID</p>
        <p>Customer</p>
        <p>Order Date</p>
        <p>Total</p>
        <p>Items</p>
        <p>Payment</p>
        </div>

      <div className="listorder-allorders">
        <hr />
        {data.map((order, index) => {
         
          let totalItems = order.orderdProductsList.reduce(
            (acc, item) => acc + item.quantity,
            0
          );

        
          return (
            <Order key={index} order_id={order.order_id} customerName={order.customerName} orderdate={order.orderdate} total = {order.total} items = {totalItems} payment={order.payment} />
          );
        })}
      </div>
      
    </div>
    </>
  );
}

export default Inprocess;
