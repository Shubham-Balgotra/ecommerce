
import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Cart from "../customer/components/Cart/Cart";
import Checkout from "../customer/components/Checkout/Checkout";
import Order from "../customer/components/Order/Order";
import ProductDetails from "../customer/components/ProductDetails/ProductDetails";
import OrderDetails from "../customer/components/Order/OrderDetails";
import HomePage from "../customer/components/pages/HomePage/HomePage";
import Footer from "../customer/components/Footer/Footer";
import Navigation from "../customer/components/Navigation/Navigation";
import Product from "../customer/components/Product/Product";
import VerifyEmail from "../authentication/VerifyEmail";
import VerifyEmailError from "../authentication/VerifyEmailError";
import ForgotPassword from "../authentication/ForgetPassword";
import ResetPassword from "../authentication/ResetPasswod";
import NotFound from "../customer/components/NotFound/NotFound";
import CustomerSupport from "../customer/components/CustomerSupport/CustomerSupport";
import PaymentSuccess from "../customer/components/Checkout/PaymentSuccess";
import AboutUs from "../customer/components/AboutUs/AboutUs";
import ScrollToTop from "../customer/components/ScrollToTop/ScrollToTop";

const CustomerRouters = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Set dynamic document title based on the current route
  useEffect(() => {
    const getTitle = (pathname) => {
      if (pathname.match(/^\/account\/order\/\w+$/)) return "Order Details | Your Store";
      if (pathname.match(/^\/checkout\/success\/\w+$/)) return "Payment Success | Your Store";
      if (pathname.match(/^\/[^/]+\/[^/]+$/)) return "Product Details | Your Store";
      if (pathname.match(/^\/[^/]+\/[^/]+\/[^/]+$/)) return "Products | Your Store";

      const titleMap = {
        "/": "Home | Your Store",
        "/register": "Register | Your Store",
        "/login": "Login | Your Store",
        "/verify-email": "Verify Email | Your Store",
        "/verify-email-error": "Email Verification Error | Your Store",
        "/forgot-password": "Forgot Password | Your Store",
        "/reset-password": "Reset Password | Your Store",
        "/cart": "Cart | Your Store",
        "/checkout": "Checkout | Your Store",
        "/account/order": "My Orders | Your Store",
        "/support": "Contact | Your Store",
        "/about": "About Us | Your Store",
      };

      return titleMap[pathname] || "Not Found | Your Store";
    };

    document.title = getTitle(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    try {
      if (location.pathname === "/action") {
        const queryParams = new URLSearchParams(location.search);
        const mode = queryParams.get("mode");
        const oobCode = queryParams.get("oobCode");


        if (mode && oobCode) {
          switch (mode) {
            case "verifyEmail":
              navigate(`/verify/${oobCode}`, { replace: true });
              break;
            case "resetPassword":
              navigate(`/reset-password/${oobCode}`, { replace: true });
              break;
            default:
              navigate("/", { replace: true });
          }
        } else {
          navigate("/", { replace: true });
        }
      }
    } catch (error) {
      console.error("Navigation error:", error);
      navigate("/error", { replace: true });
    }
  }, [location, navigate]);


  return (
    <div>
      <ScrollToTop/>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<HomePage />} />
        <Route path="/login" element={<HomePage />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/verify-email-error" element={<VerifyEmailError />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/success/:orderId" element={<PaymentSuccess />} />
        <Route path="/account/order" element={<Order />} />
        <Route path="/account/order/:orderId" element={<OrderDetails />} />
        <Route path="/support" element={<CustomerSupport />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/:levelOne/:levelTwo/:levelThree" element={<Product />} />
        <Route path="/:product/:productId" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
      <Footer />
    </div>
  );
};

export default CustomerRouters;