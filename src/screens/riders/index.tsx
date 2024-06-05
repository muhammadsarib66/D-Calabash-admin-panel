/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
// import InfoIcon from "@mui/icons-material/Info";

import { Card, CardBody, Chip, IconButton, Tooltip, Typography } from "@material-tailwind/react";
import Header from "../../components/CardHeader";
import InfoModal from "../../components/InfoModal";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import DeleteIcon from "@mui/icons-material/Delete";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const OrderStatusTABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Active",
    value: true,
  },

  {
    label: "Blocked",
    value: false,
  },
 
];

const TableHeadings = ["Rider Name", "Email", "Status", "Action"];

const index = () => {
  const { isLoading, Riders } = useSelector(
    (state: any) => state.GetRidersSlicer
  );
  const [filterData, setFilterData] = useState<any>([]);
  const [infoModal, setInfoModal] = useState<any>(false);
  const [statusTab, setStatusTab] = useState<any>("all");
  const [titleModal, setTitleModal] = useState<any>("");
  const [item, setItem] = useState<any>("");

  const [search, setSearch] = useState<any>("");

  const closeModal = () => {
    setInfoModal(false);
  };

  const handleAddRider = () => {
    setTitleModal("addRider");
    setInfoModal(true);
   
  }
  const handleBlockRider = (id:any) =>{
    setTitleModal("blockRider")
    setInfoModal(true)
    setItem(id)
  
  }
  const handleUnBlockRider = (id:any) =>{
    setTitleModal("unblockRider")
    setInfoModal(true)
    setItem(id)

  }
  const HandleDeletrRider = (id:any) =>{
    setTitleModal("delRider")
    setInfoModal(true)
    setItem(id)

  
  }

  useEffect(() => {
    if (search.length > 0) {
      const filteredData = Riders?.filter((data: any) => {
        return data?.fullname
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setFilterData(filteredData);
    } else {
      // If search is cleared, reset filterData based on statusTab
      const filteredData = Riders?.filter((data: any) => {
        if (statusTab == "all") {
          return true;
        } else {
          return data.isActive == statusTab;
        }
      });
      setFilterData(filteredData);
    }
  }, [search, Riders, statusTab]);
  return (
    <Card
      className=" w-full"
      placeholder=""
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
    >
      <Header
        heading={"Riders List"}
        headingDetail="See information about  Order"
        statusTabs={OrderStatusTABS}
        setStatusTab={setStatusTab}
        setSearch={setSearch}
        handleAddBtn={handleAddRider}
        BtnTitle="Add Rider"
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
              ({ email, fullname, isActive, _id }: any, index: any) => {
                const isLast = index === filterData?.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <>
                    <tr key={_id}>
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
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={isActive ? "Active" : "Blocked"}
                            color={isActive == true ? "green" : "red"}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <div className=" ">
                          <Tooltip content="Block User">
                            <IconButton
                              disabled={isActive == false ? true : false}
                              onClick={() => handleBlockRider(_id)}
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
                              onClick={() => handleUnBlockRider(_id)}
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
                              onClick={() => HandleDeletrRider(_id)}
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
