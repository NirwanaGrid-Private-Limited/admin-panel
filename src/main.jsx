import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import App from "./App";
import AdminDashboard from "./pages/AdminDashboard";
import Categories from "./component/Admin/Categories";
import SubCategories from "./component/Admin/SubCategories";
import Products from "./component/Admin/Products";
import './index.css';
import Discounts from "./component/Admin/Discounts";
import Login from "./pages/Login"
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
      {/* PUBLIC ROUTES */}
      <Route element={<UserLayout/>}>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<App />} />
      </Route>
      

      {/* 🔒 PROTECTED ADMIN ROUTES */}
      <Route element={<ProtectedAdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="categories" element={<Categories />} />
          <Route path="sub-categories" element={<SubCategories />} />
          <Route path="products" element={<Products />} />
          <Route path="discounts" element={<Discounts/>}/>
        </Route>
      </Route>
    </Routes>

      {/* 🔥 React Hot Toast - Top Center */}
      <Toaster 
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerStyle={{
          top: 20,
        }}
        toastOptions={{
          // Default options for all toasts
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            padding: '16px 24px',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '500',
            maxWidth: '500px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
          
          // Success toast style
          success: {
            duration: 3000,
            style: {
              background: '#10b981',
              color: '#fff',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#10b981',
            },
          },
          
          // Error toast style
          error: {
            duration: 4000,
            style: {
              background: '#ef4444',
              color: '#fff',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#ef4444',
            },
          },
          
          // Loading toast style
          loading: {
            style: {
              background: '#3b82f6',
              color: '#fff',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#3b82f6',
            },
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>
);