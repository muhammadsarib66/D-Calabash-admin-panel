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
import DeleteIcon from "@mui/icons-material/Delete";
import { issubadmin } from "../../feature/slicer/Slicer";

const OrderStatusTABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Available",
    value: true,
  },
  {
    label: "Disabled",
    value: false,
  },
];

const TableHeadings = ["Category Title ", "Status", "Action"];

const filteredHeadings = issubadmin
  ? TableHeadings.filter((heading) => heading !== "Action")
  : TableHeadings;
const ProductCategory = () => {
  const { isLoading, Categories } = useSelector(
    (state: any) => state.GetCategoriesSlicer
  );
  const [filterData, setFilterData] = useState<any>([]);
  const [statusTab, setStatusTab] = useState<any>("all");
  const [search, setSearch] = useState<any>("");
  const [infoModal, setInfoModal] = useState<any>(false);
  const [titleModal, setTitleModal] = useState<any>("");
  const [item, setItem] = useState<any>("");

  const closeModal = () => {
    setInfoModal(false);
  };

  const handleAddCat = () => {
    setTitleModal("add category");
    setInfoModal(true);
  };
  const HandleDeletrCategory = (id: any) => {
    setItem(id);
    setTitleModal("deletecategory");
    setInfoModal(true);
  };
  useEffect(() => {
    if (search.length > 0) {
      const filteredData = Categories?.filter((data: any) => {
        return data.title.toLowerCase().includes(search.toLowerCase());
      });
      setFilterData(filteredData);
    } else {
      // If search is cleared, reset filterData based on statusTab
      const filteredData = Categories?.filter((data: any) => {
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
  }, [search, Categories, statusTab]);
  return (
    <Card
      className=" w-full"
      placeholder=""
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
    >
      <Header
        heading={"Product Categories List"}
        headingDetail="See information about  Products Categories"
        statusTabs={OrderStatusTABS}
        setStatusTab={setStatusTab}
        setSearch={setSearch}
        handleAddBtn={handleAddCat}
        BtnTitle="Add Category"
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
                    {issubadmin == true
                      ? head == "Action"
                        ? null
                        : head
                      : head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {filterData?.map(({ title, isActive, _id }: any, index: any) => {
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
                        {title}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Chip
                        variant="ghost"
                        size="sm"
                        className="w-fit px-4 mx-auto"
                        value={isActive == true ? "Available" : "Not Available"}
                        color={isActive == true ? "green" : "red"}
                      />
                    </td>
                    {issubadmin == true ? (
                      ""
                    ) : (
                      <td className={classes}>
                        <Tooltip content="Delete Category">
                          <IconButton
                            onClick={() => HandleDeletrCategory(_id)}
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
            })}
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

export default ProductCategory;
