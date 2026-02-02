import { api } from "./apiConnector";

/*
  Backend routes (as per tera backend):

  GET    /api/v1/product
  POST   /api/v1/product
  PUT    /api/v1/product/:id
  DELETE /api/v1/product/:id

  Extra routes (already in backend, future use):
  PATCH  /api/v1/product/:id/toggle-status
  PATCH  /api/v1/product/:id/toggle-discount
  DELETE /api/v1/product/image
*/

/* ======================
   BASIC CRUD
====================== */

// 🔹 GET ALL PRODUCTS
export const getProducts = () => {
  return api.get("/product");
};

// 🔹 CREATE PRODUCT
// payload: { name, price, description, subCategory }
export const createProduct = (data) => {
  return api.post("/product", data);
};

// 🔹 UPDATE PRODUCT
export const updateProduct = (id, data) => {
  return api.put(`/product/${id}`, data);
};

// 🔹 DELETE PRODUCT
export const deleteProduct = (id) => {
  return api.delete(`/product/${id}`);
};

/* ======================
   EXTRA (BACKEND READY)
====================== */

// 🔸 TOGGLE PRODUCT ACTIVE / INACTIVE
export const toggleProductStatus = (id) => {
  return api.patch(`/product/${id}/toggle-status`);
};

// 🔸 TOGGLE DISCOUNT ON / OFF
export const toggleProductDiscount = (id) => {
  return api.patch(`/product/${id}/toggle-discount`);
};

// 🔸 DELETE PRODUCT IMAGE
// payload: { productId, public_id }
export const deleteProductImage = (data) => {
  return api.delete("/product/image", { data });
};
