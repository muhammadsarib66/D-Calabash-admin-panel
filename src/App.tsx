/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import MiniDrawer from "./components/MiniDrawer";
import Login from "./screens/Login";
import { GetCustomerApi } from "./feature/slicer/GetCustomerListSlicer";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { GetProductListApi } from "./feature/slicer/GetProductListSlicer";
import { GetOrderListApi } from "./feature/slicer/GetOrderListSlicer";
import { GetCategoriesListApi } from "./feature/slicer/GetCategoriesSlicer";
import { GetRidersListApi } from "./feature/slicer/GetRidersSlicer";
import { DashboardApi, RecentOrderComing } from "./feature/slicer/DashboardSlicer";
import { GetAdminListApi } from "./feature/slicer/GetAdminListingSlicer";
import { io } from "socket.io-client";
import { Userid, baseUrl } from "./feature/slicer/Slicer";
import { toast } from "react-toastify";
import BeepSOund from './Images/Neworder.mp3'



function App() {
  const {DashboardData} = useSelector((state: any) => state.DashboardSlicer);
console.log(DashboardData)
  const audio = new Audio(BeepSOund)
  // const MybaseUrl = "http://192.168.100.13:3000/"
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
    
      // socket.emit('join-admin',Userid);
      // socket.on("newOrder", (data) => {
      //   console.log(data, "socketData recieved");
      //   dispatch(RecentOrderComing(data))
      //   audio.play()
      //   setTimeout(() => {
      //   toast.success("New Order Recieved"); 
      // }, 1000)
      
        
      // });

    }


   
  }, [token , Userid]);

  useEffect(()=>{
 socket.emit('join-admin',Userid);
  socket.on("newOrder", (data) => {
    
    audio.play()
    dispatch(GetOrderListApi());
      dispatch(DashboardApi());
    dispatch(RecentOrderComing(data))
    setTimeout(() => {
    toast.success("New Order Recieved"); 
  }, 1000)
  
    console.log(data, "socketData recieved");
    
  });
  },[])

// useEffect(() => {
//   // Emit join event for admin
//   socket.emit('join-admin', Userid);

//   const handleNewOrder = (data:any) => {
//     const audio = new Audio('path_to_your_audio_file.mp3');
//     audio.play().then(() => {
//       setTimeout(() => {
//     dispatch(RecentOrderComing(data))

//         toast.success("New Order Received");
//       }, 1000); 
//     }).catch(error => {
//       console.error('Error playing audio:', error);
//       setTimeout(() => {
//         toast.success("New Order Received");
//       }, 1000);
//     });
//     console.log(data, "socketData received");
//   };

//   socket.on("newOrder", handleNewOrder);

//   // Clean up the effect
//   return () => {
//     socket.off("newOrder", handleNewOrder);
//   };
// }, [Userid]);

  socket.emit('join-admin',Userid);
  socket.on("newOrder", (data) => {
    audio.play()
    setTimeout(() => {
    toast.success("New Order Recieved"); 
  }, 1000)
  
    console.log(data, "socketData recieved");
    
  });

  
  socket.on("disconnect", () => {
  });
  return (
    <>  
    {/* <div className="ml-10 pt-20">

  <Button onClick={()=>audio.play()}>Join</Button>
    </div> */}
      {token && <MiniDrawer />}
      {!token && <Login />}
    </>
  );
}

export default App;
