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
  Switch,
  Typography,
} from "@material-tailwind/react";
import Header from "../../components/CardHeader";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import InfoModal from "../../components/InfoModal";
import { baseUrl, issubadmin } from "../../feature/slicer/Slicer";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import ProductInfoModal from "../../components/ProductInfoModal";
import { EnableProductApi } from "../../feature/slicer/EnableProductSlicer";
import { DisableProductApi } from "../../feature/slicer/DisableProductSlicer";

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
  "Ingredients",
  `${issubadmin ? "View Choices" : "Add Choice"}`,
  "Action",
];
const filteredHeadings = issubadmin
  ? TableHeadings.filter(
      (heading) => heading !== "Action" && heading !== "Change Status"
    )
  : TableHeadings;

const index = () => {
  const { isLoading, Products } = useSelector(
    (state: any) => state.GetProductListSlicer
  );
  const dispatch = useDispatch();
  const [filterData, setFilterData] = useState<any>([]);
  const [statusTab, setStatusTab] = useState<any>("all");
  const [search, setSearch] = useState<any>("");
  const [infoModal, setInfoModal] = useState<any>(false);
  const [titleModal, setTitleModal] = useState<any>("");
  const [item, setItem] = useState<any>("");
  const [isProductDetailOpen, setIsProductOpen] = useState<any>(false);
  const closeModal = () => {
    setInfoModal(false);
  };
  const productInfoModal = (item: any) => {
    setItem(item);
    setIsProductOpen(true);
  };
  const CloseproductInfoModal = () => {
    setIsProductOpen(false);
  };
  
  const handleItemStatusChanged = (e: any, id: any) => {
    if (e.target.checked == false) {
      const Obj = { productId: id };
      dispatch(DisableProductApi(Obj));
    } else if (e.target.checked == true) {
      const Obj = { productId: id };
      dispatch(EnableProductApi(Obj));
    }
  };
  
  const HandleDeletePrdct = (id: any) => {
    setTitleModal("deleteproduct");
    setInfoModal(true);
    setItem(id);
  };
  const handleAddProduct = () => {
    setTitleModal("addproduct");
    setInfoModal(true);
  };
  const handleEditProduct = (item:any,image:any,id:any) =>{
    // console.log(filterData[0],'==>product')
    // console.log(item)

    setTitleModal("editProduct");
    setItem({item,image,id});
    setInfoModal(true);
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
      filteredData.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

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
                  category,
                  name,
                  price,
                  imageUrl,
                  ingredients,
                  available,
                  _id,
                  description,
                  choices,
                }: any,
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

                      <td className={`${classes}  flex justify-center   `}>
                        <div className="w-fit  relative  gap-2">
                          <Switch
                           crossOrigin={undefined}
                           placeholder=""
                           onPointerEnterCapture={() => {}}
                           onPointerLeaveCapture={() => {}}
                            onChange={(e) => handleItemStatusChanged(e, _id)}
                            checked={available == true ? true : false}
                            className="bg-red-600  absolute left-0"
                            color="green"
                            defaultChecked
                          />

                          <Chip
                            variant="ghost"
                            size="sm"
                            className="w-fit px-4 mx-auto"
                            value={
                              available == true ? "Available" : "Not Available"
                            }
                            color={available == true ? "green" : "red"}
                          />
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
                      <td className={classes}>
                        <ul className=" flex flex-col gap-2">
                          {ingredients?.map((ing: any) => (
                            <li>
                              <Chip
                                variant="ghost"
                                className="w-fit px-4 mx-auto"
                                value={ing}
                                color="blue"
                              />
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className={`${classes}`}>
                        <i
                          onClick={() =>
                            productInfoModal({
                              category,
                              name,
                              price,
                              imageUrl,
                              ingredients,
                              available,
                              _id,
                              description,
                              choices,
                            })
                          }
                          className=" cursor-pointer fa-solid fa-circle-info"
                        ></i>
                      </td>
                      {!issubadmin ? (
                        <>
                          <td className={classes}>
                            <Tooltip  content="Edit Product">
                              <IconButton
                                onClick={() => handleEditProduct({
                                  name,
                                  price,
                                  description,
                                category:category?._id  },imageUrl, _id)}
                                placeholder=""
                                onPointerEnterCapture={() => {}}
                                onPointerLeaveCapture={() => {}}
                                variant="text"
                              >
                                <EditIcon className=" text-blue-500" />
                              </IconButton>
                            </Tooltip>
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
                        </>
                      ) : (
                        ""
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
        <ProductInfoModal
          item={item}
          Open={isProductDetailOpen}
          closeModal={CloseproductInfoModal}
        />
      </CardBody>
      {isLoading && <Loader />}
    </Card>
  );
};

export default index;
