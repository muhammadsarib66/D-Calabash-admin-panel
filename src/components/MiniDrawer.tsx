import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Route, Routes } from "react-router";
import logo from "../Images/Logo.png";
import user from "../Images/USER1.png";
import { Avatar } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import CategoryIcon from '@mui/icons-material/Category';
import { useLocation } from "react-router";

import Dashboard from "../screens/dashboard";
import Customers from "../screens/customers";
import Orders from "../screens/orders";
import Riders from "../screens/riders";
import Product from "../screens/products";
import SubAdmin from "../screens/admins"
import { Link } from "react-router-dom";
import { LoginOutlined } from "@mui/icons-material";
import ProductCategory from "../screens/products/ProductCategory";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SettingsIcon from '@mui/icons-material/Settings';

import { issubadmin } from "../feature/slicer/Slicer";
import ResConfig from "../screens/restuarent-config/ResConfig";

const drawerWidth = 240;
const tabs = [
  {
    title: "Dashboard",
    link: "/",
    icon: <DashboardIcon />,
  },
  {
    title: "Orders",
    link: "/orders",
    icon: <RestaurantIcon />,
  },
  {
    title: "Customers",
    link: "/customers",
    icon: <PeopleAltIcon />,
  },
  {
    title: "Products",
    link: "/products",
    icon: <AddBoxIcon />,
  },
  {
    title: "Product Categories",
    link: "/productsCategories",
    icon: <CategoryIcon />,
  },
  {
    title: "Rider",
    link: "/riders",
    icon: <DeliveryDiningIcon />,

  },
  {
    title: "Sub Admins",
    link: "/subadmin",
    icon: <SupervisorAccountIcon />,

  },
  {
    title: "Restuarent Config",
    link: "/config",
    icon: <SettingsIcon />,

  },
];
const filteredTabs = issubadmin 
  ? tabs.filter(item => item?.title !== "Sub Admins" )
  : tabs;




const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const location = useLocation();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const User = JSON.parse(localStorage.getItem("AdminUser") || "{}");

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        sx={{ background: "white", color: "gray" }}
        position="fixed"
        open={open}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <div className="flex justify-between w-full pr-4">
            <div>

              <img src={logo} alt="logo" style={{ width: "100px" }} />
            </div>
            <div className="flex items-center gap-3">
              <Avatar
                src={user}
                alt="user"
                sx={{ width: "50px", height: "50px", marginLeft: "10px" }}
              />
          
              <div>
                <h5 className="font-semibold text-gray-800 "> {User?.fullname}</h5>
                <p className="text-xs"> {issubadmin ? "Sub Admin" : "Super Admin"}</p>
              </div>
              <i 
                onClick={()=>{
                  localStorage.removeItem('admintoken');
                  localStorage.removeItem('AdminUser');
                    window.location.reload();
                    window.location.href = '/';
                }}
              className=" cursor-pointer fa-solid fa-right-from-bracket"></i>
              {/* <ExpandCircleDownIcon
                sx={{ background: "white", cursor: "pointer" }}
              /> */}
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          sx={{
            justifyContent: "space-between",
            paddingX: 2,
            fontSize: "20px",
            fontWeight: 600,
          }}
          className="uppercase text-gray-700"
        >
          <p> D'Calabash</p>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />
        <List>
          {filteredTabs.map((item) => (
            <ListItem
              key={item?.title}
              disablePadding
              sx={{
                display: "block",
                background:
                  location.pathname === item?.link ? "#EDF2FD" : "inherit",
                color: location.pathname === item?.link ? "#4880FF" : "inherit",
              }}
            >
              <Link to={item?.link}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color:
                        location.pathname === item?.link
                          ? "#4880FF"
                          : "inherit",
                    }}
                  >
                    {item?.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item?.title}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem
          onClick={()=>{
            localStorage.removeItem('admintoken');
          localStorage.removeItem('AdminUser');
            window.location.reload();
            window.location.href = '/';

          }}
            disablePadding
            sx={{ display: "block", background: "inherit", color: "inherit" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: "inherit",
                }}
              >
                <LoginOutlined />
              </ListItemIcon>
              <ListItemText primary={"logout"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          paddingTop: "60px",
          background: "#F5F6FA",
          height: "100vh",
          transition: "margin-left 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",

          overflowY: "scroll",
          overflowX: "hidden",
        }}
      >
        {/* <DrawerHeader /> */}
          <Routes>

          <Route path="*" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Product />} />
          <Route path="/productsCategories" element={<ProductCategory />} />
          <Route path="/riders" element={<Riders />} />
          <Route path='/config' element={<ResConfig />} />
          {
            issubadmin == true ? null : <Route path="/subadmin" element={<SubAdmin />} />
          }
          {/* <Route path="/subadmin" element={<SubAdmin />} /> */}
          </Routes>

        {/* <ToastContainer /> */}
      </Box>
    </Box>
  );
}
