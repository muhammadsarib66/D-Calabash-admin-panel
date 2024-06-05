/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  Button,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { BlockCustomerApi } from "../feature/slicer/BlockCustomerSlicer";
import { UnBlockCustomerApi } from "../feature/slicer/UnBlockCustomerSlicer";
import { DelCustomerApi } from "../feature/slicer/DeleteCustomerSlicer";
import { DisableProductApi } from "../feature/slicer/DisableProductSlicer";
import { EnableProductApi } from "../feature/slicer/EnableProductSlicer";
import { baseUrl } from "../feature/slicer/Slicer";
import { OrderStatusApi } from "../feature/slicer/OrderStatusSlicer";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { AddCategoryApi } from "../feature/slicer/AddCategorySlicer";
import uploadImg from "../Images/uploaImg.png";
import { WithContext as ReactTags } from "react-tag-input";
import { AddProductApi } from "../feature/slicer/AddProductSlicer";
import { BlockRiderApi } from "../feature/slicer/BlockRiderSlicer";
import { UnBlockRiderApi } from "../feature/slicer/UnBlockRiderSlicer";
import { DeleteRiderApi } from "../feature/slicer/DeleteRiderSlicer";
import { AddRiderApi } from "../feature/slicer/AddRiderSlicer";
import { DeleteCategoryApi } from "../feature/slicer/DeleteCategorySlicer";
import { DeleteOrderApi } from "../feature/slicer/DeleteOrderSlicer";
import { DeleteProductApi } from "../feature/slicer/DeleteProductSlicer";
import { AssingOrderApi } from "../feature/slicer/AssingOrderRiderSlicer";

// //////// admin ...........
const KeyCodes = {
  comma: 188,
  enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
};

