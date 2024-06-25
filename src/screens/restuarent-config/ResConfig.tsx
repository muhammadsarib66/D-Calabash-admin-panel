import { Button, Input, Switch, Textarea } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ResConfgApi } from "../../feature/slicer/ResConfSlicer";
import Loader from "../../components/Loader";

const ResConfig = () => {
  const { isLoading } = useSelector((state: any) => state.ResConfSlicer);
  const { Config } = useSelector((state: any) => state.GetResConfSlicer);
  const dispatch = useDispatch();
  
  const [settings, setSettings] = useState<any>({
    isOpen: Config?.isOpen,
    closureMessage: "",
    taxPercentage: "",
    deliveryCharges: "",
  });
  const handleChecked = (e: any) => {
    let isOpen = e.target.checked;
      setSettings((prev:any)=> ({ ...prev, isOpen }));
      dispatch(ResConfgApi({isOpen}));
  };
  const handleSaveSettings = () => {
    if (
      settings.closureMessage === "" ||
      settings.taxPercentage === "" ||
      settings.deliveryCharges === ""
    ) {
      toast.error("Please fill all the fields");
    } else  {
      dispatch(ResConfgApi(settings));
    }
  };
  useEffect(() => {
    if (Config) {
      setSettings({
        isOpen: Config?.isOpen,
        closureMessage: Config?.closureMessage,
        taxPercentage: Config?.taxPercentage,
        deliveryCharges: Config?.deliveryCharges,
      });
    }
  }, [Config]);
  return (
    <div className="bg-gray-50  w-full     h-screen  ">
      <h1 className="text-2xl text-center md:text-start md:text-3xl p-4 font-semibold ">
        {" "}
        Restaurant Configuration{" "}
      </h1>
      <div className="bg-gray-50  w-full flex flex-col justify-center items-center  p-14  pt-14 md:px-24 ">
        <div className="flex  w-full md:w-[60%] bg-white flex-col  shadow-lg p-6 rounded-lg gap-8">
          <div className="flex justify-between">
            <h1 className="font-bold text-lg md:text-xl">
              {" "}
              Restuarent Open Status{" "}
            </h1>
            <Switch
            checked={settings.isOpen}
              placeholder={""}
              onPointerEnterCapture={""}
              onPointerLeaveCapture={""}
              onChange={handleChecked}
              id="custom-switch-component"
              ripple={false}
              className="h-full w-full checked:bg-[#2ec946]"
              containerProps={{
                className: "w-11 h-6",
              }}
              circleProps={{
                className: "before:hidden left-0.5 border-none",
              }}
              crossOrigin={undefined}
            />
          </div>
          <div className="grid gric-cols-1  md:grid-cols-2  gap-8 md:gap-5">
            <Input
              placeholder={""}
              onPointerEnterCapture={""}
              onPointerLeaveCapture={""}
              value={settings?.taxPercentage}
              onChange={(e: any) =>
                setSettings({ ...settings, taxPercentage: e.target.value })
              }
              type="number"
              className="  h-14 shadow-lg font-semibold"
              label="Tax percentage in number"
              crossOrigin={undefined}
            />
            <Input
              placeholder={""}
              onPointerEnterCapture={""}
              onPointerLeaveCapture={""}
              value={settings.deliveryCharges}
              onChange={(e: any) =>
                setSettings({ ...settings, deliveryCharges: e.target.value })
              }
              type="number"

              className="h-14 shadow-lg font-semibold"
              label="Delivery Charges"
              crossOrigin={undefined}
            />
          </div>
          <div>
            <p className="font-semibold text-gray-600 text-lg py-3">
              Closure Message
            </p>
            <Textarea
            value={settings.closureMessage}
              placeholder={""}
              onPointerEnterCapture={""}
              onPointerLeaveCapture={""}
              onChange={(e: any) =>
                setSettings({ ...settings, closureMessage: e.target.value })
              }
              label="We will open after 5 days now!"
              className="h-40 shadow-lg text-lg"
            />
          </div>
          <div className="flex justify-end">
            <Button
              placeholder={""}
              onPointerEnterCapture={""}
              onPointerLeaveCapture={""}
              color="blue"
              onClick={handleSaveSettings}
              className="w-fit  h-14"
            >
              {" "}
              Save Changes{" "}
            </Button>
          </div>
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
    
  );
};

export default ResConfig;
