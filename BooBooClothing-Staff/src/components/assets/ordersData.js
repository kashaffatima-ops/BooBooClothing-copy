import data_product from "./data";

let order_list = [
  {
    order_id: 101,
    orderdate: "2024-11-02",
    contact: "03011223344",
    customerName: "John Doe",
    email: "john.doe@gmail.com",
    address: "123 Main Street, Springfield",
    total: 3000,
    payment: "Cash on delivery",
    orderStatus: "received",
    orderdProductsList: [
      { product: (data_product.at(1)).id, quantity: 6 },
      { product: (data_product.at(2)).id, quantity: 5 },
    ],
  },
  {
    order_id: 102,
    orderdate: "2024-11-03",
    contact: "03214567890",
    customerName: "Jane Smith",
    email: "jane.smith@yahoo.com",
    address: "456 Elm Street, Riverdale",
    total: 4000,
    payment: "Cash on delivery",
    orderStatus: "delivered",
    orderdProductsList: [
      { product: (data_product.at(3)).id, quantity: 2 },
      { product: (data_product.at(4)).id, quantity: 4 },
    ],
  },
  {
    order_id: 103,
    orderdate: "2024-11-04",
    contact: "03325678901",
    customerName: "Alice Johnson",
    email: "alice.johnson@hotmail.com",
    address: "789 Oak Avenue, Brookfield",
    total: 3000,
    payment: "Cash on delivery",
    orderStatus: "shipped",
    orderdProductsList: [
      { product: (data_product.at(5)).id, quantity: 1 },
      { product: (data_product.at(6)).id, quantity: 3 },
    ],
  },
  {
    order_id: 104,
    orderdate: "2024-11-05",
    contact: "03445678901",
    customerName: "Bob Brown",
    email: "bob.brown@gmail.com",
    address: "321 Maple Drive, Pineville",
    total: 4500,
    payment: "Paid online",
    orderStatus: "in process",
    orderdProductsList: [
      { product: (data_product.at(7)).id, quantity: 2 },
      { product: (data_product.at(8)).id, quantity: 4 },
    ],
  },
  {
    order_id: 105,
    orderdate: "2024-11-06",
    contact: "03556677889",
    customerName: "Charlie White",
    email: "charlie.white@gmail.com",
    address: "456 Birch Street, Willowdale",
    total: 6000,
    payment: "Cash on delivery",
    orderStatus: "received",
    orderdProductsList: [
      { product: (data_product.at(9)).id, quantity: 1 },
      { product: (data_product.at(10)).id, quantity: 6 },
    ],
  },
  {
    order_id: 106,
    orderdate: "2024-11-07",
    contact: "03667678899",
    customerName: "Diana Green",
    email: "diana.green@yahoo.com",
    address: "567 Cedar Avenue, Riverview",
    total: 5200,
    payment: "Paid online",
    orderStatus: "delivered",
    orderdProductsList: [
      { product: (data_product.at(11)).id, quantity: 3 },
      { product: (data_product.at(12)).id, quantity: 2 },
    ],
  },
  {
    order_id: 107,
    orderdate: "2024-11-08",
    contact: "03778899001",
    customerName: "Eve Black",
    email: "eve.black@hotmail.com",
    address: "678 Pine Street, Bayside",
    total: 2800,
    payment: "Cash on delivery",
    orderStatus: "shipped",
    orderdProductsList: [
      { product: (data_product.at(13)).id, quantity: 2 },
      { product: (data_product.at(14)).id, quantity: 2 },
    ],
  },
  {
    order_id: 108,
    orderdate: "2024-11-09",
    contact: "03889900112",
    customerName: "Frank Gray",
    email: "frank.gray@gmail.com",
    address: "789 Willow Lane, Greenfield",
    total: 3600,
    payment: "Paid online",
    orderStatus: "delivered",
    orderdProductsList: [
      { product: (data_product.at(0)).id, quantity: 3 },
      { product: (data_product.at(7)).id, quantity: 2 },
    ],
  },
];

export default order_list;
