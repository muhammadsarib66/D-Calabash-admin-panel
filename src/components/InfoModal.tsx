/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "@material-tailwind/react";
import { Divider } from "@mui/material";
import { useDispatch } from "react-redux";
import { BlockCustomerApi } from "../feature/slicer/BlockCustomerSlicer";
import { UnBlockCustomerApi } from "../feature/slicer/UnBlockCustomerSlicer";
import { DelCustomerApi } from "../feature/slicer/DeleteCustomerSlicer";
import { DisableProductApi } from "../feature/slicer/DisableProductSlicer";
import { EnableProductApi } from "../feature/slicer/EnableProductSlicer";
import { baseUrl } from "../feature/slicer/Slicer";
import { OrderStatusApi } from "../feature/slicer/OrderStatusSlicer";

// //////// admin ...........

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
  const dispatch = useDispatch();
  //////////////
  const handleDeleteUser = () => {
    const Obj = { customerId: item };
    dispatch(DelCustomerApi(Obj));
    closeModal();
  };

  // Block User
  const handleBlockUser = () => {
    const Obj = { customerId: item };
    dispatch(BlockCustomerApi(Obj));
    console.log(Obj);
    closeModal();
  };
  // unbBlock User
  const handleUnBlockUser = () => {
    const Obj = { customerId: item };
    dispatch(UnBlockCustomerApi(Obj));
    console.log(Obj);
    closeModal();
  };
  const handleEnablePrdct = () => {
    const Obj = { productId: item };
    dispatch(EnableProductApi(Obj));
    console.log(Obj);
    closeModal();
  };
  const handleDisablePrdct = () => {
    const Obj = { productId: item };
    dispatch(DisableProductApi(Obj));
    console.log(Obj);
    closeModal();
  };

  const handleClose = () => {
    closeModal();
  };
  ////////////// Order Status /////
  const handleConfirmOrder = ()=>{
    const Obj = {id: item?._id, status : 'Confirmed'}
    dispatch(OrderStatusApi(Obj))
    closeModal();

  }
  const handleShipOrder = ()=>{
    const Obj = {id: item?._id, status : 'Shipped'}
    dispatch(OrderStatusApi(Obj))
    closeModal();

  }

  return (
    <Modal
      open={ActionModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      {(title === "OrderInfo") && (
          <div className="h-[70vh] overflow-y-scroll ">
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
                  <span className="font-bold text-gray-800"> Order ID :</span>{" "}
                  {item?.Order_ID}
                </p>
                <p>
                  <span className="font-bold text-gray-800">
                    {" "}
                    Order Status :
                  </span>{" "}
                  {item?.Status}
                </p>
                <p>
                  <span className="font-bold text-gray-800"> Order Info :</span>{" "}
                  {item?.Info}
                </p>
              </div>
              <div className="bg-gray-100  border p-2">
                <p>
                  <span className="font-bold text-gray-800">
                    {" "}
                    Customer Name :
                  </span>{" "}
                  {item?.address?.ClientName}
                </p>
                <p>
                  <span className="font-bold text-gray-800">
                    {" "}
                    Customer Emai :
                  </span>{" "}
                  {item?.Client?.email}
                </p>
                <p>
                  <span className="font-bold text-gray-800">
                    {" "}
                    Customer Phone:
                  </span>{" "}
                  {item?.Client?.Phone}
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
                          src={baseUrl+product?.product?.imageUrl}
                          alt={product.itemName}
                          className="shadow-lg object-cover object-center rounded-full  w-20 h-20"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>) ||
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
          ))}
      </Box>
    </Modal>
  );
};

export default InfoModal;
