import { api } from "./apiConnector";

// CREATE CATEGORY
export const createCategory = (data) => {
  return api.post("/categories", data);
};

// GET ALL CATEGORIES
export const getAllCategories = () => {
  return api.get("/categories");
};

// UPDATE CATEGORY
export const updateCategory = (id, data) => {
  return api.put(`/categories/${id}`, data);
};

// DELETE CATEGORY
export const deleteCategory = (id) => {
  return api.delete(`/categories/${id}`);
};
