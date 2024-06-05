
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import Header from "../../components/CardHeader";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import InfoModal from "../../components/InfoModal";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";

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





const index = () => {
  const {isLoading ,Customers } = useSelector((state: any) => state.GetCustomerList);
  const [filterData, setFilterData] = useState<any>([]);
  const [statusTab, setStatusTab] = useState<any>("all");
  const [search, setSearch] = useState<any>("");
  const [infoModal, setInfoModal] = useState<any>(false);
  const [titleModal , setTitleModal] = useState<any>("")
  const [item , setItem] = useState<any>("")
    

 
  const closeModal = () => {
    setInfoModal(false);
  };
  const handleBlockCustomer = (id:any) =>{
    setTitleModal("blockcustomer")
    setInfoModal(true)
    setItem(id)
  
  }
  const handleUnBlockCustomer = (id:any) =>{
    setTitleModal("unblockcustomer")
    setInfoModal(true)
    setItem(id)

  }
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
      setFilterData(filteredData);
    }
  }, [search, Customers, statusTab]);
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
                      <td className={classes}>
                          <Chip
                            variant="ghost"
                            size="sm"
                            className="w-fit px-4 mx-auto"
                            value={isActive == true ? "Active" : "Inactive"}
                            color={isActive == true ? "green" : "red"}
                          />
                          
                      </td>
                      <td className={classes}>
                       <div className=" ">

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
                        </Tooltip>
                       
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

