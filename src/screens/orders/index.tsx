/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import coffee from "../../Images/coffee.png";
import tea from "../../Images/tea.png";
import rice from "../../Images/rice.png";
import pasta from "../../Images/pasta.png";
import {
  Button,
  Card,
  CardBody,
  Chip,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import Header from "../../components/CardHeader";
import InfoModal from "../../components/InfoModal";
const OrderStatusTABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Delivered",
    value: "delivered",
  },
  {
    label: "Accepted",
    value: "accepted",
  },
  {
    label: "Pending",
    value: "pending",
  },
];

const TableHeadings = [
  "Order ID",
  "Customer",
  "Time",
  "Total Item",
  "Order Type",
  "Amount",
  "Status",
  "Info",
  "Action",
];

const createFakeData = (index: any) => {
  return {
    Order_ID: "ORD" + (index + 1),
    Customer: "Customer " + (index + 1),
    Time: "2024-05-15 10:30 AM",
    Total_Item: Math.floor(Math.random() * 5) + 1, // Random number between 1 and 5
    Order_Type: index % 2 === 0 ? "Online" : "In-store", // Alternate between Online and In-store
    Amount: "$" + (Math.floor(Math.random() * 100) + 50).toFixed(2), // Random amount between $50 and $150
    Status: index % 2 === 0 ? "Delivered" : "Pending", // Alternate between Delivered and Pending
    Info: "Lorem ipsum dolor sit amet",
    Action: index % 2 === 0 ? "View" : "Edit", // Alternate between View and Edit
    Client: {
      ClientName: "Client " + (index + 1),
      deliveryAddress: "Address " + (index + 1),
      Phone: "01048511545" + (index + 1),
      email: "client" + (index + 1) + "@example.com",
    },
    items: [
      { itemName: "Coffee", price: "20", quantity: "1", image: coffee },
      { itemName: "Tea", price: "30", quantity: "1", image: tea },
      { itemName: "Pasta", price: "20", quantity: "1", image: pasta },
      { itemName: "Rice", price: "30", quantity: "1", image: rice },
    ],
  };
};

const fakeData: any = [];
for (let i = 0; i < 10; i++) {
  fakeData.push(createFakeData(i));
}

const index = () => {
  const [filterData, setFilterData] = useState<any>([]);
  const [infoModal, setInfoModal] = useState<any>(false);
  const [itemInfo, setItemInfo] = useState<any>({});
  const [statusTab, setStatusTab] = useState<any>("all");
  const [search, setSearch] = useState<any>("");

  const closeModal = () => {
    setInfoModal(false);
  };
  useEffect(() => {
    const filteredData = fakeData.filter((data: any) => {
      if (statusTab === "all") {
        return true;
      } else {
        return data.Status.toLowerCase() === statusTab;
      }
    });
    setFilterData(filteredData);
    if (search.length > 0) {
      const filteredData = fakeData.filter((data: any) => {
        return data.Order_ID.toLowerCase().includes(search.toLowerCase());
      });
      setFilterData(filteredData);
    }
  }, [statusTab, search]);
  return (
    <Card
      className=" w-full"
      placeholder=""
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
    >
      <Header
        heading={"Orders List"}
        headingDetail="See information about  Order"
        statusTabs={OrderStatusTABS}
        setStatusTab={setStatusTab}
        setSearch={setSearch}
      />

      <CardBody
        placeholder=""
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
        className=" h-[70vh]  overflow-scroll px-0"
      >
        <table className="mt-4 w-full min-w-max table-auto  text-left">
          <thead>
            <tr className="">
              {TableHeadings?.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {filterData?.map(
              (
                {
                  Order_ID,
                  Order_Type,
                  Customer,
                  Total_Item,
                  Info,
                  Amount,
                  Client,
                  items,
                  Status,
                  Time,
                }: any,
                index: any
              ) => {
                const isLast = index === filterData?.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <>
                    <tr key={Order_ID}>
                      <td className={classes}>
                        <Typography
                          placeholder=""
                          onPointerEnterCapture={() => {}}
                          onPointerLeaveCapture={() => {}}
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {Order_ID}
                        </Typography>
                      </td>
                      <td className={`${classes} clientData`}>
                        {Customer}
                        <div className="fullData bg-gray-50  text-gray-800 rounded-md shadow-md h-fit p-4  w-[300px] overflow-x-scroll ">
                          <p>
                            <span className="font-bold">Full Name : </span>
                            {Client.ClientName}
                          </p>
                          <p>
                            <span className="font-bold">Phone : </span>
                            {Client.phone}
                          </p>
                          <p>
                            <span className="font-bold">Email : </span>
                            {Client.email}
                          </p>
                          <p>
                            <span className="font-bold">Delivery Addr : </span>
                            {Client.deliveryAddress}
                          </p>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          placeholder=""
                          onPointerEnterCapture={() => {}}
                          onPointerLeaveCapture={() => {}}
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {Time}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          placeholder=""
                          onPointerEnterCapture={() => {}}
                          onPointerLeaveCapture={() => {}}
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {Total_Item}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          placeholder=""
                          onPointerEnterCapture={() => {}}
                          onPointerLeaveCapture={() => {}}
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {Order_Type}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          placeholder=""
                          onPointerEnterCapture={() => {}}
                          onPointerLeaveCapture={() => {}}
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {Amount}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={Status}
                            color={
                              Status === "Delivered" || Status === "Accepted"
                                ? "green"
                                : "red"
                            }
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <IconButton
                          onClick={() => {
                            setItemInfo({
                              Info,
                              items,
                              Order_ID,
                              Amount,
                              Client,
                              Status,
                            });
                            setInfoModal(true);
                          }}
                          variant="text"
                          placeholder=""
                          onPointerEnterCapture={() => {}}
                          onPointerLeaveCapture={() => {}}
                        >
                          <InfoIcon className="h-4 w-4" />
                        </IconButton>
                      </td>
                      <td className={`${classes} flex gap-2`}>
                        <Button
                          placeholder=""
                          onPointerEnterCapture={() => {}}
                          onPointerLeaveCapture={() => {}}
                          size="sm"
                          color="blue"
                        >
                          Accept
                        </Button>
                        <Button
                          placeholder=""
                          onPointerEnterCapture={() => {}}
                          onPointerLeaveCapture={() => {}}
                          size="sm"
                          color="red"
                        >
                          Reject
                        </Button>
                      </td>
                    </tr>
                  </>
                );
              }
            )}
          </tbody>
        </table>
        {infoModal && (
          <InfoModal
            item={itemInfo}
            title="order-details"
            infoModal={infoModal}
            closeModal={closeModal}
          />
        )}
      </CardBody>
    </Card>
  );
};

export default index;
