/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
};

const InfoModal = ({ item, infoModal, closeModal, title }: any) => {
  console.log(item);
  const handleClose = () => {
    closeModal();
  };
  return (
    <Modal
      open={infoModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {(title === "order-details" && (
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
                  {item?.Client?.ClientName}
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
                {item?.items?.map((product: any) => (
                  <div className="bg-blue-50  border p-2">
                    <p className="text-center text-xl font-semibold uppercase">
                      {" "}
                      {product.itemName}
                    </p>
                    <div className="flex justify-between">
                      <div>
                        <p>Price: {product.price}</p>
                        <p>Quantity: {product.quantity}</p>
                      </div>
                      <div className="">
                        <img
                          src={product.image}
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
          (title === "product-details" && (
            <div>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Product Details
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <p>Product Name: {item.name}</p>
                <p>Product Price: {item.price}</p>
                <p>Product Description: {item.description}</p>
              </Typography>
            </div>
          )) ||
          (title === "clients" && <div>hello clients</div>)}
      </Box>
    </Modal>
  );
};

export default InfoModal;
