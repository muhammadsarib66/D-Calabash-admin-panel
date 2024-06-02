import { configureStore } from "@reduxjs/toolkit";
import Slicer from "./slicer/Slicer";
import GetCustomerList from "./slicer/GetCustomerListSlicer";
import BlockCustomerSlicer from "./slicer/BlockCustomerSlicer";
import UnBlockCustomerSlicer from "./slicer/UnBlockCustomerSlicer";
import GetProductListSlicer from "./slicer/GetProductListSlicer";
import DisableProductSlicer from "./slicer/DisableProductSlicer";
import GetOrderListSlicer from "./slicer/GetOrderListSlicer";
import OrderStatusSlicer from "./slicer/OrderStatusSlicer";

export const store = configureStore({
  reducer: {
    Slicer,
    GetCustomerList,
    BlockCustomerSlicer,
    UnBlockCustomerSlicer,
    GetProductListSlicer,
    DisableProductSlicer,
    GetOrderListSlicer,
    OrderStatusSlicer
  },
});
