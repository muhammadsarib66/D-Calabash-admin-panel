import { useEffect } from "react";
import MiniDrawer from "./components/MiniDrawer";
import Login from "./screens/Login";
import { GetCustomerApi } from "./feature/slicer/GetCustomerListSlicer";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { GetProductListApi } from "./feature/slicer/GetProductListSlicer";
import { GetOrderListApi } from "./feature/slicer/GetOrderListSlicer";
import { GetCategoriesListApi } from "./feature/slicer/GetCategoriesSlicer";
import { GetRidersListApi } from "./feature/slicer/GetRidersSlicer";

function App() {
  const dispatch = useDispatch();
const token = localStorage.getItem('admintoken')
  useEffect(() => {
  

      dispatch(GetCustomerApi());
      dispatch(GetProductListApi());
      dispatch(GetOrderListApi());
      dispatch(GetCategoriesListApi());
      dispatch(GetRidersListApi());
    
  }, [dispatch]);
  // return (
  //   <>
  //   <MiniDrawer />
  //   </>
  // )
  return (
    <>
  
      {token && <MiniDrawer />}
      {!token && <Login />}
    </>
  );
}

export default App;
