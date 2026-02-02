import { api } from "./apiConnector";


// 🔹 GET ALL SUB CATEGORIES
export const getAllSubCategories = () => {
  return api.get("/sub-categories");
};

// 🔹 CREATE SUB CATEGORY
export const createSubCategory = (data) => {
  // data = { name, slug, category }
  return api.post("/sub-categories", data);
};

// 🔹 UPDATE SUB CATEGORY
export const updateSubCategory = (id, data) => {
  return api.put(`/sub-categories/${id}`, data);
};

// 🔹 DELETE SUB CATEGORY
export const deleteSubCategory = (id) => {
  return api.delete(`/sub-categories/${id}`);
};
