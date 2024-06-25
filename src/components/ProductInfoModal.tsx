import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { baseUrl } from "../feature/slicer/Slicer";
import {
  Card,
  CardHeader,
  CardBody,
  Typography, 
  Chip,
} from "@material-tailwind/react";

import { useState } from "react";
import AddChoiceModal from "./AddChoiceModal";
import UpdateChoiceModal from "./UpdateChoiceModal";
import { useDispatch } from "react-redux";
import { DeleteProductChoicesApi } from "../feature/slicer/DeleteProductChoicesSlicer";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  borderRadius: "10px",
};

const ProductInfoModal = ({ item, Open, closeModal }: any) => {
  const dispatch = useDispatch();
  const [choiceModalOpen, setChoiceModalOpen] = useState<any>(false);
  const [updateChoiceModalOpen, setUpdateChoiceModalOpen] =
    useState<any>(false);
  const [product, setProduct] = useState<any>("");
  const [updateChoice, setUpdateChoice] = useState<any>("");

  const HandlechoiceModalOpen = () => {
    setChoiceModalOpen(true);
    setProduct(item);
    closeModal();
  };
  const HandleUpdatechoiceModalOpen = (choice:any) => {
    
    setUpdateChoiceModalOpen(true);

    setUpdateChoice({productId:item?._id,choice});
    closeModal();
  };
  const choiceModalClose = () => {
    setChoiceModalOpen(false);
    setUpdateChoiceModalOpen(false);
  };
  const handleDeleteChoice = (id: any) => {
    const Obj = {
      productId: item?._id,
      choiceId: id,
    };
    dispatch(DeleteProductChoicesApi(Obj));
    closeModal();
  };
  const handleClose = () => {
    closeModal();
  };
  return (
    <>
      <Modal
        open={Open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card
            className="w-full  max-h-[80vh]  flex-row"
            placeholder={""}
            onPointerEnterCapture={""}
            onPointerLeaveCapture={""}
          >
            <CardHeader
              placeholder={""}
              onPointerEnterCapture={""}
              onPointerLeaveCapture={""}
              shadow={false}
              floated={false}
              className="m-0 w-2/5 shrink-0 rounded-r-none"
            >
              <img
                src={baseUrl + item?.imageUrl}
                alt={item?.name}
                className="h-full w-full object-cover"
              />
            </CardHeader>
            <CardBody
            className="w-full"
              placeholder={""}
              onPointerEnterCapture={""}
              onPointerLeaveCapture={""}
            >
              <div className="flex justify-between w-full item-center ">

              <Typography
                placeholder={""}
                onPointerEnterCapture={""}
                onPointerLeaveCapture={""}
                variant="h4"
                color="gray"
                className="mb-4 uppercase"
              >
                {item?.name}
              </Typography>
                <span className="text-md lowercase font-bold text-blue-500 pl-4">
                 ${item?.price}
                </span>
              </div>

              <div className="flex gap-2">
                {item?.ingredients?.map((ing: any, ind: any) => (
                  <Chip
                    key={ind}
                    variant="ghost"
                    className="w-fit px-4 "
                    value={ing}
                    color="blue"
                  />
                ))}
              </div>
              <Typography
                placeholder={""}
                onPointerEnterCapture={""}
                onPointerLeaveCapture={""}
                color="gray"
                className="mb-8 font-normal"
              >
                {item?.description}
              </Typography>
              <div className="flex justify-between">
                <p className="text-lg font-bold">Choices</p>
                <span>
                  {" "}
                  <i
                    onClick={HandlechoiceModalOpen}
                    className="cursor-pointer text-2xl fa-solid fa-plus"
                  ></i>
                </span>
              </div>
              {item?.choices && item?.choices?.length > 0 && (
                <div className="max-h-[40vh] overflow-y-auto">
                  {item?.choices.map((choice: any, ind: any) => {
                    return (
                      <div key={ind} className="flex flex-col  gap-4">
                        <Card 
                        
                        placeholder={""}
                        onPointerEnterCapture={""}
                        onPointerLeaveCapture={""}className=" w-full shadow-md border-2">
                          <CardBody placeholder={""}
                onPointerEnterCapture={""}
                onPointerLeaveCapture={""}>
                  <div className="flex justify-between">

                            <Typography
                            placeholder={""}
                            onPointerEnterCapture={""}
                            onPointerLeaveCapture={""}
                              variant="h5"
                              color="blue-gray"
                              className="mb-2"
                            >
                              {choice?.name}
                            </Typography>
                            <div className="flex items-center gap-3 justify-center">
                              <i
                                onClick={()=>HandleUpdatechoiceModalOpen(choice)}
                                className="cursor-pointer fa-solid fa-pencil text-blue-500 "
                              ></i>
                              <i
                                onClick={() =>
                                  handleDeleteChoice(choice?._id)
                                }
                                className="cursor-pointer fa-solid fa-trash text-red-500"
                              ></i>
                            </div>
                            </div>
                            <p>
                              required :
                              <span className="font-bold">
                                {" "}
                                {choice?.isRequired ?  "✅" : "❌"}
                              </span>{" "}
                            </p>
                            <p>
                              multi select :
                              <span className="font-bold">
                                {" "}
                                {choice?.isMultiSelect ? "✅" : "❌"}
                              </span>{" "}
                            </p>
                            <div className="flex flex-col gap-2">

                            {choice?.options?.map((op: any, ind: any) => (
                              <div className="flex gap-2">
                                <Chip
                                  key={ind}
                                  variant="ghost"
                                  className="w-fit px-4 "
                                  value={op?.name}
                                  color="blue"
                                />
                                <Chip
                                  key={ind}
                                  variant="ghost"
                                  className="w-fit px-4 "
                                  value={"$" + op?.price}
                                  color="blue"
                                />
                              </div>
                            ))}
                            </div>

                          </CardBody>
                   
                        </Card>
                      </div>
                    );
                  })}
                </div>
              )}
            
            </CardBody>
          </Card>
        </Box>
      </Modal>
      <AddChoiceModal
        item={product}
        choiceModalOpen={choiceModalOpen}
        choiceModalClose={choiceModalClose}
      />
      <UpdateChoiceModal
        item={updateChoice}
        choiceModalOpen={updateChoiceModalOpen}
        choiceModalClose={choiceModalClose}
      />
    </>
  );
};

export default ProductInfoModal;
