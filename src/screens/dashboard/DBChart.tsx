/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import InfoIcon from "@mui/icons-material/Info";

import Loader from "../../components/Loader";
import moment from "moment";
import InfoModal from "../../components/InfoModal";
import { OrderStatusApi } from "../../feature/slicer/OrderStatusSlicer";

const TableHeadings = [
  "Customer",
  "Phone No",
  "Email",
  "Order Time",
  "Amount",
  "Status",
  "Order Info",
  "Order Status",
  "Order Type",
  "Delivery Detail",
];

const index = () => {
  const { isLoading, DashboardData } = useSelector(
    (state: any) => state.DashboardSlicer
  );
  const dispatch = useDispatch()
  const [filterData, setFilterData] = useState<any>([]);

  const [orderStatus, setOrderStatus] = useState<any>("pendingOrders");

  const [infoModal, setInfoModal] = useState<any>(false);
  const [titleModal, setTitleModal] = useState<any>("");
  const [item, setItem] = useState<any>("");
  
  // console.log(filterData)
  const closeModal = () => {
    setInfoModal(false);
  };
  const handlePending = () => {
    setOrderStatus("pendingOrders");
  };
  const handleActive = () => {
    setOrderStatus("activeOrders");
  };
  const HandleOrderInfo = (item: any) => {
    setItem(item);
  //  console.log(item)

    // console.log(item)
    setInfoModal(true);
    setTitleModal("OrderInfo");
  };
  const HandleOrderStatus = (item : any) => {
  //  console.log(item?.deliveryMode)
  // console.log(item)

    setItem(item);
    setInfoModal(true);
    setTitleModal("RecentOrderStatus");
  };
  const HandleCancelOrder = (id:any) =>{
    
    setItem(id)
    setInfoModal(true)
    setTitleModal("cancelorderModal")
  }
  const HandleOrderAsgn = (item:any) => {
  //  console.log(item)
    setItem(item);
    setInfoModal(true);
    setTitleModal("RecentOrderassign");
  };
  const HandleReadyAction = (item:any) => {
    const Obj = { id: item, status: "Ready"  };
    
    dispatch(OrderStatusApi(Obj));
  }
  useEffect(() => {
    if (orderStatus === "pendingOrders" || orderStatus === "activeOrders") {
      const filteredData = DashboardData?.[orderStatus] || [];
      // Sort filteredData by createdAt field (assuming it's a date)
      const sortedData = [...filteredData].sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setFilterData(sortedData);
    
    }
    
    
  }, [orderStatus, DashboardData]);
  return (
    <Card
      className=" w-full"
      placeholder=""
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
    >
      <CardHeader
        floated={false}
        shadow={false}
        className="  rounded-none"
        placeholder=""
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        <div className="mb-4 py-4 flex items-center justify-between gap-8">
          <h1 className="text-4xl italic font-bold text-gray-800">
            Today's Order History{" "}
          </h1>
        </div>

        <div className="flex  gap-4">
        <Button
    onClick={handlePending}
    placeholder=""
    // variant={orderStatus == "pendingOrders" ? "solid" : "outlined"}
    onPointerEnterCapture={() => {}}
    onPointerLeaveCapture={() => {}}
    className={`${orderStatus == "pendingOrders" ? "bg-black border-2  text-white" : 'bg-white-800 text-black  border-2 '} flex  items-center gap-3`}
>
    Pending Orders {DashboardData?.pendingOrders?.length}
</Button>
          <Button
            onClick={handleActive}
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
    className={`${orderStatus == "activeOrders" ? "bg-black border-2  text-white" : 'bg-white-800 text-black  border-2 '} flex  items-center gap-3`}

            size="sm"
          >
            Active Orders {DashboardData?.activeOrders?.length}
          </Button>
        </div>
      </CardHeader>

      <CardBody
        placeholder=""
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
        className=" h-[40vh]  overflow-scroll px-0"
      >
        {filterData && filterData?.length > 0 ? (
         <>
         <table className="mt-4 w-full min-w-max table-auto  text-left">
            <thead>
              <tr className="">
                {TableHeadings?.map((head:any, index :any) => (
                  <th
                    key={index}
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
                    user,
                    totalAmount,
                    createdAt,
                    status,
                    deliveryMode,
                    _id,
                    products,
                              address,
                    payment_type,
                    
                  }: any,
                  index: any
                ) => {
                  const isLast = index === filterData?.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <>
                      <tr key={_id}>
                        <td className={`${classes} clientData`}>
                          {user?.fullname}
                        </td>
                        <td className={`${classes} `}>
                          {user?.phone}
                        </td>
                        <td className={`${classes} `}>
                          {user?.email}
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
                            {/* {moment(createdAt).format("LL")} */}
                          {moment(createdAt).format(' h:mm a, MMMM Do YYYY')}

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
                            {totalAmount?.toFixed(2)}$
                          </Typography>
                        </td>

                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={status}
                              color={
                                status === "Delivered"
                                  ? "orange"
                                  : status === "Pending"
                                  ? "gray"
                                  : status === "Cancelled"
                                  ? "red"
                                  : status === "Confirmed"
                                  ? "blue"
                                  : status === "Shipped"
                                  ? "green"
                                  : undefined
                              }
                            />
                          </div>
                        </td>
                        <td className={classes}>
                        <IconButton
                          onClick={() =>
                            HandleOrderInfo({
                              products,
                              address,
                              user,
                              totalAmount,
                              status,
                            })
                          }
                          variant="text"
                          placeholder=""
                          onPointerEnterCapture={() => {}}
                          onPointerLeaveCapture={() => {}}
                        >
                          <InfoIcon className="h-4 w-4" />
                        </IconButton>
                      </td>
                      <td className={`${classes} flex gap-2`}>
  {status !== "Confirmed" ? (
    <Button
      placeholder=""
      disabled={status === "Delivered" || status === "Shipped"}
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
      size="sm"
      color={
        (status === "Delivered" && "orange") ||
        (status === "Pending" && "gray") ||
        (status === "Cancelled" && "red") ||
        (status === "Confirmed" && "blue") ||
        (status === "Shipped" && "green") ||
        undefined
      }
      onClick={() => HandleOrderStatus({_id, deliveryMode})}
    >
      {status}
    </Button>
  ) : (
    <div className="flex flex-col gap-2">
    <Button
      placeholder=""
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
      size="sm"
      color={
        (status === "Delivered" && "orange") ||
        (status === "Pending" && "gray") ||
        (status === "Cancelled" && "red") ||
        (status === "Confirmed" && "blue") ||
        (status === "Shipped" && "green") ||
        undefined
      }
      onClick={() => {
        if (deliveryMode === 'Pickup') {
          HandleReadyAction(_id); // Replace with your function for handling "Ready" action
        } else {
          HandleOrderAsgn({_id, deliveryMode}); // Function for assigning order to rider
        }
      }}
    >
      {deliveryMode === 'Pickup' ? "Ready" : "Assign to Rider"}
    </Button>
    <Button
        placeholder=""
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
          size="sm" color="red" onClick={()=>HandleCancelOrder(_id)}>
        Cancel Order
      </Button>
    </div>

  )}
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
                            {deliveryMode}
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
                            {payment_type}
                          </Typography>
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
        title={titleModal}
        ActionModal={infoModal}
        closeModal={closeModal}
        item={item}
        />
      )}
      </> 
      ) : (
          <div className="flex justify-center min-w-full">
            <h1 className="text-center text-xl  ">No Any orders Found</h1>
          </div>
        )}

      </CardBody>
      {isLoading && <Loader />}
    </Card>
  );
};

export default index;
