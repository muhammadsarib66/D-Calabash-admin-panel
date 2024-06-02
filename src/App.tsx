import { useEffect, useState } from "react";
import MiniDrawer from "./components/MiniDrawer";
import Login from "./screens/Login";
import { GetCustomerApi } from "./feature/slicer/GetCustomerListSlicer";
import { useDispatch } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import { GetProductListApi } from "./feature/slicer/GetProductListSlicer";
import { GetOrderListApi } from "./feature/slicer/GetOrderListSlicer";


function App() {
  const dispatch = useDispatch();
  const [isLogin, setLogin] = useState(false);
  

  useEffect(()=>{
    dispatch(GetCustomerApi())
    dispatch(GetProductListApi())
    dispatch(GetOrderListApi())
  },[dispatch])
    return (

      <>
      <MiniDrawer />
      </>
    )
  return <>{isLogin ? <MiniDrawer /> :
   <Login setLogin={setLogin} />}</>;
}

export default App;
