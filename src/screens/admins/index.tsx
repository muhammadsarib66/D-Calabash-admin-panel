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
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import InfoModal from "../../components/InfoModal";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteAdminApi } from "../../feature/slicer/DeleteAdminSlicer";

const OrderStatusTABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Super_Admin",
    value: false,
  },
  {
    label: "Sub_Admin",
    value: true,
  },
];

const TableHeadings = ["Name", "Email", "Status", "Action"];

const index = () => {
  const dispatch = useDispatch();
  const { isLoading, admins } = useSelector(
    (state: any) => state.GetAdminListingSlicer
  );
  const [filterData, setFilterData] = useState<any>([]);
  const [statusTab, setStatusTab] = useState<any>("all");
  const [search, setSearch] = useState<any>("");
  const [infoModal, setInfoModal] = useState<any>(false);
  const [titleModal, setTitleModal] = useState<any>("");

  const closeModal = () => {
    setInfoModal(false);
  };

  const handleAddAdmin = () => {
    setTitleModal("addadmin");
    setInfoModal(true);
  };
  const HandleDeletrAdmin = (id: any) => {
    dispatch(DeleteAdminApi({ adminId: id }));
  };
  useEffect(() => {
    if (search.length > 0) {
      const filteredData = admins?.filter((data: any) => {
        return data?.fullname?.toLowerCase().includes(search?.toLowerCase());
      });
      setFilterData(filteredData);
    } else {
      // If search is cleared, reset filterData based on statusTab
      const filteredData = admins?.filter((data: any) => {
        if (statusTab == "all") {
          return true;
        } else {
          return data?.issubadmin == statusTab;
        }
      });
      setFilterData(filteredData);
    }
  }, [search, admins, statusTab]);
  return (
    <Card
      className=" w-full"
      placeholder=""
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
    >
      {isLoading && <Loader />}
      <Header
        heading={"Admin List"}
        headingDetail="See information about Admin"
        statusTabs={OrderStatusTABS}
        setStatusTab={setStatusTab}
        setSearch={setSearch}
        BtnTitle="Add Admin"
        handleAddBtn={handleAddAdmin}
      />

      <CardBody
        placeholder=""
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
        className=" h-[70vh]  overflow-scroll px-0"
      >
        <table className="mt-4 w-full min-w-max table-auto text-center mx-auto  ">
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
              ({ issubadmin, fullname, email, _id }: any, index: any) => {
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
                        <Chip
                          variant="ghost"
                          size="sm"
                          className="w-fit px-4 mx-auto"
                          value={
                            issubadmin == true ? "sub admin" : "super admin"
                          }
                          color={issubadmin == true ? "blue" : "green"}
                        />
                      </td>
                      <td className={classes}>
                        <Tooltip content="Delete User">
                          <IconButton
                            onClick={() => HandleDeletrAdmin(_id)}
                            placeholder=""
                            onPointerEnterCapture={() => {}}
                            onPointerLeaveCapture={() => {}}
                            variant="text"
                          >
                            <DeleteIcon className=" text-red-500" />
                          </IconButton>
                        </Tooltip>
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
          />
        )}
      </CardBody>
    </Card>
  );
};

export default index;
