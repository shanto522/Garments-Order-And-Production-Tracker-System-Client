import { createBrowserRouter } from "react-router";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/PublicPage/Home";
import AllProducts from "../pages/PublicPage/AllProducts";
import AboutUs from "../pages/PublicPage/AboutUs";
import Contact from "../pages/PublicPage/Contact";
import MyOrders from "../pages/Dashboard/User/MyOrders/MyOrders";
import TrackOrder from "../pages/Dashboard/User/TrackOrder/TrackOrder";

import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AllProductsAdmin from "../pages/Dashboard/Admin/AllProductsAdmin";
import AllOrders from "../pages/Dashboard/Admin/AllOrders";
import AddProduct from "../pages/Dashboard/Manager/AddProduct";
import ManageProducts from "../pages/Dashboard/Manager/ManageProducts";
import PendingOrders from "../pages/Dashboard/Manager/PendingOrders";
import ApprovedOrders from "../pages/Dashboard/Manager/ApprovedOrders";
import Profile from "../pages/Dashboard/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/all-products",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "/about-us",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "my-orders",
        element: <MyOrders />,
      },
      {
        path: "track-order/:orderId",
        element: <TrackOrder />,
      },
      {
        path: "profile",
        element: <Profile />,
      },

      // Admin Routes
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "all-products-admin",
        element: <AllProductsAdmin />,
      },
      {
        path: "all-orders",
        element: <AllOrders />,
      },

      // Manager Routes
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "manage-products",
        element: <ManageProducts />,
      },
      {
        path: "pending-orders",
        element: <PendingOrders />,
      },
      {
        path: "approved-orders",
        element: <ApprovedOrders />,
      },
    ],
  },

  {
    path: "/*",
    element: <ErrorPage></ErrorPage>,
  },
]);
export default router;
