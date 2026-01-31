import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const AdminPanel = () => {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token') || '');
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('admin_token'));
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', category: '', images: [] });
  const [discount, setDiscount] = useState({ name: '', discountType: '', value: '', products: '', startDate: '', endDate: '' });
  const [message, setMessage] = useState('');

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/auth/login`, loginData, { withCredentials: true });
      setToken(res.data.token);
      localStorage.setItem('admin_token', res.data.token);
      setIsLoggedIn(true);
      setMessage('Login successful!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  // Optional: Add logout functionality
  const handleLogout = () => {
    setToken('');
    setIsLoggedIn(false);
    localStorage.removeItem('admin_token');
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/product/all`, { headers: { Authorization: `Bearer ${token}` } });
      setProducts(res.data.products || []);
    } catch (err) {
      setMessage('Failed to fetch products');
    }
  };

  // Add product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('name', form.name);
      data.append('description', form.description);
      data.append('category', form.category);
      if (form.images && form.images.length > 0) {
        for (let i = 0; i < form.images.length; i++) {
          data.append('images', form.images[i]);
        }
      }
      await axios.post(`${API}/product/add`, data, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Product added!');
      fetchProducts();
    } catch (err) {
      setMessage('Add product failed');
    }
  };

  // Remove product
  const handleRemoveProduct = async (id) => {
    try {
      await axios.delete(`${API}/product/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setMessage('Product removed!');
      fetchProducts();
    } catch (err) {
      setMessage('Remove failed');
    }
  };

  // Change price
  const handlePriceChange = async (id, newPrice) => {
    try {
      await axios.put(`${API}/product/update/${id}`, { pricePerUnit: newPrice }, { headers: { Authorization: `Bearer ${token}` } });
      setMessage('Price updated!');
      fetchProducts();
    } catch (err) {
      setMessage('Price update failed');
    }
  };

  // Add discount
  const handleAddDiscount = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/discount/add`, discount, { headers: { Authorization: `Bearer ${token}` } });
      setMessage('Discount added!');
    } catch (err) {
      setMessage('Add discount failed');
    }
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('admin_token', token);
    }
  }, [token]);

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f6fb' }}>
        <form onSubmit={handleLogin} style={{ maxWidth: 360, width: '100%', padding: 36, borderRadius: 16, boxShadow: '0 4px 32px #0002', background: '#fff', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <h2 style={{ textAlign: 'center', marginBottom: 12, fontWeight: 700, fontSize: 28, color: '#222' }}>Admin Login</h2>
          <label style={{ fontWeight: 500, color: '#444', marginBottom: 4 }}>Username</label>
          <input placeholder="Username" value={loginData.username} onChange={e => setLoginData({ ...loginData, username: e.target.value })} style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 16, marginBottom: 8 }} />
          <label style={{ fontWeight: 500, color: '#444', marginBottom: 4 }}>Password</label>
          <input type="password" placeholder="Password" value={loginData.password} onChange={e => setLoginData({ ...loginData, password: e.target.value })} style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 16, marginBottom: 8 }} />
          <button type="submit" style={{ padding: 12, borderRadius: 8, background: '#2d6cdf', color: '#fff', border: 'none', fontWeight: 600, fontSize: 16, marginTop: 8, cursor: 'pointer', boxShadow: '0 2px 8px #2d6cdf22' }}>Login</button>
          <div style={{ color: 'crimson', minHeight: 24, textAlign: 'center', fontWeight: 500 }}>{message}</div>
        </form>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6fb', padding: '2rem 0' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #0001', padding: 32 }}>
          <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 12, color: '#2d6cdf' }}>Admin Panel</h2>
          <button onClick={fetchProducts} style={{ marginBottom: 16, padding: '8px 18px', borderRadius: 8, background: '#2d6cdf', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 8px #2d6cdf22' }}>Refresh Products</button>
          <div style={{ color: '#d32f2f', minHeight: 24, fontWeight: 500 }}>{message}</div>
        </div>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {/* Add Product Form */}
          <form onSubmit={handleAddProduct} style={{ flex: 1, minWidth: 320, background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #0001', padding: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h3 style={{ fontWeight: 600, fontSize: 20, marginBottom: 8, color: '#222' }}>Add Product</h3>
            <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 15 }} />
            <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 15 }} />
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value, images: [] })} style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 15 }}>
              <option value="">Select Category</option>
              <option value="home">Home</option>
              <option value="industrial">Industrial</option>
            </select>
            {form.category === 'home' && (
              <>
                <label style={{ fontWeight: 500, color: '#444', marginTop: 8 }}>Upload 2 Product Images</label>
                <input type="file" accept="image/*" multiple={false} onChange={e => {
                  const files = Array.from(e.target.files);
                  setForm(f => ({ ...f, images: [files[0], files[1]].filter(Boolean) }));
                }} style={{ marginBottom: 8 }} />
                <input type="file" accept="image/*" multiple={false} onChange={e => {
                  const files = Array.from(e.target.files);
                  setForm(f => ({ ...f, images: [f.images[0], files[0]].filter(Boolean) }));
                }} style={{ marginBottom: 8 }} />
              </>
            )}
            {form.category === 'industrial' && (
              <>
                <label style={{ fontWeight: 500, color: '#444', marginTop: 8 }}>Upload Product Image</label>
                <input type="file" accept="image/*" multiple={false} onChange={e => {
                  const files = Array.from(e.target.files);
                  setForm(f => ({ ...f, images: [files[0]] }));
                }} style={{ marginBottom: 8 }} />
              </>
            )}
            <button type="submit" style={{ padding: 12, borderRadius: 8, background: '#2d6cdf', color: '#fff', border: 'none', fontWeight: 600, fontSize: 16, marginTop: 8, cursor: 'pointer', boxShadow: '0 2px 8px #2d6cdf22' }}>Add Product</button>
          </form>
          {/* Add Discount Form */}
          <form onSubmit={handleAddDiscount} style={{ flex: 1, minWidth: 320, background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #0001', padding: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h3 style={{ fontWeight: 600, fontSize: 20, marginBottom: 8, color: '#222' }}>Add Discount</h3>
            <input placeholder="Name" value={discount.name} onChange={e => setDiscount({ ...discount, name: e.target.value })} style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 15 }} />
            <input placeholder="Discount Type (PERCENTAGE/FLAT)" value={discount.discountType} onChange={e => setDiscount({ ...discount, discountType: e.target.value })} style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 15 }} />
            <input placeholder="Value" value={discount.value} onChange={e => setDiscount({ ...discount, value: e.target.value })} style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 15 }} />
            <input placeholder="Products (IDs, comma separated)" value={discount.products} onChange={e => setDiscount({ ...discount, products: e.target.value.split(',') })} style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 15 }} />
            <input placeholder="Start Date" value={discount.startDate} onChange={e => setDiscount({ ...discount, startDate: e.target.value })} style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 15 }} />
            <input placeholder="End Date" value={discount.endDate} onChange={e => setDiscount({ ...discount, endDate: e.target.value })} style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 15 }} />
            <button type="submit" style={{ padding: 12, borderRadius: 8, background: '#2d6cdf', color: '#fff', border: 'none', fontWeight: 600, fontSize: 16, marginTop: 8, cursor: 'pointer', boxShadow: '0 2px 8px #2d6cdf22' }}>Add Discount</button>
          </form>
        </div>
        {/* Products List */}
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #0001', padding: 32 }}>
          <h3 style={{ fontWeight: 600, fontSize: 20, marginBottom: 12, color: '#222' }}>Products</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {products.map((p) => (
              <li key={p._id} style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#f7fafd', borderRadius: 10, padding: 16, boxShadow: '0 1px 4px #0001' }}>
                <span style={{ flex: 1, fontWeight: 500, color: '#2d6cdf' }}>{p.name}</span>
                <span style={{ minWidth: 80, color: '#333' }}>₹{p.pricePerUnit}</span>
                <button onClick={() => handleRemoveProduct(p._id)} style={{ padding: '6px 14px', borderRadius: 6, background: '#d32f2f', color: '#fff', border: 'none', fontWeight: 500, cursor: 'pointer' }}>Remove</button>
                <input type="number" placeholder="New Price" onBlur={e => handlePriceChange(p._id, e.target.value)} style={{ padding: 8, borderRadius: 6, border: '1px solid #cbd5e1', width: 100 }} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
