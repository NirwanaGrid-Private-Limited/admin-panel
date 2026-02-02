module.exports = function calculateFinalPrice(price, discount) {
  if (!discount) return price;

  if (discount.discountType === "percentage") {
    return price - (price * discount.value) / 100;
  }

  if (discount.discountType === "flat") {
    return Math.max(price - discount.value, 0);
  }

  return price;
};
