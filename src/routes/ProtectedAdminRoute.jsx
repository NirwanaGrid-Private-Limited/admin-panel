import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedAdminRoute() {
  const token = localStorage.getItem("token");

  // ❌ token nahi hai → login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ✅ token hai → admin routes allow
  return <Outlet />;
}
