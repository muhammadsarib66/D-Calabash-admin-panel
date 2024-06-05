/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import logo from "../Images/Logo.png";

import { Typography, Input, Button } from "@material-tailwind/react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { LoginApi } from "../feature/slicer/LoginSlicer";

export function Login() {
  const dispatch = useDispatch()
  const [login , setLogin ] = useState<any>({
    email : '',
    password : "",
  })
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  const handleChange = (e:any)=>{
    setLogin((prev: any)=>({...prev , [e.target.name]:e.target.value}))
  }
  const HandleLogin = ()=>{
    if(login.email !== "" && login.password !== ""){
      dispatch(LoginApi(login))
      console.log(login)
    }
    else{
      toast.error("Please fill all field")
    }
  }


  return (
    <section className="flex text-center h-screen items-center ">
      <div className="flex-1 flex flex-col items-center justify-center bg-[#023047] h-screen overflow-y-hidden">
        <img
          src={logo}
          alt="logo"
          className="w-[80%] h-[400px] object-contain "
        />
      </div>
      <div className="flex-1">
        <Typography
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
          variant="h3"
          color="blue-gray"
          className="mb-2"
        >
          Sign In
        </Typography>
        <Typography
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
          className="mb-16 text-gray-600 font-normal text-[18px]"
        >
          Enter your email and password to sign in
        </Typography>
        <form action="#" className="mx-auto max-w-[24rem] text-left">
          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Your Email
              </Typography>
            </label>
            <Input
            onChange={handleChange}
            value={login?.email}
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
              crossOrigin="" // Add the missing crossOrigin property
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              placeholder="name@mail.com"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password">
              <Typography
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
                placeholder={""}
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Password
              </Typography>
            </label>
            <Input
            onChange={handleChange}
            name="password"
            value={login?.password}
              crossOrigin="" // Add the missing crossOrigin property
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
              size="lg"
              id="password"
              placeholder="********"
              labelProps={{
                className: "hidden",
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              type={passwordShown ? "text" : "password"}
              icon={
                <i onClick={togglePasswordVisiblity}>
                  {passwordShown ? (
                    <VisibilityOffIcon className="h-5 w-5" />
                  ) : (
                    <VisibilityIcon className="h-5 w-5" />
                  )}
                </i>
              }
            />
          </div>
          <Button
          onClick={HandleLogin}
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
            color="gray"
            size="lg"
            className="mt-6"
            fullWidth
          >
            sign in
          </Button>
          <div className="!mt-4 flex justify-end">
            <Typography
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
              as="a"
              href="#"
              color="blue-gray"
              variant="small"
              className="font-medium"
            >
              Forgot password
            </Typography>
          </div>
         
          <Typography
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
            variant="small"
            color="gray"
            className="!mt-4 text-center font-normal"
          >
            Not registered?{" "}
            <a href="#" className="font-medium text-gray-900">
              Create account
            </a>
          </Typography>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
}

export default Login;
