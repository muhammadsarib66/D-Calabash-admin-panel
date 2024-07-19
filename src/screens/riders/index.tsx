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
import InfoModal from "../../components/InfoModal";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import DeleteIcon from "@mui/icons-material/Delete";
// import NoAccountsIcon from "@mui/icons-material/NoAccounts";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { issubadmin } from "../../feature/slicer/Slicer";
import { BlockRiderApi } from "../../feature/slicer/BlockRiderSlicer";
import { UnBlockRiderApi } from "../../feature/slicer/UnBlockRiderSlicer";
import { socket } from "../../components/UpdateSocket";
const RiderStatusTABS = [
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

const TableHeadings = [
  "Rider Name",
  "Email",
  "Phone No",
  "Status",
  "Working Mode",
  "Action",
];

const filteredHeadings = issubadmin
  ? TableHeadings.filter((heading) => heading !== "Action")
  : TableHeadings;

const index = () => {
  const { isLoading, Riders } = useSelector((state: any) => state.GetRidersSlicer);
  const { isLoading : isLoading1  } = useSelector((state: any) => state.BlockRiderSlicer);
  const { isLoading : isLoading2  } = useSelector((state: any) => state.UnBlockRiderSlicer);
  const dispatch = useDispatch();

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
  };
  const handleRiderStatusChanged = (e: any, id: any) => {
    if (e.target.checked == false) {
      const Obj = { riderId: id };
      dispatch(BlockRiderApi(Obj));
    } else if (e.target.checked == true) {
      const Obj = { riderId: id };
      dispatch(UnBlockRiderApi(Obj));
    }
  };

  const HandleDeletrRider = (id: any) => {
    setTitleModal("delRider");
    setInfoModal(true);
    setItem(id);
  };

  useEffect(() => {
    if (search.length > 0) {
      const filteredData = Riders?.filter((data: any) => {
        return data?.fullname.toLowerCase().includes(search.toLowerCase());
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
      filteredData.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

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
        headingDetail="See information about  Riders"
        statusTabs={RiderStatusTABS}
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
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {filterData?.map(
              (
                { phone,email, fullname, isActive, isWorking, _id }: any,
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
                          {/* {fullname} */}
                          {fullname.length > 10
                            ? `${fullname.substring(0, 10)}..`
                            : fullname}
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

                      <td className={`${classes} flex justify-center`}>
                        <div className="w-fit   relative  gap-2">
                          {!issubadmin && (
                            <Switch
                              crossOrigin={undefined}
                              placeholder=""
                              onPointerEnterCapture={() => {}}
                              onPointerLeaveCapture={() => {}}
                              onChange={(e: any) =>
                                handleRiderStatusChanged(e, _id)
                              }
                              checked={isActive == true ? true : false}
                              className="bg-red-600  absolute left-0"
                              color="green"
                              defaultChecked
                            />
                          )}
                          <Chip
                            variant="ghost"
                            size="sm"
                            className="w-fit px-4 mx-auto"
                            value={isActive == true ? "Active" : "Blocked"}
                            color={isActive == true ? "green" : "red"}
                          />
                        </div>
                      </td>
                      <td className={`${classes} `}>
                        <Chip
                          className="w-fit mx-auto"
                          variant="ghost"
                          color={isWorking ? "green" : "red"}
                          size="sm"
                          value={isWorking ? "Online" : "Offline"}
                          icon={
                            <span
                              className={`mx-auto mt-1 block h-2 w-2 rounded-full  ${
                                isWorking ? "bg-green-900" : "bg-red-900"
                              } content-['']`}
                            />
                          }
                        />
                      </td>
                      {issubadmin == true ? (
                        ""
                      ) : (
                        <td className={classes}>
                          <div className=" ">
                            {/* <Tooltip content="Block Rider">
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
                            <Tooltip content="Unblock Rider">
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
                            </Tooltip> */}

                            <Tooltip content="Delete Rider">
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
      {isLoading1 && <Loader />}
      {isLoading2 && <Loader />}
    </Card>
  );
};

export default index;