const InfoModal = ({ ActionModal, closeModal, title, item }: any) => {
  const { Categories } = useSelector((state: any) => state.GetCategoriesSlicer);
  const { Riders } = useSelector((state: any) => state.GetRidersSlicer);
  const dispatch = useDispatch();
  const [category, setCategory] = useState<any>("");
  const [addproduct, setAddProduct] = useState<any>({
    pname: "",
    pprice: "",
    pdescription: "",
    available: "true",
    image: "",
  });
  const [selectedCategory, setSelectedCategory] = useState<any>("");
  const [selectedProfileImg, setSelectedProductImg] = useState("");

  const fileInputRefProfile = useRef<HTMLInputElement>(null);
  const [tags, setTags] = useState<any>([]);
  const [rider, setRider] = useState<any>({
    fullname: "",
    email: "",
    password: "",
  });
  const [riderId, setRiderId] = useState("");
  const [selectedRider, setSelectedRider] = useState("");

  const handleProfile = () => {
    if (fileInputRefProfile.current) {
      fileInputRefProfile.current.click();
    }
  };
  const handleFileChangeProfile = (event: any) => {
    const files: any = event.target.files;
    setSelectedProductImg(files[0]); // only want to select one file
    setAddProduct({ ...addproduct, image: files[0] });
  };
  const handleDelete = (i: any) => {
    setTags(tags.filter((tag: any, index: any) => index !== i));
  };
  const handleAddition = (tag: any) => {
    console.log(tag);
    setTags([...tags, tag]);
  };

  const handleChangeProduct = (e: any) => {
    setAddProduct({ ...addproduct, [e.target.name]: e.target.value });
  };

  const handleSelectCategory = (e: any) => {
    setSelectedCategory(e);
  };
  const handleAddProduct = () => {
    const ingradients = tags.map((tag: any) => tag.text);
    const Obj = {
      image: addproduct.image,
      name: addproduct.pname,
      description: addproduct.pdescription,
      price: addproduct.pprice,
      available: addproduct.available,
      ingradients: ingradients,
      category: selectedCategory,
    };
    if (
      addproduct.pname &&
      addproduct.pprice &&
      addproduct.pdescription &&
      selectedCategory &&
      ingradients &&
      addproduct.image
    ) {
      dispatch(AddProductApi(Obj));
      // handleClose()
    } else {
      toast.error("Please Fill All Fields");
    }
  };

  // DELETE USSR //////////
  const handleDeleteUser = () => {
    const Obj = { customerId: item };
    dispatch(DelCustomerApi(Obj));
    closeModal();
  };
  // DELETE Category //////////
  const handleDeleteCategory = () => {
    const Obj = { categoryId: item };

    dispatch(DeleteCategoryApi(Obj));
    closeModal();
  };

  // Block User
  const handleBlockUser = () => {
    const Obj = { customerId: item };
    dispatch(BlockCustomerApi(Obj));
    closeModal();
  };
  // unbBlock User
  const handleUnBlockUser = () => {
    const Obj = { customerId: item };
    dispatch(UnBlockCustomerApi(Obj));
    closeModal();
  };
  const handleEnablePrdct = () => {
    const Obj = { productId: item };
    dispatch(EnableProductApi(Obj));
    closeModal();
  };
  const handleDisablePrdct = () => {
    const Obj = { productId: item };
    dispatch(DisableProductApi(Obj));
    closeModal();
  };

  const handleClose = () => {
    closeModal();
  };
  ////////////// Order Status /////
  const handleConfirmOrder = () => {
    const Obj = { id: item?._id, status: "Confirmed" };
    dispatch(OrderStatusApi(Obj));
    closeModal();
  };
  const handleShipOrder = () => {
    const Obj = { id: item?._id, status: "Shipped" };
    dispatch(OrderStatusApi(Obj));
    closeModal();
  };
  /// Asign Rider
  const handleSelectRider = (id: any) => {
    setRiderId(id);
  };
  const HandleAsignOrder = () => {
    const Obj = {
      orderId: item,
      riderId,
    };
    if (selectedRider) {
      dispatch(AssingOrderApi(Obj));
      closeModal();
    } else {
      toast.error("Please Select Rider");
    }
  };

  /////////////////// Cacategory

  const handleAddCategory = () => {
    if (category.length > 1) {
      const Cat = { title: category };
      dispatch(AddCategoryApi(Cat));
      setCategory("");
      closeModal();
    } else {
      toast.error("Please Add Category Name");
    }
  };

  // DELETE Rider //////////
  const handleDeleteRider = () => {
    const Obj = { riderId: item };
    dispatch(DeleteRiderApi(Obj));
    closeModal();
  };
  // DELETE ORDER //////////
  const handleDeleteOrder = () => {
    const Obj = { orderId: item };
    dispatch(DeleteOrderApi(Obj));
    closeModal();
  };
  // DELETE Product //////////
  const handleDeleteProduct = () => {
    const Obj = { productId: item };
    dispatch(DeleteProductApi(Obj));
    closeModal();
  };

  // Block User
  const handleBlockRider = () => {
    const Obj = { riderId: item };
    dispatch(BlockRiderApi(Obj));

    closeModal();
  };
  // unbBlock User
  const handleUnBlockRider = () => {
    const Obj = { riderId: item };
    dispatch(UnBlockRiderApi(Obj));

    closeModal();
  };

  ///// Add Rider /////
  const handleChangeRider = (e: any) => {
    setRider({ ...rider, [e.target.name]: e.target.value });
  };

  const handleAddRider = () => {
    if (rider.fullname && rider.email && rider.password) {
      dispatch(AddRiderApi(rider));
      handleClose();
      setRider({
        fullname: "",
        email: "",
        password: "",
      });
    } else {
      toast.error("Please Fill All Fields");
    }
  };
  return (
    <Modal
      open={ActionModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {(title === "OrderInfo" && (
          <div className="h-[70vh]  overflow-y-scroll ">
            <div className="flex flex-col gap-4 p-5">
              <div className="flex w-full justify-between">
                <h2 className="text-2xl  font-semibold"> Order Detail</h2>
                <i
                  className="fas text-2xl fa-times cursor-pointer"
                  onClick={handleClose}
                ></i>
              </div>

              <div className="bg-gray-100  border p-2">
                <p>
                  <span className="font-bold text-gray-800">
                    {" "}
                    Customer Name :
                  </span>{" "}
                  {item?.user?.fullname}
                </p>
                <p>
                  <span className="font-bold text-gray-800">
                    {" "}
                    Customer Emai :
                  </span>{" "}
                  {item?.user?.email}
                </p>
                <p>
                  <span className="font-bold text-gray-800">
                    {" "}
                    Customer Phone:
                  </span>{" "}
                  {item?.Client?.Phone}
                </p>
              </div>
              <div className="bg-gray-100  border p-2">
                <p>
                  <span className="font-bold text-gray-800"> Address :</span>{" "}
                  {item?.address?.addressLine}
                </p>
                <p>
                  <span className="font-bold text-gray-800">
                    {" "}
                    Address Title :
                  </span>{" "}
                  {item?.address?.addressTitle}
                </p>
                <p>
                  <span className="font-bold text-gray-800"> City :</span>{" "}
                  {item?.address?.city}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {item?.products?.map((product: any) => (
                  <div className="bg-blue-50  border p-2">
                    <p className="text-center text-xl font-semibold uppercase">
                      {" "}
                      {product?.product?.name}
                    </p>
                    <div className="flex justify-between">
                      <div>
                        <p>Price: {product.price}</p>
                        <p>Quantity: {product.quantity}</p>
                      </div>
                      <div className="">
                        <img
                          src={baseUrl + product?.product?.imageUrl}
                          alt={product.itemName}
                          className="shadow-lg object-cover object-center rounded-full  w-20 h-20"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )) ||
          (title === "OrderStatus" && (
            <div className="p-6 flex flex-col gap-4 justify-between h-[30vh]">
              <h1 className="font-semibold text-xl">
                {" "}
                Please Change The Delivery Status?
              </h1>
              <div>
                <Divider />
                <div className="pt-6 flex gap-4 justify-end">
                  <Button
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    color="blue"
                    onClick={handleConfirmOrder}
                  >
                    Confirm
                  </Button>
                  <Button
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    color="green"
                    onClick={handleShipOrder}
                  >
                    Shipped
                  </Button>
                </div>
              </div>
            </div>
          )) ||
          (title === "Orderassign" && (
            <div className=" min-h-fit  p-6">
              <div className="flex justify-between  w-full ">
                <h1 className="text-gray-800 capitalize pb-6 text-xl font-semibold">
                  Assign Order to Active Riders
                </h1>
                <i
                  className="fas fa-times text-2xl cursor-pointer"
                  onClick={handleClose}
                ></i>
              </div>
              <div className=" flex flex-col gap-4 w-full">
                <div className="relative z-50">
                  <Select
                    className="absolute top-0 z-40"
                    placeholder={""}
                    value={selectedRider}
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    label="Select Rider"
                  >
                    {Riders.map((rid: any) => (
                      <Option
                        onClick={() => {
                          handleSelectRider(rid?._id);
                          setSelectedRider(rid.fullname);
                        }}
                        value={rid.fullname}
                      >
                        {rid.fullname}
                      </Option>
                    ))}
                  </Select>
                </div>

                <Button
                  className="w-full"
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                  color="blue-gray"
                  onClick={HandleAsignOrder}
                >
                  Assign to Rider
                </Button>
              </div>
            </div>
          )) ||
          (title === "blockcustomer" && (
            <div className="p-6 flex flex-col gap-4 justify-between h-[30vh]">
              <h1 className="font-semibold text-xl">
                {" "}
                Do you Want to Block the Customer?
              </h1>
              <div>
                <Divider />
                <div className="pt-6 flex gap-4 justify-end">
                  <Button
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    color="red"
                    onClick={handleClose}
                  >
                    No
                  </Button>
                  <Button
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    color="green"
                    onClick={handleBlockUser}
                  >
                    Yes
                  </Button>
                </div>
              </div>
            </div>
          )) ||
          (title === "unblockcustomer" && (
            <div className="p-6 flex flex-col gap-4 justify-between h-[30vh]">
              <h1 className="font-semibold text-xl">
                {" "}
                Do you Want to Unblock the Customer?
              </h1>
              <div>
                <Divider />
                <div className="pt-6 flex gap-4 justify-end">
                  <Button
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    color="red"
                    onClick={handleClose}
                  >
                    No
                  </Button>
                  <Button
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    color="green"
                    onClick={handleUnBlockUser}
                  >
                    Yes
                  </Button>
                </div>
              </div>
            </div>
          )) ||
          (title === "delcustomer" && (
            <div className="p-6 flex flex-col gap-4 justify-between h-[30vh]">
              <h1 className="font-semibold text-xl">
                {" "}
                Do you Want to Delete the Customer?
              </h1>
              <div>
                <Divider />
                <div className="pt-6 flex gap-4 justify-end">
                  <Button
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    color="red"
                    onClick={handleClose}
                  >
                    No
                  </Button>
                  <Button
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    color="green"
                    onClick={handleDeleteUser}
                  >
                    Yes
                  </Button>
                </div>
              </div>
            </div>
          )) ||
          (title === "deletecategory" && (
            <div className="p-6 flex flex-col gap-4 justify-between h-[30vh]">
              <h1 className="font-semibold text-xl">
                {" "}
                Do you Want to Delete the Product Category?
              </h1>
              <div>
                <Divider />
                <div className="pt-6 flex gap-4 justify-end">
                  <Button
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    color="red"
                    onClick={handleClose}
                  >
                    No
                  </Button>
                  <Button
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    color="green"
                    onClick={handleDeleteCategory}
                  >
                    Yes
                  </Button>
                </div>
              </div>
            </div>
          )) ||
          (title === "deleteorder" && (
            <div className="p-6 flex flex-col gap-4 justify-between h-[30vh]">
              <h1 className="font-semibold text-xl">
                {" "}
                Do you Want to Delete the Order?
              </h1>
              <div>
                <Divider />
                <div className="pt-6 flex gap-4 justify-end">
                  <Button
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    color="red"
                    onClick={handleClose}
                  >
                    No
                  </Button>
                  <Button
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    color="green"
                    onClick={handleDeleteOrder}
                  >
                    Yes
                  </Button>
                </div>
              </div>
            </div>
          )) ||
          (title === "deleteproduct" && (
            <div className="p-6 flex flex-col gap-4 justify-between h-[30vh]">
              <h1 className="font-semibold text-xl">
                {" "}
                Do you Want to Delete the Product?
              </h1>
              <div>
                <Divider />
                <div className="pt-6 flex gap-4 justify-end">
                  <Button
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    color="red"
                    onClick={handleClose}
                  >
                    No
                  </Button>
                  <Button
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    color="green"
                    onClick={handleDeleteProduct}
                  >
                    Yes
                  </Button>
                </div>
              </div>
            </div>
          )) ||
          (title === "enableproduct" && (
            <div className="p-6 flex flex-col gap-4 justify-between h-[30vh]">
              <h1 className="font-semibold text-xl">
                {" "}
                Do you Want to Enable the product?
              </h1>
              <div>
                <Divider />
                <div className="pt-6 flex gap-4 justify-end">
                  <Button
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    color="red"
                    onClick={handleClose}
                  >
                    No
                  </Button>
                  <Button
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    color="green"
                    onClick={handleEnablePrdct}
                  >
                    Yes
                  </Button>
                </div>
              </div>
            </div>
          )) ||
          (title === "disableproduct" && (
            <div className="p-6 flex flex-col gap-4 justify-between h-[30vh]">
              <h1 className="font-semibold text-xl">
                {" "}
                Do you Want to Disable the product?
              </h1>
              <div>
                <Divider />
                <div className="pt-6 flex gap-4 justify-end">
                  <Button
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    color="red"
                    onClick={handleClose}
                  >
                    No
                  </Button>
                  <Button
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    color="green"
                    onClick={handleDisablePrdct}
                  >
                    Yes
                  </Button>
                </div>
              </div>
            </div>
          )) ||
          (title === "add category" && (
            <div className="p-6">
              <div className="flex justify-between  w-full mb-10">
                <h1 className="text-gray-800 capitalize pb-6 text-2xl font-semibold">
                  Add Product Category
                </h1>
                <i
                  className="fas fa-times text-2xl cursor-pointer"
                  onClick={handleClose}
                ></i>
              </div>
              <div className=" flex flex-col gap-4 w-full">
                <Input
                  crossOrigin={""}
                  placeholder=""
                  name="Product Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                  label="Product Category"
                />

                <Button
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                  color="blue-gray"
                  onClick={handleAddCategory}
                >
                  Add Category
                </Button>
              </div>
            </div>
          )) ||
          (title === "addproduct" && (
            <div className=" h-[90vh] overflow-y-scroll p-6">
              <div className="flex justify-between  w-full ">
                <h1 className="text-gray-800 capitalize pb-6 text-2xl font-semibold">
                  Add Product
                </h1>
                <i
                  className="fas fa-times text-2xl cursor-pointer"
                  onClick={handleClose}
                ></i>
              </div>
              <div className=" flex flex-col gap-4 w-full">
                <div
                  onClick={handleProfile}
                  className="w-[150px] h-[150px] cursor-pointer  bg-gray-400 rounded-full mx-auto"
                >
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRefProfile}
                    onChange={handleFileChangeProfile}
                    className="hidden"
                  />
                  {selectedProfileImg ? (
                    <img
                      src={URL.createObjectURL(new Blob([selectedProfileImg]))}
                      className=" w-[150px] h-[150px] rounded-full object-cover     "
                    />
                  ) : (
                    <img
                      src={uploadImg}
                      className=" w-[150px] h-[150px] object-contain     "
                    />
                  )}
                </div>
                <p className="text-center font-semibold text-gray-800">
                  {" "}
                  Add Product Image
                </p>
                <Input
                  crossOrigin={""}
                  placeholder=""
                  name="pname"
                  value={addproduct.pname}
                  onChange={handleChangeProduct}
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                  label="Product Name"
                />
                <Input
                  type="number"
                  crossOrigin={""}
                  placeholder=""
                  name="pprice"
                  value={addproduct.pprice}
                  onChange={handleChangeProduct}
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                  label="Product Price"
                />
                <Textarea
                  name="pdescription"
                  value={addproduct.pdescription}
                  onChange={handleChangeProduct}
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                  label="Product Description"
                />
                <div className="flex w-full items-center ">
                  <div id="tags" className="w-[100%]">
                    <ReactTags
                      placeholder="Add Ingredents "
                      tags={tags}
                      delimiters={delimiters}
                      handleDelete={handleDelete}
                      handleAddition={handleAddition}
                      inputFieldPosition="bottom"
                      autocomplete
                      allowDragDrop={false}
                    />
                  </div>
                </div>
                {Categories && (
                  <Select
                    placeholder={""}
                    value={selectedCategory}
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    label="Select Category"
                  >
                    {Categories.map((cat: any) => (
                      <Option
                        onClick={() => handleSelectCategory(cat?._id)}
                        value={cat._id}
                      >
                        {cat.title}
                      </Option>
                    ))}
                  </Select>
                )}
                <Button
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                  color="blue-gray"
                  onClick={handleAddProduct}
                >
                  Add Products
                </Button>
              </div>
            </div>
          )) ||
          (title === "blockRider" && (
            <div className="p-6 flex flex-col gap-4 justify-between h-[30vh]">
              <h1 className="font-semibold text-xl">
                {" "}
                Do you Want to Block the Rider?
              </h1>
              <div>
                <Divider />
                <div className="pt-6 flex gap-4 justify-end">
                  <Button
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    color="red"
                    onClick={handleClose}
                  >
                    No
                  </Button>
                  <Button
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    color="green"
                    onClick={handleBlockRider}
                  >
                    Yes
                  </Button>
                </div>
              </div>
            </div>
          )) ||
          (title === "unblockRider" && (
            <div className="p-6 flex flex-col gap-4 justify-between h-[30vh]">
              <h1 className="font-semibold text-xl">
                {" "}
                Do you Want to Unblock the Rider?
              </h1>
              <div>
                <Divider />
                <div className="pt-6 flex gap-4 justify-end">
                  <Button
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    color="red"
                    onClick={handleClose}
                  >
                    No
                  </Button>
                  <Button
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    color="green"
                    onClick={handleUnBlockRider}
                  >
                    Yes
                  </Button>
                </div>
              </div>
            </div>
          )) ||
          (title === "delRider" && (
            <div className="p-6 flex flex-col gap-4 justify-between h-[30vh]">
              <h1 className="font-semibold text-xl">
                {" "}
                Do you Want to Delete the Rider?
              </h1>
              <div>
                <Divider />
                <div className="pt-6 flex gap-4 justify-end">
                  <Button
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    color="red"
                    onClick={handleClose}
                  >
                    No
                  </Button>
                  <Button
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    color="green"
                    onClick={handleDeleteRider}
                  >
                    Yes
                  </Button>
                </div>
              </div>
            </div>
          )) ||
          (title === "addRider" && (
            <div className="p-6">
              <div className="flex justify-between  w-full mb-10">
                <h1 className="text-gray-800 capitalize pb-6 text-2xl font-semibold">
                  Add Rider
                </h1>
                <i
                  className="fas fa-times text-2xl cursor-pointer"
                  onClick={handleClose}
                ></i>
              </div>
              <div className=" flex flex-col gap-4 w-full">
                <Input
                  crossOrigin={""}
                  placeholder=""
                  name="fullname"
                  value={rider.fullname}
                  onChange={handleChangeRider}
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                  label="Rider Full Name"
                />
                <Input
                  type="email"
                  crossOrigin={""}
                  placeholder=""
                  name="email"
                  value={rider.email}
                  onChange={handleChangeRider}
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                  label="Rider Email"
                />
                <Input
                  type="text"
                  crossOrigin={""}
                  placeholder=""
                  name="password"
                  value={rider.password}
                  onChange={handleChangeRider}
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                  label="Rider Password"
                />

                <Button
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                  color="blue-gray"
                  onClick={handleAddRider}
                >
                  Add Rider
                </Button>
              </div>
            </div>
          ))}
      </Box>
    </Modal>
  );
};

export default InfoModal;
