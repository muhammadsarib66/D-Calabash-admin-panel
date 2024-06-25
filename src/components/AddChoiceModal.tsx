import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Checkbox, Input } from "@material-tailwind/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AddProductChoicesApi } from "../feature/slicer/AddProductChoicesSlicer";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
};

const AddChoiceModal = ({ item, choiceModalOpen, choiceModalClose }: any) => {
  console.log(item,'===>')
  const dispatch = useDispatch()
  const [choice, setChoice] = useState<any>({
    productId: item?._id,
    choice: {
      name:  "",
      options: [
      ],
      isRequired: false,
      isMultiSelect: false,
    },
  });
  const [choicesOption, setChoicesOption] = useState({
    name: "",
    price: "",
  });
  const handleClose = () => {
    setChoice({
      productId: "",
      choice: {
        name: "",
        options: [],
        isRequired: false,
        isMultiSelect: false,
      },
    });
    setChoicesOption({
      name: "",
      price: "",
    });
    choiceModalClose();
  };

  const handleFieldChange = (e: any) => {
    // console.log(e.target.value)
    setChoicesOption( { ...choicesOption , [e.target.name]: e.target.value });
    setChoice((prevChoice: any) => ({
      ...prevChoice, productId : item?._id}));
  };
  // Handler to update name or price in a choice
  const handleAddChoice = () => {
    console.log(choicesOption);
    if (choicesOption.name === "" || choicesOption.price === "") {
      toast.error("Please add choices");
      setChoicesOption({
        name: "",
        price: "",
      });

      return;
    }

    if (choicesOption.name && choicesOption.price) {
      setChoice((prevChoice: any) => ({
        ...prevChoice,
        choice: {
          ...prevChoice.choice,
          options: [
            ...prevChoice.choice.options,
            { name: choicesOption.name, price: choicesOption.price },
          ],
        },
      }));

      setChoicesOption({
        name: "",
        price: "",
      });
    }
  };
  const handleRemoveChoice = (name: any) => {
    const updatedChoices = choice?.choice?.options?.filter(
      (choice: any) => choice.name !== name
    );
    setChoice((prev: any) => {
      return {
        ...prev,
        choice: {
          ...prev.choice,
          options: updatedChoices,
        },
      };
    });
  };

  const handleAddChoices = () => {
    if (choice?.productId === "" || choice.choice.name === "" || choice.choice.options.length === 0) {
      toast.error("Please fill all fields");
      return;
    }
    
    // console.log(choice);
dispatch(AddProductChoicesApi(choice))
    handleClose();
  };

  return (
    <div>
      <Modal
        open={choiceModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              {" "}
              Add Choice
            </h1>
            <div>
              <Input
                crossOrigin={""}
                placeholder=""
                // name="name"
                value={choice?.choice?.name}
                onChange={(e) =>
                  setChoice({
                    ...choice,
                    choice: { ...choice.choice, name: e.target.value },
                  })
                }
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
                label="Choice Name"
              />
              <div className="flex justify-around">
                <Checkbox
                  checked={choice?.choice?.isRequired}
                  onChange={(e: any) => setChoice({
                    ...choice,
                    choice: {
                      ...choice.choice,
                      isRequired: e.target.checked,
                    },
                  })}
                  label={<Typography
                    variant="inherit"
                    color="gray"
                    className="flex items-center font-normal"
                  >
                    is Rquired
                  </Typography>}
                  containerProps={{ className: "-ml-2.5" }} crossOrigin={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                />
                <Checkbox
                  checked={choice?.choice?.isMultiSelect}
                  onChange={(e: any) => setChoice({
                    ...choice,
                    choice: {
                      ...choice.choice,
                      isMultiSelect: e.target.checked,
                    },
                  })}
                  label={<Typography
                    variant="inherit"
                    color="gray"
                    className="flex items-center font-normal"
                  >
                    is Multi Select
                  </Typography>}
                  containerProps={{ className: "-ml-2.5" }} crossOrigin={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                />
              </div>

              <div className="flex my-3 justify-between">
                <p className="font-semibold "> Add Options </p>
                <i
                  onClick={handleAddChoice}
                  className=" cursor-pointer fa-solid fa-plus"
                ></i>
              </div>

              <div className="h-[30vh] w-full flex flex-col gap-4 items-center  overflow-auto">
                <div className="flex items-center gap-2 justify-between w-full ">
                  <input
                    className="w-[60%] bg-gray-100 rounded-md outline-none p-2 "
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={choicesOption.name}
                    onChange={handleFieldChange}
                    style={{ marginRight: "10px" }}
                  />
                  <input
                    className="w-[20%] bg-gray-100 rounded-md outline-none p-2"
                    type="number"
                    placeholder="Price"
                    name="price"
                    value={choicesOption.price}
                    onChange={handleFieldChange}
                    style={{ marginRight: "10px" }}
                  />
                </div>
                {choice?.choice?.options.length> 0  && choice?.choice?.options.map((option: any, ind: any) => (
                  <div
                    className="  border-b-2 flex items-center gap-2 justify-between w-full"
                    key={option.name}
                  >
                    <p>
                      {" "}
                      <span className="mr-1 font-bold">{ind +1} </span>{" "}
                      {option.name}
                    </p>
                    <p>$ {option.price}</p>
                    <i
                      onClick={() => handleRemoveChoice(option.name)}
                      className=" w-[20%]  text-red-500 fa-solid fa-trash"
                    ></i>
                  </div>
                ))}
              </div>
              <Button color="blue" onClick={handleAddChoices}  placeholder={''} onPointerEnterCapture={""} onPointerLeaveCapture={''}>
                Add Choice
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default AddChoiceModal;
