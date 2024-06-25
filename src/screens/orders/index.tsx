/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";

import {
  Button,
  Card,
  CardBody,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import Header from "../../components/CardHeader";
import InfoModal from "../../components/InfoModal";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import { issubadmin } from "../../feature/slicer/Slicer";
import { GetOrderListApi } from "../../feature/slicer/GetOrderListSlicer";
const OrderStatusTABS = [
  {
    label: "Pending",
    value: "Pending",
  },
  {
    label: "Confirmed",
    value: "Confirmed",
  },
  {
    label: "Shipped",
    value: "Shipped",
  },
  {
    label: "Delivered",
    value: "Delivered",
  },
  {
    label: "All",
    value: "all",
  },
];

const TableHeadings = [
  "Customer",
  "Order Time",
  "Amount",
  "Status",
  "Order Detail",
  "Delivery Status",
  "Action",
];

const filteredHeadings = issubadmin
  ? TableHeadings.filter((heading) => heading !== "Action")
  : TableHeadings;
const index = () => {
  const { isLoading, Orders } = useSelector(
    (state: any) => state.GetOrderListSlicer
  );
  const dispatch = useDispatch();
  const [filterData, setFilterData] = useState<any>([]);
  const [statusTab, setStatusTab] = useState<any>("Pending");
  const [infoModal, setInfoModal] = useState<any>(false);
  const [titleModal, setTitleModal] = useState<any>("");
  const [item, setItem] = useState<any>("");
  const [search, setSearch] = useState<any>("");

  const closeModal = () => {
    setInfoModal(false);
  };

  const HandleOrderInfo = (item: any) => {
    setItem(item);
    setInfoModal(true);
    setTitleModal("OrderInfo");
  };
  const HandleDeletrOrder = (item: any) => {
    setItem(item);
    setInfoModal(true);
    setTitleModal("deleteorder");
  };
  const HandleOrderStatus = (item: any) => {
    setItem(item);
    setInfoModal(true);
    setTitleModal("OrderStatus");
  };
  const HandleOrderAsgn = (id: any) => {
    setItem(id);
    setInfoModal(true);
    setTitleModal("Orderassign");
  };

  useEffect(() => {
    if (search.length > 0) {
      const filteredData = Orders?.filter((data: any) => {
        return data?.user?.fullname
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setFilterData(filteredData);
    } else {
      // If search is cleared, reset filterData based on statusTab
      const filteredData = Orders?.filter((data: any) => {
        if (statusTab == "all") {
          return true;
        } else {
          return data.status == statusTab;
        }
      });
      filteredData.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setFilterData(filteredData);
    }
  }, [search, Orders, statusTab]);
  useEffect(() => {
    dispatch(GetOrderListApi());
  }, []);
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
        StatusTabVal="Pending"
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
              {filteredHeadings?.map((head) => (
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
                  user,
                  totalAmount,
                  createdAt,
                  address,
                  products,
                  status,
                  deliveryMode,
                  _id,
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
                        <div className="fullData bg-gray-50  text-gray-800 rounded-md shadow-md h-fit p-4  w-[300px] overflow-x-scroll ">
                          <p>
                            <span className="font-bold">Full Name : </span>
                            {user?.fullname}
                          </p>
                          <p>
                            <span className="font-bold">Phone : </span>
                            {"03103102166"}
                          </p>
                          <p>
                            <span className="font-bold">Email : </span>
                            {user?.email}
                          </p>
                          <p>
                            <span className="font-bold">City : </span>
                            {address?.city}
                          </p>
                          <p>
                            <span className="font-bold">Delivery Addr : </span>
                            {address?.addressLine}
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
                          {/* {moment(createdAt).format('LL')} */}
                          {/* {createdAt.sort((a:any,b:any) => new Date(b.createdAt) - new Date(a.createdAt))} */}
                          {moment(createdAt).format(" h:mm a, MMMM Do YYYY")}
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
                            disabled={
                              status === "Delivered" || status === "Shipped"
                                ? true
                                : false
                            }
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
                            onClick={() =>
                              HandleOrderStatus({ _id, deliveryMode })
                            }
                          >
                            {status}
                          </Button>
                        ) : (
                          <Button
                            placeholder=""
                            // disabled={available == true ? true : false}
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
                            onClick={() => HandleOrderAsgn({ _id })}
                          >
                            Assign to Rider
                          </Button>
                        )}
                      </td>
                      {issubadmin == true ? null : (
                        <td className={classes}>
                          <Tooltip content="Delete Order">
                            <IconButton
                              onClick={() => HandleDeletrOrder(_id)}
                              placeholder=""
                              onPointerEnterCapture={() => {}}
                              onPointerLeaveCapture={() => {}}
                              variant="text"
                            >
                              <DeleteIcon className=" text-red-500" />
                            </IconButton>
                          </Tooltip>
                        </td>
                      )}
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
      </CardBody>
      {isLoading && <Loader />}
    </Card>
  );
};

export default index;
