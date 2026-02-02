import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import "../../styles/Categories.css";

import { getAllCategories } from "../../api/category.api";
import { getAllSubCategories } from "../../api/subCategories.api";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "../../api/product.api";

const generateSlug = (text) =>
  text.toLowerCase().trim().replace(/[\s\W-]+/g, "-");

export default function Products() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    price: "",
    description: "",
    category: "",
    subCategory: ""
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */
  const fetchData = async () => {
    try {
      const [catRes, subRes, prodRes] = await Promise.all([
        getAllCategories(),
        getAllSubCategories(),
        getProducts()
      ]);

      setCategories(catRes.data.categories || []);
      setSubCategories(subRes.data.subCategories || []);
      setProducts(prodRes.data.products || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      setFormData({ ...formData, category: value, subCategory: "" });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  /* ================= IMAGE ADD ================= */
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const total = existingImages.length + newImages.length + files.length;

    if (total > 5) {
      toast.error("Maximum 5 images allowed", {
        icon: '⚠️',
      });
      return;
    }

    setNewImages((prev) => [...prev, ...files]);
    
    const newPreviews = files.map((f) => ({
      url: URL.createObjectURL(f),
      isNew: true
    }));
    
    setPreviews((prev) => [...prev, ...newPreviews]);

    toast.success(`${files.length} image${files.length > 1 ? 's' : ''} added`, {
      icon: '🖼️',
      duration: 2000,
    });

    e.target.value = "";
  };

  /* ================= IMAGE REMOVE ================= */
  const removeImage = (index) => {
    const isExistingImage = index < existingImages.length;

    if (isExistingImage) {
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      const newIndex = index - existingImages.length;
      setNewImages((prev) => prev.filter((_, i) => i !== newIndex));
    }

    setPreviews((prev) => prev.filter((_, i) => i !== index));

    toast.success("Image removed", {
      icon: '🗑️',
      duration: 2000,
    });
  };

  const resetForm = () => {
    setFormData({
      id: null,
      name: "",
      price: "",
      description: "",
      category: "",
      subCategory: ""
    });
    setExistingImages([]);
    setNewImages([]);
    setPreviews([]);
    setIsEditing(false);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.subCategory) {
      toast.error("Please fill all required fields", {
        icon: '⚠️',
      });
      return;
    }

    const form = new FormData();
    form.append("name", formData.name);
    form.append("slug", generateSlug(formData.name));
    form.append("price", formData.price);
    form.append("description", formData.description);
    form.append("subCategory", formData.subCategory);

    if (isEditing && existingImages.length > 0) {
      form.append("existingImages", JSON.stringify(existingImages));
    }

    newImages.forEach((img) => form.append("images", img));

    console.log("FormData contents:");
    for (let pair of form.entries()) {
      console.log(pair[0], pair[1]);
    }

    setLoading(true);

    const loadingToast = toast.loading(
      isEditing ? "Updating product..." : "Creating product..."
    );

    try {
      if (isEditing) {
        await updateProduct(formData.id, form);
        toast.success("Product updated successfully! 🎉", {
          id: loadingToast,
        });
      } else {
        await createProduct(form);
        toast.success("Product created successfully! 🎉", {
          id: loadingToast,
        });
      }

      resetForm();
      await fetchData();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error(
        error.response?.data?.message || "Failed to save product", 
        {
          id: loadingToast,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (product) => {
    setFormData({
      id: product._id,
      name: product.name,
      price: product.price,
      description: product.description || "",
      category: product.subCategory?.category?._id || "",
      subCategory: product.subCategory?._id || ""
    });

    const existingImgs = product.images || [];
    setExistingImages(existingImgs);
    setNewImages([]);

    setPreviews(
      existingImgs.map((img) => ({
        url: img.url,
        isNew: false
      }))
    );

    setIsEditing(true);

    toast.success("Editing mode activated", {
      icon: '✏️',
      duration: 2000,
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product? This action cannot be undone."
    );
    
    if (!confirmDelete) return;
    
    const loadingToast = toast.loading("Deleting product...");

    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully! 🗑️", {
        id: loadingToast,
      });
      await fetchData();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error(
        error.response?.data?.message || "Failed to delete product",
        {
          id: loadingToast,
        }
      );
    }
  };

  /* ================= FILTER SUB CATEGORY ================= */
  const filteredSubCategories = subCategories.filter((sub) => {
    if (!formData.category) return false;
    return (
      sub.category === formData.category ||
      sub.category?._id === formData.category
    );
  });

  /* ================= UI ================= */
  return (
    <div className="category-page">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <div className="header-icon">📦</div>
          <div>
            <h1 className="page-title">Products</h1>
            <p className="page-subtitle">
              Manage your product inventory
            </p>
          </div>
        </div>

        <div className="header-stats">
          <div className="stat-badge">
            <span className="stat-number">
              {products.length}
            </span>
            <span className="stat-label">Total Products</span>
          </div>
        </div>
      </div>

      <div className="categories-container">
        {/* FORM */}
        <div className="category-card form-card">
          <div className="card-header">
            <h3 className="card-title">
              <span className="icon">{isEditing ? "✏️" : "➕"}</span>
              {isEditing ? "Edit Product" : "Add New Product"}
            </h3>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit} className="category-form">
              <div className="form-group">
                <label>Product Name *</label>
                <input 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Price *</label>
                <input 
                  type="number" 
                  name="price" 
                  value={formData.price} 
                  onChange={handleChange}
                  placeholder="Enter price"
                  required
                />
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Sub Category *</label>
                <select 
                  name="subCategory" 
                  value={formData.subCategory} 
                  onChange={handleChange}
                  disabled={!formData.category}
                  required
                >
                  <option value="">
                    {formData.category ? "Select Sub Category" : "First select category"}
                  </option>
                  {filteredSubCategories.map((s) => (
                    <option key={s._id} value={s._id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange}
                  placeholder="Enter product description"
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label>Images (max 5)</label>
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  onChange={handleImageChange}
                  className="file-input"
                />
                <span className="input-hint">
                  {5 - existingImages.length - newImages.length} slots remaining
                </span>
              </div>

              {/* IMAGE PREVIEW */}
              {previews.length > 0 && (
                <div className="image-preview-grid">
                  {previews.map((preview, i) => (
                    <div key={i} className="preview-item">
                      <img 
                        src={preview.url || preview} 
                        alt="preview"
                      />
                      <button
                        type="button"
                        className="remove-image-btn"
                        onClick={() => removeImage(i)}
                      >
                        ×
                      </button>
                      <span className={`image-badge ${preview.isNew === false ? 'existing' : 'new'}`}>
                        {preview.isNew === false ? 'Existing' : 'New'}
                      </span>
                    </div>
                  ))}
                </div>
              )}

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
                  {loading ? "Saving..." : isEditing ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* LIST */}
        <div className="category-card list-card">
          <div className="card-header">
            <h3 className="card-title">
              <span className="icon">📋</span>
              All Products
            </h3>
          </div>

          <div className="card-body">
            {loading ? (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📦</div>
                <h3>No Products Found</h3>
                <p>Add your first product to get started</p>
              </div>
            ) : (
              <div className="table-wrapper">
                <div className="table-container">
                  <table className="category-table">
                    <thead>
                      <tr>
                        <th>
                          <div className="th-content">
                            <span className="th-icon">📦</span>
                            Product
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            <span className="th-icon">💰</span>
                            Price
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            <span className="th-icon">📂</span>
                            Category
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            <span className="th-icon">🖼️</span>
                            Images
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
                      {products.map((p) => (
                        <tr key={p._id}>
                          <td>
                            <div className="category-name">
                              <div className="category-avatar">
                                {p.name.charAt(0).toUpperCase()}
                              </div>
                              <span className="name-text">{p.name}</span>
                            </div>
                          </td>
                          <td>
                            <span className="price-text">₹{p.price}</span>
                          </td>
                          <td>
                            <span className="slug-badge">
                              {p.subCategory?.name || 'N/A'}
                            </span>
                          </td>
                          <td>
                            <div className="product-images">
                              {p.images?.length > 0 ? (
                                <>
                                  {p.images.slice(0, 3).map((img, idx) => (
                                    <img 
                                      key={idx}
                                      src={img.url} 
                                      alt={p.name}
                                      className="product-thumbnail"
                                    />
                                  ))}
                                  {p.images.length > 3 && (
                                    <div className="more-images">
                                      +{p.images.length - 3}
                                    </div>
                                  )}
                                </>
                              ) : (
                                <span className="no-images">No images</span>
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="actions">
                              <button 
                                className="action-btn edit-btn" 
                                onClick={() => handleEdit(p)}
                              >
                                <span>✏️</span>
                                Edit
                              </button>
                              <button 
                                className="action-btn delete-btn" 
                                onClick={() => handleDelete(p._id)}
                              >
                                <span>🗑️</span>
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
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