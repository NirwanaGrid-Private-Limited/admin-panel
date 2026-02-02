import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import "../../styles/Categories.css";

import { getProducts } from "../../api/product.api";
import {
  getDiscounts,
  addDiscount,
  updateDiscount,
  deleteDiscount
} from "../../api/discount.api";

export default function Discounts() {
  const [products, setProducts] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    discountType: "percentage",
    value: "",
    products: [],
    startDate: "",
    endDate: ""
  });

  /* ================= FETCH DATA ================= */
  const fetchData = async () => {
    setLoading(true);
    
    // PRODUCTS
    try {
      const prodRes = await getProducts();
      setProducts(prodRes.data.products || []);
    } catch (err) {
      console.error("Products error:", err);
      toast.error("Failed to load products");
    }

    // DISCOUNTS
    try {
      const disRes = await getDiscounts();
      setDiscounts(disRes.data.discounts || []);
    } catch (err) {
      console.error("Discounts error:", err);
      console.log("DISCOUNT API ERROR STATUS:", err.response?.status);
      console.log("DISCOUNT API ERROR DATA:", err.response?.data);
      toast.error("Failed to load discounts");
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= HELPERS ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProductSelect = (e) => {
    const selected = Array.from(
      e.target.selectedOptions,
      (opt) => opt.value
    );
    setFormData({ ...formData, products: selected });
  };

  const selectAllProducts = () => {
    setFormData({
      ...formData,
      products: products.map((p) => p._id)
    });
    toast.success("All products selected", {
      icon: '✅',
      duration: 2000,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      discountType: "percentage",
      value: "",
      products: [],
      startDate: "",
      endDate: ""
    });
    setIsEditing(false);
    setEditingId(null);
  };

  /* ================= OVERLAP CHECK ================= */
  const hasOverlap = () => {
    return discounts.some((d) => {
      if (isEditing && d._id === editingId) return false;

      const dateOverlap =
        new Date(formData.startDate) <= new Date(d.endDate) &&
        new Date(formData.endDate) >= new Date(d.startDate);

      const productOverlap = d.products.some((p) =>
        formData.products.includes(
          typeof p === "string" ? p : p._id
        )
      );

      return dateOverlap && productOverlap;
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, value, products, startDate, endDate } = formData;

    if (!name || !value || products.length === 0 || !startDate || !endDate) {
      toast.error("All fields are required", { icon: '⚠️' });
      return;
    }

    if (hasOverlap()) {
      toast.error("Overlapping discount detected for selected products & dates", { 
        icon: '⚠️',
        duration: 4000,
      });
      return;
    }

    const loadingToast = toast.loading(
      isEditing ? "Updating discount..." : "Adding discount..."
    );

    try {
      setLoading(true);

      if (isEditing) {
        await updateDiscount(editingId, {
          ...formData,
          value: Number(formData.value)
        });
        toast.success("Discount updated successfully! 🎉", { id: loadingToast });
      } else {
        await addDiscount({
          ...formData,
          value: Number(formData.value)
        });
        toast.success("Discount added successfully! 🎉", { id: loadingToast });
      }

      resetForm();
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Discount operation failed", { 
        id: loadingToast 
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (discount) => {
    setIsEditing(true);
    setEditingId(discount._id);

    setFormData({
      name: discount.name,
      discountType: discount.discountType,
      value: discount.value,
      products: discount.products.map((p) =>
        typeof p === "string" ? p : p._id
      ),
      startDate: discount.startDate.slice(0, 10),
      endDate: discount.endDate.slice(0, 10)
    });

    toast.success("Editing mode activated", {
      icon: '✏️',
      duration: 2000,
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this discount?")) return;

    const loadingToast = toast.loading("Deleting discount...");

    try {
      await deleteDiscount(id);
      setDiscounts((prev) => prev.filter((d) => d._id !== id));
      toast.success("Discount deleted successfully! 🗑️", { id: loadingToast });
    } catch {
      toast.error("Delete failed", { id: loadingToast });
    }
  };

  /* ================= UI ================= */
  return (
    <div className="category-page">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <div className="header-icon">🏷️</div>
          <div>
            <h1 className="page-title">Discounts</h1>
            <p className="page-subtitle">
              Manage and apply product discounts
            </p>
          </div>
        </div>

        <div className="header-stats">
          <div className="stat-badge">
            <span className="stat-number">{discounts.length}</span>
            <span className="stat-label">Total Discounts</span>
          </div>
          <div className="stat-badge">
            <span className="stat-number">
              {discounts.filter(d => new Date(d.endDate) >= new Date()).length}
            </span>
            <span className="stat-label">Active</span>
          </div>
        </div>
      </div>

      <div className="categories-container">
        {/* ADD / EDIT FORM */}
        <div className="category-card form-card">
          <div className="card-header">
            <h3 className="card-title">
              <span className="icon">{isEditing ? "✏️" : "➕"}</span>
              {isEditing ? "Edit Discount" : "Add New Discount"}
            </h3>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit} className="category-form">
              <div className="form-group">
                <label>Discount Name *</label>
                <input 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange}
                  placeholder="e.g., Summer Sale"
                />
              </div>

              <div className="form-group">
                <label>Discount Type *</label>
                <select
                  name="discountType"
                  value={formData.discountType}
                  onChange={handleChange}
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="flat">Flat Amount (₹)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Value *</label>
                <input
                  type="number"
                  name="value"
                  value={formData.value}
                  onChange={handleChange}
                  placeholder={formData.discountType === "percentage" ? "e.g., 20" : "e.g., 500"}
                />
                <span className="input-hint">
                  {formData.discountType === "percentage" 
                    ? "Enter percentage value (0-100)" 
                    : "Enter flat discount amount in ₹"}
                </span>
              </div>

              <div className="form-group">
                <label>Select Products *</label>
                <button
                  type="button"
                  className="select-all-btn"
                  onClick={selectAllProducts}
                >
                  ✅ Select All ({products.length})
                </button>

                <select
                  multiple
                  className="multi-select"
                  value={formData.products}
                  onChange={handleProductSelect}
                >
                  {products.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name} - ₹{p.price}
                    </option>
                  ))}
                </select>
                <span className="input-hint">
                  Hold Ctrl/Cmd to select multiple • {formData.products.length} selected
                </span>
              </div>

              <div className="form-group">
                <label>Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>End Date *</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  min={formData.startDate}
                />
              </div>

              <div className="form-actions">
                {isEditing && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      resetForm();
                      toast.success("Form cleared", {
                        icon: '🔄',
                        duration: 2000,
                      });
                    }}
                  >
                    <span className="btn-icon">✕</span>
                    Cancel
                  </button>
                )}
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  <span className="btn-icon">{isEditing ? "💾" : "➕"}</span>
                  {loading ? "Saving..." : isEditing ? "Update Discount" : "Add Discount"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* DISCOUNTS LIST */}
        <div className="category-card list-card">
          <div className="card-header">
            <h3 className="card-title">
              <span className="icon">📋</span>
              Applied Discounts
            </h3>
          </div>

          <div className="card-body">
            {loading ? (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Loading discounts...</p>
              </div>
            ) : discounts.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🏷️</div>
                <h3>No Discounts Found</h3>
                <p>Create your first discount to get started</p>
              </div>
            ) : (
              <div className="table-wrapper">
                <div className="table-container">
                  <table className="category-table">
                    <thead>
                      <tr>
                        <th>
                          <div className="th-content">
                            <span className="th-icon">🏷️</span>
                            Name
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            <span className="th-icon">📊</span>
                            Type
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            <span className="th-icon">💰</span>
                            Value
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            <span className="th-icon">📦</span>
                            Products
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            <span className="th-icon">📅</span>
                            Period
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            <span className="th-icon">📌</span>
                            Status
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            <span className="th-icon">⚙️</span>
                            Actions
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {discounts.map((d) => {
                        const isActive = new Date(d.endDate) >= new Date() && 
                                        new Date(d.startDate) <= new Date();
                        const isExpired = new Date(d.endDate) < new Date();
                        const isUpcoming = new Date(d.startDate) > new Date();
                        
                        return (
                          <tr key={d._id}>
                            <td>
                              <div className="category-name">
                                <div className="category-avatar">
                                  {d.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="name-text">{d.name}</span>
                              </div>
                            </td>
                            <td>
                              <span className={`type-badge ${d.discountType}`}>
                                {d.discountType === "percentage" ? "%" : "₹"}
                              </span>
                            </td>
                            <td>
                              <span className="discount-value">
                                {d.discountType === "percentage"
                                  ? `${d.value}%`
                                  : `₹${d.value}`}
                              </span>
                            </td>
                            <td>
                              <span className="product-count">
                                {d.products.length} items
                              </span>
                            </td>
                            <td>
                              <div className="date-range">
                                <span>{d.startDate.slice(0, 10)}</span>
                                <span className="date-arrow">→</span>
                                <span>{d.endDate.slice(0, 10)}</span>
                              </div>
                            </td>
                            <td>
                              <span className={`status-badge ${isActive ? 'active' : isExpired ? 'expired' : 'upcoming'}`}>
                                {isActive ? '🟢 Active' : isExpired ? '🔴 Expired' : '🟡 Upcoming'}
                              </span>
                            </td>
                            <td>
                              <div className="actions">
                                <button
                                  className="action-btn edit-btn"
                                  onClick={() => handleEdit(d)}
                                >
                                  <span>✏️</span>
                                  Edit
                                </button>
                                <button
                                  className="action-btn delete-btn"
                                  onClick={() => handleDelete(d._id)}
                                >
                                  <span>🗑️</span>
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="scroll-hint">
                  <span>← Swipe to see more →</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}