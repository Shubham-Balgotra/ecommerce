import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import StrollerIcon from "@mui/icons-material/Stroller";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Dashboard from "./components/Dashboard";
import ProductsTable from "./components/ProductsTable";
import OrdersTable from "./components/OrdersTable";
import CustomersTable from "./components/CustomersTable";
import CreateProductForm from "./components/CreateProductForm";

const menu = [
  { name: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
  { name: "Products", path: "/admin/products", icon: <Inventory2Icon /> },
  {
    name: "Customers",
    path: "/admin/customers",
    icon: <FaceRetouchingNaturalIcon />,
  },
  { name: "Orders", path: "/admin/orders", icon: <StrollerIcon /> },
  { name: "Add Product", path: "/admin/product/create", icon: <AddBoxIcon /> },
];

const Admin = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const navigate = useNavigate();
  const drawer = (
    <Box
      sx={{
        width: "15%",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // light gray border
        bgcolor: "background.paper", // nice background color
        zIndex: 1200, // high enough to stay above
        mx: 1,
        borderRight: "1px solid #e0e0e0",
      }}
    >
      
      {/*Drawer upper part */}
      {/*{isLargeScreen && <Toolbar/>}*/}
      <List>
        {menu.map((item, index) => (
          <ListItem
            key={item.name}
            disablePadding
            onClick={() => navigate(item.path)}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/*Drawer lower part*/}
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText>Account</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    
      <div className="flex h-[100vh] ">
        <CssBaseline />
        <div className="w-[15%] h-screen border-r border-r-gray-200 ">
          {drawer}
        </div>

        <div className="w-[85%] p-5">
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/products" element={<ProductsTable />}></Route>
            <Route path="/orders" element={<OrdersTable />}></Route>
            <Route path="/customers" element={<CustomersTable />}></Route>
            <Route
              path="/product/create"
              element={<CreateProductForm />}
            ></Route>
          </Routes>
        </div>
      </div>
    
  );
};

export default Admin;
