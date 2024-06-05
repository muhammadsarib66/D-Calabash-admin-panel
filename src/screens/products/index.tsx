/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import InfoModal from "../../components/InfoModal";
import { baseUrl } from "../../feature/slicer/Slicer";
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from "@mui/icons-material/Delete";


const OrderStatusTABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Available",
    value: "true",
  },
  {
    label: "Disabled",
    value: "false",
  },
];

const TableHeadings = [
  "Product ",
  "Product Name",
  "Price",
  "Status",
  "Category",
  "Category Status",
  "Product Info",
  "Change Status",
  "Action",
];

const index = () => {
  const { isLoading, Products } = useSelector(
    (state: any) => state.GetProductListSlicer
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
  const HandleEnablePrdct = (id: any) => {
    setTitleModal("enableproduct");
    setInfoModal(true);
    setItem(id);
  };
  const HandleDisabkePrdct = (id: any) => {
    
    setTitleModal("disableproduct");
    setInfoModal(true);
    setItem(id);
  };
  const HandleDeletePrdct = (id: any) => {
    
    setTitleModal("deleteproduct");
    setInfoModal(true);
    setItem(id);
  };
  const handleAddProduct = () => {
    setTitleModal("addproduct");
    setInfoModal(true);
    console.log('added')
  }
  const handleShowPrdctInfo = () =>{

  }
 
  useEffect(() => {
    const filteredData = Products?.filter((data: any) => {
      if (statusTab === "all") {
        return true;
      } else {
        return data.available.toString() === statusTab;
      }
    });
    setFilterData(filteredData);
  }, [statusTab, Products]);

  // Effect for filtering by search
  useEffect(() => {
    if (search.length > 0) {
      const filteredData = Products?.filter((data: any) => {
        return data.name.toLowerCase().includes(search.toLowerCase());
      });
      setFilterData(filteredData);
    } else {
      // If search is cleared, reset filterData based on statusTab
      const filteredData = Products?.filter((data: any) => {
        if (statusTab === "all") {
          return true;
        } else {
          return data.available.toString() === statusTab;
        }
      });
      setFilterData(filteredData);
    }
  }, [search, Products, statusTab]);
  return (
    <Card
      className=" w-full"
      placeholder=""
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
    >
      <Header
        heading={"Products List"}
        headingDetail="See information about  Products"
        statusTabs={OrderStatusTABS}
        setStatusTab={setStatusTab}
        setSearch={setSearch}
        handleAddBtn={handleAddProduct}
        BtnTitle="Add Product"
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
              (
                { category, name, price, imageUrl, available, _id }: any,
                index: any
              ) => {
                const isLast = index === filterData?.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <>
                    <tr className="text-center" key={_id}>
                      <td className="p-2">
                        <img
                          src={baseUrl + imageUrl}
                          alt="product"
                          className="active:scale-150 duration-300 transition ease-in-out w-16 h-16"
                        />
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
                          {name}
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
                          {price}$
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Chip
                          variant="ghost"
                          size="sm"
                          className="w-fit px-4 mx-auto"
                          value={
                            available == true ? "Available" : "Not Available"
                          }
                          color={available == true ? "green" : "red"}
                        />
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
                          {category?.title}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Chip
                          variant="ghost"
                          size="sm"
                          className="w-fit px-4 mx-auto"
                          value={
                            category?.isActive == true ? "Active" : "Disble"
                          }
                          color={category?.isActive == true ? "green" : "red"}
                        />
                      </td>
                      <td>
                      <Tooltip content="Product Detail">
                            <IconButton
                              // disabled={isActive == false ? true : false}
                              onClick={() => handleShowPrdctInfo()}
                              placeholder=""
                              onPointerEnterCapture={() => {}}
                              onPointerLeaveCapture={() => {}}
                              variant="text"
                            >
                              <InfoIcon className=" text-gray-700" />
                            </IconButton>
                          </Tooltip>
                        </td>
                      <td className={`${classes} flex gap-2`}>
                        <Button
                          placeholder=""
                          disabled={available == true ? true : false}

                          onPointerEnterCapture={() => {}}
                          onPointerLeaveCapture={() => {}}
                          size="sm"
                          color="green"
                          onClick={() => HandleEnablePrdct(_id)}
                         
                        >
                          Enable
                        </Button>
                        <Button
                          placeholder=""
                          disabled={!available == true ? true : false}
                          onPointerEnterCapture={() => {}}
                          onPointerLeaveCapture={() => {}}
                          size="sm"
                          color="red"
                          onClick={() => HandleDisabkePrdct(_id)}

                        >
                          Disable
                        </Button>
                      </td>
                      <td className={classes}>
                      <Tooltip content="Delete Product">
                          <IconButton
                            onClick={() => HandleDeletePrdct(_id)}
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
            item={item}
          />
        )}
      </CardBody>
      {isLoading && <Loader />}
    </Card>
  );
};

export default index;
