import pasta from "../Images/pasta.png";
import coffee from "../Images/coffee.png";
import rice from "../Images/rice.png";
import tea from "../Images/tea.png";

export const OrderData = [
  {
    id: "01",
    OrderNumber: "01021",
    time: "07:00Pm",
    SubTotal: "500",
    status: "active",
    total: "500",
    OrderType: "delivery",
    totalItems: "03",

    items: [
      { itemName: "Rice", price: "200", quantity: "2", image: rice },
      { itemName: "Coffee", price: "150", quantity: "2", image: coffee },
      { itemName: "Tea", price: "120", quantity: "2", image: tea },
      { itemName: "Pasta", price: "320", quantity: "2", image: pasta },
    ],

    Client: {
      ClientName: "Jackoub",
      deliveryAddress: "House#123 Straet No 02 Newyork",
      Phone: "01048511545464",
      email: "Jackoub@gmail.com",
    },
  },
  {
    id: "02",
    OrderNumber: "01221",
    time: "06:00Pm",
    SubTotal: "800",
    status: "active",
    total: "800",
    OrderType: "pickup",
    totalItems: "03",
    Client: {
      ClientName: "Moris",
      deliveryAddress: "House#123 Straet No 02 Newyork",
      Phone: "01048511545464",
      email: "Moris@gmail.com",
    },
    items: [
      { itemName: "Rice", price: "200", quantity: "2", image: rice },
      { itemName: "Coffee", price: "150", quantity: "2", image: coffee },
      { itemName: "Tea", price: "120", quantity: "2", image: tea },
      { itemName: "Pasta", price: "320", quantity: "2", image: pasta },
    ],
  },
  {
    id: "03",
    OrderNumber: "01121",
    time: "06:00Pm",
    SubTotal: "300",
    status: "delivered",
    total: "300",
    OrderType: "delivery",
    totalItems: "03",
    Client: {
      ClientName: "Alish",
      deliveryAddress: "House#123 Straet No 02 Newyork",
      Phone: "01048511545464",
      email: "Alish@gmail.com",
    },
    items: [
      { itemName: "Rice", price: "200", quantity: "2", image: rice },
      { itemName: "Coffee", price: "150", quantity: "2", image: coffee },
      { itemName: "Tea", price: "120", quantity: "2", image: tea },
      { itemName: "Pasta", price: "320", quantity: "2", image: pasta },
    ],
  },
  {
    id: "04",
    OrderNumber: "01521",
    time: "08:00Pm",
    SubTotal: "700",
    status: "cancelled",
    total: "700",
    OrderType: "delivery",
    totalItems: "03",
    Client: {
      ClientName: "Wilsome",
      deliveryAddress: "House#123 Straet No 02 Newyork",
      Phone: "01048511545464",
      email: "willsome@gmail.com",
    },
    items: [
      { itemName: "Rice", price: "200", quantity: "2", image: rice },
      { itemName: "Coffee", price: "150", quantity: "2", image: coffee },
      { itemName: "Tea", price: "120", quantity: "2", image: tea },
      { itemName: "Pasta", price: "320", quantity: "2", image: pasta },
    ],
  },
  {
    id: "05",
    OrderNumber: "01221",
    time: "06:00Pm",
    SubTotal: "800",
    status: "active",
    total: "800",
    OrderType: "pickup",
    totalItems: "03",
    Client: {
      ClientName: "deny",
      deliveryAddress: "House#123 Straet No 02 Newyork",
      Phone: "01048511545464",
      email: "deny@gmail.com",
    },
    items: [
      { itemName: "Rice", price: "200", quantity: "2", image: rice },
      { itemName: "Coffee", price: "150", quantity: "2", image: coffee },
      { itemName: "Tea", price: "120", quantity: "2", image: tea },
      { itemName: "Pasta", price: "320", quantity: "2", image: pasta },
    ],
  },
  {
    id: "06",
    OrderNumber: "01121",
    time: "06:00Pm",
    SubTotal: "300",
    status: "delivered",
    total: "300",
    OrderType: "delivery",
    totalItems: "03",
    Client: {
      ClientName: "Marie",
      deliveryAddress: "House#123 Straet No 02 Newyork",
      Phone: "01048511545464",
      email: "Marie@gmail.com",
    },
    items: [
      { itemName: "Rice", price: "200", quantity: "2", image: rice },
      { itemName: "Coffee", price: "150", quantity: "2", image: coffee },
      { itemName: "Tea", price: "120", quantity: "2", image: tea },
      { itemName: "Pasta", price: "320", quantity: "2", image: pasta },
    ],
  },
];

export const Clientdata = [
  {
    id: "01",
    name: "Jackoub",
    address: "house# 123 streat2 newyork",
    phone: "004565884112",
    email: "jacloub@gmail.com",
  },

  {
    id: "02",
    name: "Moris",
    address: "house# 123 streat2 newyork",
    phone: "01454485484",
    email: "Moris@gmail.com",
  },
  {
    id: "03",
    name: "Elina",
    address: "house# 123 streat2 newyork",
    phone: "06564215454",
    email: "Elina@gmail.com",
  },
  {
    id: "04",
    name: "Brain",
    address: "house# 123 streat2 newyork",
    phone: "09211422156",
    email: "Brain@gmail.com",
  },
  {
    id: "05",
    name: "Hobbs",
    address: "house# 123 streat2 newyork",
    phone: "09367154122",
    email: "Hobbs@gmail.com",
  },
  {
    id: "06",
    name: "Toretto",
    address: "house# 123 streat2 newyork",
    phone: "0741258963",
    email: "Toretto@gmail.com",
  },
  {
    id: "07",
    name: "Roman",
    address: "house# 123 streat2 newyork",
    phone: "01625549486",
    email: "Roman@gmail.com",
  },
  {
    id: "08",
    name: "Hank",
    address: "house# 123 streat2 newyork",
    phone: "06652874112",
    email: "Hank@gmail.com",
  },
];

export const MenuData = [
  { itemName: "Biryani", price: "150", id: "01", image: pasta },
  { itemName: "Pasta", price: "150", id: "02", image: pasta },

  { itemName: "Tea", price: "50", id: "03", image: pasta },

  { itemName: "Coffee", price: "150", id: "04", image: pasta },

  { itemName: "Burger", price: "350", id: "05", image: pasta },

  { itemName: "Club", price: "450", id: "06", image: pasta },
];
