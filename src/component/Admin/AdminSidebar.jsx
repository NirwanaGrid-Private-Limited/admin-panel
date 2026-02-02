import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AdminSidebar.css";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: "📊", path: "/admin" },
    { name: "Categories", icon: "📁", path: "/admin/categories" },
    { name: "Sub Categories", icon: "📂", path: "/admin/sub-categories" },
    { name: "Products", icon: "📦", path: "/admin/products" },
    { name: "Discounts", icon: "🏷️", path: "/admin/discounts" },
  ];

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobile && isOpen) {
        const sidebar = document.querySelector(".sidebar");
        const menuBtn = document.querySelector(".mobile-menu-btn");
        if (sidebar && !sidebar.contains(e.target) && menuBtn && !menuBtn.contains(e.target)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, isOpen]);

  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobile, isOpen]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  /* ================= LOGOUT FUNCTION ================= */
  const handleLogout = () => {
    // Confirm logout
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    
    if (!confirmLogout) return;

    // Clear all localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    
    // Or clear everything
    // localStorage.clear();

    // Show success toast
    toast.success("Logged out successfully!", {
      icon: "👋",
      duration: 2000,
    });

    // Redirect to login page
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* Mobile Menu Button - Only shows when sidebar is CLOSED */}
      {isMobile && !isOpen && (
        <button 
          className="mobile-menu-btn" 
          onClick={toggleSidebar}
          aria-label="Open menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      )}

      {/* Overlay */}
      {isMobile && isOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isMobile ? (isOpen ? "open" : "closed") : ""}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-icon">⚡</div>
            <h2 className="logo-text">Admin Panel</h2>
          </div>
          
          {/* Close button - Only ONE button on right side */}
          {isMobile && isOpen && (
            <button className="sidebar-close-btn" onClick={closeSidebar}>
              ✕
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          <ul className="menu">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) =>
                  `menu-item ${isActive ? "active" : ""}`
                }
                onClick={closeSidebar}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.name}</span>
                <div className="active-indicator" />
              </NavLink>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">
              {user?.username?.charAt(0).toUpperCase() || "A"}
            </div>
            <div className="user-info">
              <p className="user-name">{user?.username || "Admin"}</p>
              <p className="user-role">Administrator</p>
            </div>
          </div>

          {/* 🔥 LOGOUT BUTTON WITH onClick */}
          <button className="logout-btn" onClick={handleLogout}>
            <span>🚪</span>
            <span className="logout-text">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}