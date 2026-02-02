import { Outlet } from "react-router-dom";
import AdminSidebar from "../component/Admin/AdminSidebar";
import "../styles/adminLayout.css";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}
