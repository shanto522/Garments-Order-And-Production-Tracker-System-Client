import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

// Public Pages
import Home from "../pages/PublicPage/Home";
import AllProducts from "../pages/PublicPage/AllProducts";
import AboutUs from "../pages/PublicPage/AboutUs";
import Contact from "../pages/PublicPage/Contact";

// Auth Pages
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";

// User Pages
import MyOrders from "../pages/Dashboard/User/MyOrders/MyOrders";
import TrackOrder from "../pages/Dashboard/User/TrackOrder/TrackOrder";
import Profile from "../pages/Dashboard/Profile/Profile";

// Admin Pages
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AllProductsAdmin from "../pages/Dashboard/Admin/AllProductsAdmin";
import AllOrders from "../pages/Dashboard/Admin/AllOrders";
// Manager Pages
import AddProduct from "../pages/Dashboard/Manager/AddProduct";
import ManageProducts from "../pages/Dashboard/Manager/ManageProducts";
import PendingOrders from "../pages/Dashboard/Manager/PendingOrders";
import ApprovedOrders from "../pages/Dashboard/Manager/ApprovedOrders";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import FeedbackForm from "../pages/Dashboard/User/Feedback/FeedbackForm";
import AllFeedbacks from "../pages/Dashboard/User/Feedback/AllFeedbacks";
import PrivateRoute from "../Provider/PrivateRoute";
import AdminRoute from "./AdminRoute";
import ManagerRoute from "./ManagerRoute";

// Route Guards

const router = createBrowserRouter([
  // ======================== PUBLIC ========================
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "all-products", element: <AllProducts /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "contact", element: <Contact /> },
    ],
  },

  // ======================== AUTH ========================
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "/auth/login", element: <Login /> },
      { path: "/auth/register", element: <Register /> },
    ],
  },

  // ======================== DASHBOARD ========================
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // ---------------- USER / BUYER ----------------
      {
        index: true,
        path: "my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "product/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "track-order/:orderId",
        element: (
          <PrivateRoute>
            <TrackOrder />
          </PrivateRoute>
        ),
      },
      {
        path: "feedbackForm",
        element: (
          <PrivateRoute>
            <FeedbackForm></FeedbackForm>
          </PrivateRoute>
        ),
      },
      {
        path: "all-feedbacks",
        element: (
          <PrivateRoute>
            <AllFeedbacks></AllFeedbacks>
          </PrivateRoute>
        ),
      },
      // =========================
      // COMMON PROFILE FOR ALL ROLES ✅
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },

      // ---------------- ADMIN ----------------
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-products-admin",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllProductsAdmin />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-orders",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllOrders />
            </AdminRoute>
          </PrivateRoute>
        ),
      },

      // ---------------- MANAGER ----------------
      {
        path: "add-product",
        element: (
          <PrivateRoute>
            <ManagerRoute>
              <AddProduct />
            </ManagerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-products",
        element: (
          <PrivateRoute>
            <ManagerRoute>
              <ManageProducts />
            </ManagerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "pending-orders",
        element: (
          <PrivateRoute>
            <ManagerRoute>
              <PendingOrders />
            </ManagerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "approved-orders",
        element: (
          <PrivateRoute>
            <ManagerRoute>
              <ApprovedOrders />
            </ManagerRoute>
          </PrivateRoute>
        ),
      },
    ],
  },

  // ======================== 404 ========================
  { path: "*", element: <ErrorPage /> },
]);

export default router;
