
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Chip,
  IconButton,
  Switch,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import Header from "../../components/CardHeader";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import InfoModal from "../../components/InfoModal";
// import NoAccountsIcon from "@mui/icons-material/NoAccounts";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import {  issubadmin } from "../../feature/slicer/Slicer";
import { BlockCustomerApi } from "../../feature/slicer/BlockCustomerSlicer";
import { UnBlockCustomerApi } from "../../feature/slicer/UnBlockCustomerSlicer";
import { socket } from "../../components/UpdateSocket";
// import { io } from "socket.io-client";
const OrderStatusTABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Active",
    value: "true",
  },
  {
    label: "Blocked",
    value: "false",
  },
];

const TableHeadings = [
  "Name",
  "Email",
  "Phone No",
  "Status" ,
  "Action"
];

const filteredHeadings = issubadmin 
  ? TableHeadings.filter(heading => heading !== "Action" )
  : TableHeadings;



const index = () => {
  // const socket = useMemo(() => io(baseUrl), []);

  const {isLoading ,Customers } = useSelector((state: any) => state.GetCustomerList);
  const {isLoading : isLaoding1 } = useSelector((state: any) => state.BlockCustomerSlicer);
  const {isLoading : isLaoding2 } = useSelector((state: any) => state.UnBlockCustomerSlicer);
  const dispatch = useDispatch();
  const [filterData, setFilterData] = useState<any>([]);
  const [statusTab, setStatusTab] = useState<any>("all");
  const [search, setSearch] = useState<any>("");
  const [infoModal, setInfoModal] = useState<any>(false);
  const [titleModal , setTitleModal] = useState<any>("")
  const [item , setItem] = useState<any>("")
    

 
  const closeModal = () => {
    setInfoModal(false);
  };

  const handleCustomerStatusChanged = (e: any, id: any) => {
    if (e.target.checked == false) {
      const Obj = { customerId: id };
    dispatch(BlockCustomerApi(Obj));
    } else if (e.target.checked == true) {
      const Obj = { customerId: id };
    dispatch(UnBlockCustomerApi(Obj));
    }
  };
  // const handleBlockCustomer = (id:any) =>{
  //   setTitleModal("blockcustomer")
  //   setInfoModal(true)
  //   setItem(id)
  
  // }
  // const handleUnBlockCustomer = (id:any) =>{
  //   setTitleModal("unblockcustomer")
  //   setInfoModal(true)
  //   setItem(id)

  // }
  const HandleDeletrCustomer = (id:any) =>{
    setTitleModal("delcustomer")
    setInfoModal(true)
    setItem(id)

  
  }

  useEffect(() => {
    const filteredData = Customers?.filter((data: any) => {
      if (statusTab === "all") {
        return true;
      } else {
        return data.isActive.toString() === statusTab;
      }
    });
    setFilterData(filteredData);
  }, [statusTab, Customers]);

  // Effect for filtering by search
  useEffect(() => {
    if (search.length > 0) {
      const filteredData = Customers?.filter((data: any) => {
        return data.fullname.toLowerCase().includes(search.toLowerCase());
      });
      setFilterData(filteredData);
    } else {
      // If search is cleared, reset filterData based on statusTab
      const filteredData = Customers?.filter((data: any) => {
        if (statusTab === "all") {
          return true;
        } else {
          return data.isActive.toString() === statusTab;
        }
      });
    filteredData.sort((a:any, b:any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      setFilterData(filteredData);
    }
  }, [search, Customers, statusTab]);


  useEffect(()=>{
    socket.on('user-update',async(data)=>{
console.log('DATA DELETE' ,data)
    })
  },[Customers])
  return (
    <Card
      className=" w-full"
      placeholder=""
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
    >
      <Header
        heading={"Customer List"}
        headingDetail="See information about  Customers"
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
        <table className="mt-4 w-full min-w-max table-auto text-center mx-auto  " > 
          <thead>
            <tr className="text-center">
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
                    {issubadmin == true ? head == "Action" ? "" : head : head}
                    {/* {head} */}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {filterData?.map(
              (
                {  isActive, fullname,email, phone , _id }: any,
                index: any
              ) => {
                const isLast = index === filterData?.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <>
                    <tr className="text-center" key={_id}>
                      <td className={classes}>
                        <Typography
                          placeholder=""
                          onPointerEnterCapture={() => {}}
                          onPointerLeaveCapture={() => {}}
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {fullname}
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
                          {email}
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
                          {phone}
                        </Typography>
                      </td>
                      <td className={`${classes} flex justify-center`} >
                      <div className="w-fit   relative  gap-2">
                         {
                          !issubadmin && 
                         
                          <Switch
                          crossOrigin={undefined}
                            placeholder=""
                            onPointerEnterCapture={() => {}}
                            onPointerLeaveCapture={() => {}}
                            onChange={(e:any) => handleCustomerStatusChanged(e, _id)}
                            checked={isActive == true ? true : false}
                            className="bg-red-600  absolute left-0"
                            color="green"
                            defaultChecked
                          />
                        }
                          <Chip
                            variant="ghost"
                            size="sm"
                            className="w-fit px-4 mx-auto"
                            value={isActive == true ? "Active" : "Inactive"}
                            color={isActive == true ? "green" : "red"}
                          />
                          </div>
                      </td>
                      { !issubadmin == true ? 
                      <td className={classes}>
                       <div className=" ">
{/* 
                        <Tooltip content="Block User">
                          <IconButton
                          disabled={isActive == false ? true : false}
                          onClick={() => handleBlockCustomer(_id)}

                            placeholder=""
                            onPointerEnterCapture={() => {}}
                            onPointerLeaveCapture={() => {}}
                            variant="text"
                          >
                            <NoAccountsIcon className=" text-gray-700" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Unblock User">
                          <IconButton
                          disabled={isActive == true ? true : false}
                          onClick={() => handleUnBlockCustomer(_id)}

                            placeholder=""
                            onPointerEnterCapture={() => {}}
                            onPointerLeaveCapture={() => {}}
                            variant="text"
                          >
                            <AccountCircleIcon className=" text-gray-700" />
                          </IconButton>
                        </Tooltip> */}
                       
                        <Tooltip content="Delete User">
                          <IconButton
                            onClick={() => HandleDeletrCustomer(_id)}
                            placeholder=""
                            onPointerEnterCapture={() => {}}
                            onPointerLeaveCapture={() => {}}
                            variant="text"
                          >
                            <DeleteIcon className=" text-red-500" />
                          </IconButton>
                        </Tooltip>
                       </div>

                      </td>
                      : ""}
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
      {isLoading   && <Loader />}
      {isLaoding1   && <Loader />}
      {isLaoding2   && <Loader />}
    </Card>
  );
};

export default index;

