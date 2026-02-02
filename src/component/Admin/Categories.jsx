import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import "../../styles/Categories.css";

import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from "../../api/category.api";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    slug: ""
  });

  const [isEditing, setIsEditing] = useState(false);

  /* =========================
     FETCH CATEGORIES
  ========================= */
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await getAllCategories();
      setCategories(res.data.categories || []);
    } catch (err) {
      toast.error("Failed to load categories");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* =========================
     FORM HANDLERS
  ========================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ id: null, name: "", slug: "" });
    setIsEditing(false);
  };

  /* =========================
     ADD / UPDATE CATEGORY
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.slug) return;

    setLoading(true);

    const loadingToast = toast.loading(
      isEditing ? "Updating category..." : "Creating category..."
    );

    try {
      if (isEditing) {
        await updateCategory(formData.id, {
          name: formData.name,
          slug: formData.slug
        });
        toast.success("Category updated successfully! 🎉", {
          id: loadingToast,
        });
      } else {
        await createCategory({
          name: formData.name,
          slug: formData.slug
        });
        toast.success("Category created successfully! 🎉", {
          id: loadingToast,
        });
      }

      resetForm();
      fetchCategories();
    } catch (err) {
      toast.error("Something went wrong", {
        id: loadingToast,
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     EDIT
  ========================= */
  const handleEdit = (category) => {
    setFormData({
      id: category._id,
      name: category.name,
      slug: category.slug
    });
    setIsEditing(true);

    toast.success("Editing mode activated", {
      icon: '✏️',
      duration: 2000,
    });

    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* =========================
     DELETE
  ========================= */
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirm) return;

    const loadingToast = toast.loading("Deleting category...");

    try {
      setLoading(true);
      await deleteCategory(id);
      toast.success("Category deleted successfully! 🗑️", {
        id: loadingToast,
      });
      fetchCategories();
    } catch (err) {
      toast.error("Delete failed", {
        id: loadingToast,
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     UI
  ========================= */
  return (
    <div className="category-page">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <div className="header-icon">📁</div>
          <div>
            <h1 className="page-title">Categories</h1>
            <p className="page-subtitle">
              Manage your product categories
            </p>
          </div>
        </div>

        <div className="header-stats">
          <div className="stat-badge">
            <span className="stat-number">
              {categories.length}
            </span>
            <span className="stat-label">Total Categories</span>
          </div>
        </div>
      </div>

      <div className="categories-container">
        {/* ADD / EDIT FORM */}
        <div className="category-card form-card">
          <div className="card-header">
            <h3 className="card-title">
              {isEditing ? "✏️ Edit Category" : "➕ Add New Category"}
            </h3>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit} className="category-form">
              <div className="form-group">
                <label>Category Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-actions">
                {isEditing && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                )}

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading
                    ? "Please wait..."
                    : isEditing
                    ? "Update Category"
                    : "Add Category"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* CATEGORY LIST */}
        <div className="category-card list-card">
          <div className="card-header">
            <h3 className="card-title">📋 All Categories</h3>
          </div>

          <div className="card-body">
            {loading ? (
              <p>Loading...</p>
            ) : categories.length === 0 ? (
              <p>No categories found</p>
            ) : (
              <table className="category-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Slug</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {categories.map((cat) => (
                    <tr key={cat._id}>
                      <td>{cat.name}</td>
                      <td>{cat.slug}</td>
                      <td className="actions">
                        <button
                          className="action-btn edit-btn"
                          onClick={() => handleEdit(cat)}
                        >
                          Edit
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => handleDelete(cat._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}