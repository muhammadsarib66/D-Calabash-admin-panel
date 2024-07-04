/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import MiniDrawer from "./components/MiniDrawer";
import Login from "./screens/Login";
import { GetCustomerApi } from "./feature/slicer/GetCustomerListSlicer";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { GetProductListApi } from "./feature/slicer/GetProductListSlicer";
import { GetOrderListApi } from "./feature/slicer/GetOrderListSlicer";
import { GetCategoriesListApi } from "./feature/slicer/GetCategoriesSlicer";
import { GetRidersListApi } from "./feature/slicer/GetRidersSlicer";
import { DashboardApi } from "./feature/slicer/DashboardSlicer";
import { GetAdminListApi } from "./feature/slicer/GetAdminListingSlicer";
import { io } from "socket.io-client";
import { Userid, baseUrl } from "./feature/slicer/Slicer";
import { toast } from "react-toastify";
import BeepSOund from "./Images/Neworder.mp3";
import { GetResConfApi } from "./feature/slicer/GetResConfSlicer";

function App() {
  const audio = new Audio(BeepSOund);
  const socket = useMemo(() => io(baseUrl), []);
  const dispatch = useDispatch();
  const token = localStorage.getItem("admintoken");

 
  useEffect(() => {
    if (token) {
      dispatch(GetCustomerApi());
      dispatch(GetProductListApi());
      dispatch(GetCategoriesListApi());
      dispatch(GetRidersListApi());
      dispatch(GetOrderListApi());
      dispatch(DashboardApi());
      dispatch(GetAdminListApi());
      dispatch(GetResConfApi());
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      socket.emit("join-admin", Userid);
    }
  }, []);

  useEffect(() => {
    // audio.play();
    if (token) {
      socket.on("newOrder", () => {
        audio.play();
        toast.success("New Order Recieved 🍔😃");
        dispatch(DashboardApi());
        dispatch(GetOrderListApi());
      });
    }
  }, []);
  useEffect(() => {
    if (token) {
      socket.on("order-updated", (data) => {
        toast.success(data.message);
        dispatch(DashboardApi());
        dispatch(GetOrderListApi());
      });
    }
  }, []);

  useEffect(() => {
    socket.on("rider-updates", (data) => {
      toast.success(
        `Rider ${data?.fullname} is now ${
          data?.isWorking ? "Online" : "Offline"
        }`
      );
      dispatch(GetRidersListApi());
    });
  }, []);

  useEffect(() => {
    socket.on("message", () => {
      // console.log(data);
    });
  }, []);
  return (
    <>
      {token && <MiniDrawer />}
      {!token && <Login />}
    </>
  );
}


export default App;
