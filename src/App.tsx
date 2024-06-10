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
import { baseUrl } from "./feature/slicer/Slicer";
import { toast } from "react-toastify";

function App() {
  // const MybaseUrl = "http://192.168.100.13:3000/"
const socket = useMemo(() => io(baseUrl), []);
  const dispatch = useDispatch();
  const token = localStorage.getItem("admintoken");
  const {_id}  = JSON.parse(localStorage.getItem('AdminUser') as string);
  console.log(_id)
  
  useEffect(() => {
    if (token) {
      dispatch(GetCustomerApi());
      dispatch(GetProductListApi());
      dispatch(GetOrderListApi());
      dispatch(GetCategoriesListApi());
      dispatch(GetRidersListApi());
      dispatch(DashboardApi());
      dispatch(GetAdminListApi());
    }
    socket.emit('join-admin',_id);
    socket.on("newOrder", (data) => {
      toast.success("New Order Recieved"); 
      console.log(data, "socketData recieved");
    });


    socket.on("disconnect", () => {
    });
  }, [dispatch, token]);
  return (
    <>
      {token && <MiniDrawer />}
      {!token && <Login />}
    </>
  );
}

export default App;
