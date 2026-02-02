import { api } from "./apiConnector";

/*
BACKEND ROUTES:

GET    /api/v1/discount
POST   /api/v1/discount/add
PUT    /api/v1/discount/update/:discountId
DELETE /api/v1/discount/delete/:discountId
*/

// ✅ GET ALL DISCOUNTS
export const getDiscounts = () => {
  return api.get("/discount");
};

// ✅ ADD DISCOUNT
export const addDiscount = (data) => {
  return api.post("/discount/add", data);
};

// ✅ UPDATE DISCOUNT
export const updateDiscount = (discountId, data) => {
  return api.put(`/discount/update/${discountId}`, data);
};

// ✅ DELETE DISCOUNT
export const deleteDiscount = (discountId) => {
  return api.delete(`/discount/delete/${discountId}`);
};
