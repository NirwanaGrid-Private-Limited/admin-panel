const calculateFinalPrice = (price, discount) => {
  if (!discount) return price;

  if (discount.discountType === "percentage") {
    return Math.round(price - (price * discount.value) / 100);
  } else if (discount.discountType === "flat") {
    return Math.max(0, price - discount.value);
  }

  return price;
};

module.exports = calculateFinalPrice;