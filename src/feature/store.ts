import { configureStore } from "@reduxjs/toolkit";
import Slicer from "./slicer/Slicer";
import GetCustomerList from "./slicer/GetCustomerListSlicer";
import BlockCustomerSlicer from "./slicer/BlockCustomerSlicer";
import UnBlockCustomerSlicer from "./slicer/UnBlockCustomerSlicer";
import GetProductListSlicer from "./slicer/GetProductListSlicer";
import DisableProductSlicer from "./slicer/DisableProductSlicer";
import GetOrderListSlicer from "./slicer/GetOrderListSlicer";
import OrderStatusSlicer from "./slicer/OrderStatusSlicer";
import GetCategoriesSlicer from "./slicer/GetCategoriesSlicer";
import AddCategorySlicer from "./slicer/AddCategorySlicer";
import AddProductSlicer from "./slicer/AddProductSlicer";
import GetRidersSlicer from "./slicer/GetRidersSlicer";
import BlockRiderSlicer from "./slicer/BlockRiderSlicer";
import UnBlockRiderSlicer from "./slicer/UnBlockRiderSlicer";
import DeleteRiderSlicer from "./slicer/DeleteRiderSlicer";
import AddRiderSlicer from "./slicer/AddRiderSlicer";
import DeleteCategorySlicer from "./slicer/DeleteCategorySlicer";
import DeleteOrderSlicer from "./slicer/DeleteOrderSlicer";
import DeleteProductSlicer from "./slicer/DeleteProductSlicer";
import AssingOrderRiderSlicer from "./slicer/AssingOrderRiderSlicer";
import LoginSlicer from "./slicer/LoginSlicer";
import DashboardSlicer from "./slicer/DashboardSlicer";

export const store = configureStore({
  reducer: {
    Slicer,
    GetCustomerList,
    BlockCustomerSlicer,
    UnBlockCustomerSlicer,
    GetProductListSlicer,
    DisableProductSlicer,
    GetOrderListSlicer,
    OrderStatusSlicer,
    GetCategoriesSlicer,
    AddCategorySlicer,
    AddProductSlicer,
    GetRidersSlicer,
    BlockRiderSlicer,
    UnBlockRiderSlicer,
    DeleteRiderSlicer,
    AddRiderSlicer,
    DeleteCategorySlicer,
    DeleteOrderSlicer,
    DeleteProductSlicer,
    AssingOrderRiderSlicer,
    LoginSlicer,
    DashboardSlicer

  },
});
