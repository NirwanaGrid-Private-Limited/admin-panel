import { useEffect, useState } from "react";
import AdminHeader from "../component/Admin/AdminHeader";
import "../styles/Admindashboard.css";

import { getProducts } from "../api/product.api";
import { getAllCategories } from "../api/category.api";
import { getAllSubCategories } from "../api/subCategories.api";
import { getDiscounts } from "../api/discount.api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    subCategories: 0,
    discounts: 0
  });

  const [loading, setLoading] = useState(true);

  /* ================= FETCH DASHBOARD DATA ================= */
  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [prodRes, catRes, subCatRes, disRes] = await Promise.all([
        getProducts(),
        getAllCategories(),
        getAllSubCategories(),
        getDiscounts()
      ]);

      setStats({
        products: prodRes.data.products?.length || 0,
        categories: catRes.data.categories?.length || 0,
        subCategories: subCatRes.data.subCategories?.length || 0,
        discounts: disRes.data.discounts?.length || 0
      });
    } catch (err) {
      console.error("Dashboard Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <main className="main-content">
      <AdminHeader />

      <div className="dashboard-container">
        <h2 className="dashboard-title">Dashboard Overview</h2>

        {loading ? (
          <p>Loading dashboard...</p>
        ) : (
          <div className="stats-grid">
            <div className="stat-card purple">
              <span className="stat-icon">📦</span>
              <h4>Total Products</h4>
              <p className="stat-value">{stats.products}</p>
            </div>

            <div className="stat-card blue">
              <span className="stat-icon">📁</span>
              <h4>Categories</h4>
              <p className="stat-value">{stats.categories}</p>
            </div>

            <div className="stat-card green">
              <span className="stat-icon">📂</span>
              <h4>Sub Categories</h4>
              <p className="stat-value">{stats.subCategories}</p>
            </div>

            <div className="stat-card orange">
              <span className="stat-icon">🏷️</span>
              <h4>Active Discounts</h4>
              <p className="stat-value">{stats.discounts}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
