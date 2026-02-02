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
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ================= FETCH DATA ================= */
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

        // Apply discounts to products
        const productsWithDiscounts = allProducts.map((product) => {
          const now = new Date();
          
          // Find active discount for this product
          const activeDiscount = allDiscounts.find((discount) => {
            const isActive = 
              new Date(discount.startDate) <= now && 
              new Date(discount.endDate) >= now;
            
            const hasProduct = discount.products.some(
              (p) => (typeof p === "string" ? p : p._id) === product._id
            );
            
            return isActive && hasProduct;
          });

          if (activeDiscount) {
            const discountValue = activeDiscount.value;
            const discountType = activeDiscount.discountType;
            
            let finalPrice;
            if (discountType === "percentage") {
              finalPrice = product.price - (product.price * discountValue / 100);
            } else {
              finalPrice = product.price - discountValue;
            }

            return {
              ...product,
              originalPrice: product.price,
              finalPrice: Math.max(0, Math.round(finalPrice)),
              discount: discountType === "percentage" ? discountValue : null,
              discountAmount: discountType === "flat" ? discountValue : null,
              hasDiscount: true
            };
          }

          return {
            ...product,
            originalPrice: product.price,
            finalPrice: product.price,
            hasDiscount: false
          };
        });

        setProducts(productsWithDiscounts);
        setDiscounts(allDiscounts);
        
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ================= GROUP BY CATEGORY ================= */
  const getProductsByCategory = () => {
    const grouped = {};
    
    products.forEach((product) => {
      const categoryName = product.subCategory?.category?.name || 
                          product.subCategory?.name || 
                          "Other";
      
      if (!grouped[categoryName]) {
        grouped[categoryName] = [];
      }
      grouped[categoryName].push(product);
    });

    return grouped;
  };

  /* ================= MODAL HANDLERS ================= */
  useEffect(() => {
    if (selectedProduct) {
      setSelectedImageIndex(0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedProduct]);

  const handlePrevImage = () => {
    if (!selectedProduct) return;
    setSelectedImageIndex((prev) =>
      prev === 0 ? selectedProduct.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!selectedProduct) return;
    setSelectedImageIndex((prev) =>
      prev === selectedProduct.images.length - 1 ? 0 : prev + 1
    );
  };

  const productsByCategory = getProductsByCategory();

  /* ================= LOADING STATE ================= */
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

  /* ================= ERROR STATE ================= */
  if (error) {
    return (
      <>
        <Nav />
        <div className="products-error">
          <div className="error-icon">⚠️</div>
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
        <Footer />
      </>
    );
  }

  /* ================= EMPTY STATE ================= */
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

  /* ================= MAIN UI ================= */
  return (
    <>
      <Nav />

      <div className="products-page">
    

        {/* Products by Category */}
        <section className="products-content">
          {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
            <div key={category} className="category-block">
              <div className="category-heading">
                <div className="heading-left">
                  <h2>{category}</h2>
                  <span className="product-count">
                    {categoryProducts.length} {categoryProducts.length === 1 ? 'item' : 'items'}
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
                    {/* Discount Badge */}
                    {product.hasDiscount && (
                      <div className="sale-badge">
                        {product.discount 
                          ? `-${product.discount}%` 
                          : `-₹${product.discountAmount}`
                        }
                      </div>
                    )}

                    {/* Product Image */}
                    <div className="card-image">
                      <img
                        src={product.images?.[0]?.url || "/placeholder.jpg"}
                        alt={product.name}
                        loading="lazy"
                      />
                      <div className="image-overlay">
                        <span>View Details</span>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="card-content">
                      <h3 className="product-title">{product.name}</h3>
                      
                      <p className="product-category">
                        {product.subCategory?.name}
                      </p>

                      <div className="price-section">
                        <span className="current-price">
                          ₹{product.finalPrice.toLocaleString()}
                        </span>
                        {product.hasDiscount && (
                          <span className="original-price">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="product-modal" onClick={() => setSelectedProduct(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              className="modal-close"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close modal"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="modal-grid">
              {/* Image Gallery */}
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

                {/* Thumbnails */}
                {selectedProduct.images?.length > 1 && (
                  <div className="gallery-thumbs">
                    {selectedProduct.images.map((img, idx) => (
                      <button
                        key={idx}
                        className={`thumb ${idx === selectedImageIndex ? "active" : ""}`}
                        onClick={() => setSelectedImageIndex(idx)}
                      >
                        <img src={img.url} alt="" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="modal-info">
                <div className="info-header">
                  <span className="info-category">
                    {selectedProduct.subCategory?.category?.name || selectedProduct.subCategory?.name}
                  </span>
                  <h2 className="info-title">{selectedProduct.name}</h2>
                </div>

                <div className="info-price">
                  <span className="price-current">
                    ₹{selectedProduct.finalPrice.toLocaleString()}
                  </span>
                  {selectedProduct.hasDiscount && (
                    <>
                      <span className="price-original">
                        ₹{selectedProduct.originalPrice.toLocaleString()}
                      </span>
                      <span className="price-discount">
                        {selectedProduct.discount 
                          ? `${selectedProduct.discount}% OFF` 
                          : `₹${selectedProduct.discountAmount} OFF`
                        }
                      </span>
                    </>
                  )}
                </div>

                {selectedProduct.description && (
                  <div className="info-description">
                    <h4>About this product</h4>
                    <p>{selectedProduct.description}</p>
                  </div>
                )}

                <div className="info-meta">
                  <div className="meta-item">
                    <span className="meta-label">Category</span>
                    <span className="meta-value">
                      {selectedProduct.subCategory?.category?.name || "N/A"}
                    </span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Sub Category</span>
                    <span className="meta-value">
                      {selectedProduct.subCategory?.name || "N/A"}
                    </span>
                  </div>
                  {selectedProduct.hasDiscount && (
                    <div className="meta-item highlight">
                      <span className="meta-label">You Save</span>
                      <span className="meta-value savings">
                        ₹{(selectedProduct.originalPrice - selectedProduct.finalPrice).toLocaleString()}
                      </span>
                    </div>
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