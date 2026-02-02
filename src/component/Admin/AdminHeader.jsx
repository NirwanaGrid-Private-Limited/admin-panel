import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminHeader.css";

export default function AdminHeader() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    // 🔥 clear auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // optional: clear everything
    // localStorage.clear();

    // redirect to login
    navigate("/login");
  };

  // Mobile pe header nahi dikhana
  if (isMobile) return null;

  return (
    <header className="admin-header">
      <div className="header-left">
        <h3 className="header-title">Dashboard</h3>
        <p className="header-subtitle">Welcome back, Admin!</p>
      </div>

      <div className="header-right">
        {/* USER MENU */}
        <div className="user-menu-wrapper">
          <button
            className="admin-user"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="user-avatar">A</div>
            <div className="user-details">
              <span className="user-name">Admin</span>
              <span className="user-role">Administrator</span>
            </div>
            <span className="dropdown-arrow">▼</span>
          </button>

          {showUserMenu && (
            <div className="user-dropdown">
              <div
                className="dropdown-item logout"
                onClick={handleLogout}
              >
                <span className="dropdown-icon">🚪</span>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
