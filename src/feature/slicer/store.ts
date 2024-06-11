import { configureStore } from "@reduxjs/toolkit";
import Slicer from "./Slicer";
import GetCustomerList from "./GetCustomerListSlicer";
import BlockCustomerSlicer from "./BlockCustomerSlicer";
import UnBlockCustomerSlicer from "./UnBlockCustomerSlicer";
import GetProductListSlicer from "./GetProductListSlicer";
import DisableProductSlicer from "./DisableProductSlicer";
import GetOrderListSlicer from "./GetOrderListSlicer";
import OrderStatusSlicer from "./OrderStatusSlicer";
import GetCategoriesSlicer from "./GetCategoriesSlicer";
import AddCategorySlicer from "./AddCategorySlicer";
import AddProductSlicer from "./AddProductSlicer";
import GetRidersSlicer from "./GetRidersSlicer";
import BlockRiderSlicer from "./BlockRiderSlicer";
import UnBlockRiderSlicer from "./UnBlockRiderSlicer";
import DeleteRiderSlicer from "./DeleteRiderSlicer";
import AddRiderSlicer from "./AddRiderSlicer";
import DeleteCategorySlicer from "./DeleteCategorySlicer";
import DeleteOrderSlicer from "./DeleteOrderSlicer";
import DeleteProductSlicer from "./DeleteProductSlicer";
import AssingOrderRiderSlicer from "./AssingOrderRiderSlicer";
import LoginSlicer from "./LoginSlicer";
import DashboardSlicer from "./DashboardSlicer";
import GetAdminListingSlicer from "./GetAdminListingSlicer";
import DeleteAdminSlicer from "./DeleteAdminSlicer";
import AddAdminSlicer from "./AddAdminSlicer";

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
    DashboardSlicer,
    GetAdminListingSlicer,
    DeleteAdminSlicer,
    AddAdminSlicer

  },
});
