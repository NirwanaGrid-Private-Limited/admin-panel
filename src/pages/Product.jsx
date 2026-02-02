import { useState, useEffect } from "react";
import Nav from "../component/Nev";
import { Footer } from "../component/Footer";
import { getProducts } from "../api/product.api";
import { getDiscounts } from "../api/discount.api";
import "../styles/UserProducts.css";

export default function Product() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [productsRes, discountsRes] = await Promise.all([
          getProducts(),
          getDiscounts()
        ]);

        const allProducts = productsRes.data.products || [];
        const allDiscounts = discountsRes.data.discounts || [];

        console.log("All Products:", allProducts);
        console.log("All Discounts:", allDiscounts);

        // 🔥 Get today's date (without time)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        console.log("Today (normalized):", today);

        const discountMap = {};

        allDiscounts.forEach((discount) => {
          // 🔥 Parse dates and remove time component
          const startDate = new Date(discount.startDate);
          startDate.setHours(0, 0, 0, 0);

          const endDate = new Date(discount.endDate);
          endDate.setHours(23, 59, 59, 999); // End of day

          console.log(`Discount: ${discount.name}`);
          console.log(`Start: ${startDate}, End: ${endDate}, Today: ${today}`);

          // 🔥 Check if discount is active
          const isActive = today >= startDate && today <= endDate;
          console.log(`Is Active: ${isActive}`);

          if (isActive && discount.products?.length > 0) {
            discount.products.forEach((p) => {
              const productId = p._id || p;
              console.log(`Adding to map: ${p.name || productId}`);
              
              discountMap[productId] = {
                discountType: discount.discountType,
                value: discount.value,
                name: discount.name
              };
            });
          }
        });

        console.log("Final Discount Map:", discountMap);

        // 🔥 Apply discounts to products
        const productsWithDiscounts = allProducts.map((product) => {
          const productPrice = product.price || 0;
          const discount = discountMap[product._id];

          console.log(`Product: ${product.name}, ID: ${product._id}, Discount:`, discount);

          if (discount) {
            let finalPrice = productPrice;

            if (discount.discountType === "percentage") {
              finalPrice = productPrice - (productPrice * discount.value) / 100;
            } else {
              finalPrice = productPrice - discount.value;
            }

            finalPrice = Math.max(0, Math.round(finalPrice));

            console.log(`✅ Discount Applied! Original: ${productPrice}, Final: ${finalPrice}`);

            return {
              ...product,
              originalPrice: productPrice,
              finalPrice,
              hasDiscount: true,
              discountType: discount.discountType,
              discountValue: discount.value,
              discountName: discount.name,
              savings: productPrice - finalPrice
            };
          }

          return {
            ...product,
            originalPrice: productPrice,
            finalPrice: productPrice,
            hasDiscount: false,
            discountType: null,
            discountValue: 0,
            discountName: null,
            savings: 0
          };
        });

        console.log("Products with Discounts:", productsWithDiscounts);
        setProducts(productsWithDiscounts);

      } catch (err) {
        console.error("Error:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatPrice = (price) => {
    if (price === undefined || price === null || isNaN(price)) return "0";
    return Number(price).toLocaleString();
  };

  const getProductsByCategory = () => {
    const grouped = {};
    products.forEach((product) => {
      const categoryName = product.subCategory?.category?.name || product.subCategory?.name || "Other";
      if (!grouped[categoryName]) grouped[categoryName] = [];
      grouped[categoryName].push(product);
    });
    return grouped;
  };

  useEffect(() => {
    if (selectedProduct) {
      setSelectedImageIndex(0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedProduct]);

  const handlePrevImage = () => {
    if (!selectedProduct?.images?.length) return;
    setSelectedImageIndex((prev) => prev === 0 ? selectedProduct.images.length - 1 : prev - 1);
  };

  const handleNextImage = () => {
    if (!selectedProduct?.images?.length) return;
    setSelectedImageIndex((prev) => prev === selectedProduct.images.length - 1 ? 0 : prev + 1);
  };

  const productsByCategory = getProductsByCategory();

  if (loading) {
    return (
      <>
        <Nav />
        <div className="products-loading">
          <div className="loader">
            <div className="loader-ring"></div>
            <div className="loader-ring"></div>
            <div className="loader-ring"></div>
          </div>
          <p>Loading Products...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Nav />
        <div className="products-error">
          <div className="error-icon">⚠️</div>
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
        <Footer />
      </>
    );
  }

  if (products.length === 0) {
    return (
      <>
        <Nav />
        <div className="products-empty">
          <div className="empty-icon">📦</div>
          <h2>No Products Available</h2>
          <p>Check back soon for new arrivals!</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className="products-page">
        <section className="products-content">
          {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
            <div key={category} className="category-block">
              <div className="category-heading">
                <div className="heading-left">
                  <h2>{category}</h2>
                  <span className="product-count">
                    {categoryProducts.length} {categoryProducts.length === 1 ? "item" : "items"}
                  </span>
                </div>
                <div className="heading-line"></div>
              </div>

              <div className="products-grid">
                {categoryProducts.map((product) => (
                  <article
                    key={product._id}
                    className="product-card"
                    onClick={() => setSelectedProduct(product)}
                  >
                    {product.hasDiscount && (
                      <div className="sale-badge">
                        {product.discountType === "percentage"
                          ? `-${product.discountValue}%`
                          : `-₹${product.discountValue}`}
                      </div>
                    )}

                    <div className="card-image">
                      <img
                        src={product.images?.[0]?.url || "/placeholder.jpg"}
                        alt={product.name || "Product"}
                        loading="lazy"
                      />
                      <div className="image-overlay">
                        <span>View Details</span>
                      </div>
                    </div>

                    <div className="card-content">
                      <h3 className="product-title">{product.name || "Unnamed"}</h3>
                      <p className="product-category">{product.subCategory?.name || ""}</p>

                      <div className="price-section">
                        <span className="current-price">₹{formatPrice(product.finalPrice)}</span>
                        {product.hasDiscount && (
                          <span className="original-price">₹{formatPrice(product.originalPrice)}</span>
                        )}
                      </div>

                      {product.hasDiscount && product.savings > 0 && (
                        <div className="savings-tag">Save ₹{formatPrice(product.savings)}</div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>

      {selectedProduct && (
        <div className="product-modal" onClick={() => setSelectedProduct(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="modal-grid">
              <div className="modal-gallery">
                <div className="gallery-main">
                  {selectedProduct.images?.length > 1 && (
                    <button className="gallery-nav prev" onClick={handlePrevImage}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>
                  )}
                  <img
                    src={selectedProduct.images?.[selectedImageIndex]?.url || "/placeholder.jpg"}
                    alt={selectedProduct.name}
                    className="main-image"
                  />
                  {selectedProduct.images?.length > 1 && (
                    <button className="gallery-nav next" onClick={handleNextImage}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  )}
                  {selectedProduct.images?.length > 1 && (
                    <div className="image-indicator">
                      {selectedImageIndex + 1} / {selectedProduct.images.length}
                    </div>
                  )}
                </div>
                {selectedProduct.images?.length > 1 && (
                  <div className="gallery-thumbs">
                    {selectedProduct.images.map((img, idx) => (
                      <button
                        key={idx}
                        className={`thumb ${idx === selectedImageIndex ? "active" : ""}`}
                        onClick={() => setSelectedImageIndex(idx)}
                      >
                        <img src={img?.url} alt="" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="modal-info">
                <div className="info-header">
                  <span className="info-category">
                    {selectedProduct.subCategory?.category?.name || selectedProduct.subCategory?.name || "Product"}
                  </span>
                  <h2 className="info-title">{selectedProduct.name}</h2>
                </div>

                <div className="info-price">
                  <span className="price-current">₹{formatPrice(selectedProduct.finalPrice)}</span>
                  {selectedProduct.hasDiscount && (
                    <>
                      <span className="price-original">₹{formatPrice(selectedProduct.originalPrice)}</span>
                      <span className="price-discount">
                        {selectedProduct.discountType === "percentage"
                          ? `${selectedProduct.discountValue}% OFF`
                          : `₹${selectedProduct.discountValue} OFF`}
                      </span>
                    </>
                  )}
                </div>

                {selectedProduct.hasDiscount && selectedProduct.savings > 0 && (
                  <div className="savings-highlight">
                    <span>🎉</span>
                    <span>You save ₹{formatPrice(selectedProduct.savings)} on this product!</span>
                  </div>
                )}

                {selectedProduct.discountName && (
                  <div className="discount-name-badge">
                    <span>🏷️</span>
                    <span>{selectedProduct.discountName}</span>
                  </div>
                )}

                {selectedProduct.description && (
                  <div className="info-description">
                    <h4>About this product</h4>
                    <p>{selectedProduct.description}</p>
                  </div>
                )}

                <div className="info-meta">
                  <div className="meta-item">
                    <span className="meta-label">Category</span>
                    <span className="meta-value">{selectedProduct.subCategory?.category?.name || "N/A"}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Sub Category</span>
                    <span className="meta-value">{selectedProduct.subCategory?.name || "N/A"}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Original Price</span>
                    <span className="meta-value">₹{formatPrice(selectedProduct.originalPrice)}</span>
                  </div>
                  {selectedProduct.hasDiscount && (
                    <>
                      <div className="meta-item">
                        <span className="meta-label">Discount</span>
                        <span className="meta-value" style={{ color: "#dc2626" }}>
                          {selectedProduct.discountType === "percentage"
                            ? `${selectedProduct.discountValue}%`
                            : `₹${selectedProduct.discountValue}`}
                        </span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-label">Final Price</span>
                        <span className="meta-value" style={{ color: "#059669", fontWeight: 700 }}>
                          ₹{formatPrice(selectedProduct.finalPrice)}
                        </span>
                      </div>
                      <div className="meta-item highlight">
                        <span className="meta-label">Total Savings</span>
                        <span className="meta-value savings">₹{formatPrice(selectedProduct.savings)}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}