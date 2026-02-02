import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import "../../styles/Categories.css"; // reuse same CSS

import {
  getAllCategories
} from "../../api/category.api";

import {
  getAllSubCategories,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory
} from "../../api/subCategories.api";

export default function SubCategories() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    slug: "",
    category: ""
  });

  const [isEditing, setIsEditing] = useState(false);

  /* =========================
     FETCH DATA
  ========================= */
  const fetchInitialData = async () => {
    try {
      setLoading(true);

      const [catRes, subCatRes] = await Promise.all([
        getAllCategories(),
        getAllSubCategories()
      ]);

      setCategories(catRes.data.categories || []);
      setSubCategories(subCatRes.data.subCategories || []);
    } catch (err) {
      toast.error("Failed to load sub-categories");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  /* =========================
     FORM HANDLERS
  ========================= */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      id: null,
      name: "",
      slug: "",
      category: ""
    });
    setIsEditing(false);
  };

  /* =========================
     ADD / UPDATE
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.slug || !formData.category) {
      toast.error("All fields are required", {
        icon: '⚠️',
      });
      return;
    }

    setLoading(true);

    const loadingToast = toast.loading(
      isEditing ? "Updating sub-category..." : "Creating sub-category..."
    );

    try {
      const payload = {
        name: formData.name,
        slug: formData.slug,
        category: formData.category
      };

      if (isEditing) {
        await updateSubCategory(formData.id, payload);
        toast.success("Sub-category updated successfully! 🎉", {
          id: loadingToast,
        });
      } else {
        await createSubCategory(payload);
        toast.success("Sub-category created successfully! 🎉", {
          id: loadingToast,
        });
      }

      resetForm();
      fetchInitialData();
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
  const handleEdit = (subCat) => {
    setFormData({
      id: subCat._id,
      name: subCat.name,
      slug: subCat.slug,
      category: subCat.category?._id
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
      "Are you sure you want to delete this sub-category?"
    );
    if (!confirm) return;

    const loadingToast = toast.loading("Deleting sub-category...");

    try {
      setLoading(true);
      await deleteSubCategory(id);
      toast.success("Sub-category deleted successfully! 🗑️", {
        id: loadingToast,
      });
      fetchInitialData();
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
          <div className="header-icon">📂</div>
          <div>
            <h1 className="page-title">Sub Categories</h1>
            <p className="page-subtitle">
              Manage sub-categories under categories
            </p>
          </div>
        </div>

        <div className="header-stats">
          <div className="stat-badge">
            <span className="stat-number">
              {subCategories.length}
            </span>
            <span className="stat-label">Total Sub Categories</span>
          </div>
        </div>
      </div>

      <div className="categories-container">
        {/* FORM */}
        <div className="category-card form-card">
          <div className="card-header">
            <h3 className="card-title">
              {isEditing ? "✏️ Edit Sub Category" : "➕ Add Sub Category"}
            </h3>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit} className="category-form">
              <div className="form-group">
                <label>Sub Category Name</label>
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

              <div className="form-group">
                <label>Parent Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
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
                    ? "Update Sub Category"
                    : "Add Sub Category"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* LIST */}
        <div className="category-card list-card">
          <div className="card-header">
            <h3 className="card-title">📋 All Sub Categories</h3>
          </div>

          <div className="card-body">
            {loading ? (
              <p>Loading...</p>
            ) : subCategories.length === 0 ? (
              <p>No sub-categories found</p>
            ) : (
              <table className="category-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Slug</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {subCategories.map((sub) => (
                    <tr key={sub._id}>
                      <td>{sub.name}</td>
                      <td>{sub.slug}</td>
                      <td>{sub.category?.name}</td>
                      <td className="actions">
                        <button
                          className="action-btn edit-btn"
                          onClick={() => handleEdit(sub)}
                        >
                          Edit
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => handleDelete(sub._id)}
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