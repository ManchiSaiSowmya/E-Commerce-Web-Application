import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Products({ cartItems = [], onAddToCart }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Modal tracking states
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Filter state: "All" or specific categories
  const [activeFilter, setActiveFilter] = useState("All");

  // Track which product buttons are showing the "Added!" status
  const [addedStatus, setAddedStatus] = useState({});

  // Sums the quantity properties directly inside the array securely
  const totalItemsCount = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => sum + (Number(item.qty) || 0), 0)
    : 0;

  // Local helper to intercept clicks and provide immediate visual feedback
  const handleCartClick = (product) => {
    if (onAddToCart) {
      onAddToCart(product);
      
      // Update the temporary status for this specific item ID
      setAddedStatus((prev) => ({ ...prev, [product.id]: true }));
      
      // Revert the button text back after 1.5 seconds
      setTimeout(() => {
        setAddedStatus((prev) => ({ ...prev, [product.id]: false }));
      }, 1500);
    }
  };

  // Expanded Catalog with exactly 30 products, all utilizing fashion image links
  const [productCatalog] = useState([
    // === TRADITIONAL COLLECTION (6 Products) ===
    { id: "t1", name: "Silk Embroidered Kurta Set", price: 2999, brand: "EthnicVibes", category: "Traditional", rating: "⭐⭐⭐⭐⭐", image: "https://i.etsystatic.com/22368382/r/il/5a3550/4772462985/il_1080xN.4772462985_b9u6.jpg" },
    { id: "t2", name: "Anarkali Suit Set", price: 3499, brand: "Biba", category: "Traditional", rating: "⭐⭐⭐⭐", image: "https://tse4.mm.bing.net/th/id/OIP.U5BKKejjouTXzd3M-tzp6wHaNK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: "t3", name: "Women's Pattu Saree", price: 5999, brand: "Manyavar", category: "Traditional", rating: "⭐⭐⭐⭐⭐", image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500&q=80" },
    { id: "t4", name: "Designer Chikankari Kurti", price: 1899, brand: "House of Chikankari", category: "Traditional", rating: "⭐⭐⭐⭐⭐", image: "https://images.unsplash.com/photo-1608748010899-18f300247112?w=500&q=80" },
    { id: "t5", name: "Velvet Lehenga Choli", price: 7499, brand: "Mohey", category: "Traditional", rating: "⭐⭐⭐⭐⭐", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&q=80" },
    { id: "t6", name: "Men's Cotton Nehru Jacket", price: 1599, brand: "FabIndia", category: "Traditional", rating: "⭐⭐⭐⭐", image: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=500&q=80" },

    // === SAREES COLLECTION (6 Products) ===
    { id: "s1", name: "Banarasi Silk Saree", price: 4500, brand: "Heritage Silk", category: "Sarees", rating: "⭐⭐⭐⭐⭐", image: "https://tse1.mm.bing.net/th/id/OIP.DGgrCYCpaXcjdCH8DAPlswHaLH?r=0&w=1080&h=1620&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: "s2", name: "Kanjeevaram Pattu Saree", price: 5500, brand: "SilkRoute", category: "Sarees", rating: "⭐⭐⭐⭐⭐", image: "https://images.wedmegood.com/uploads/project/13649/1488861370_15676115_1101887719920879_1567610719456296152_o.jpg" },
    { id: "s3", name: "Chanderi Floral Saree", price: 2100, brand: "FabIndia", category: "Sarees", rating: "⭐⭐⭐⭐", image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=500&q=80" },
    { id: "s4", name: "Organza Partywear Saree", price: 3200, brand: "Vasanth", category: "Sarees", rating: "⭐⭐⭐⭐⭐", image: "https://tse3.mm.bing.net/th/id/OIP.q8IobKcqnEo5E9G7_wTM0QHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: "s5", name: "Georgette Bandhani Saree", price: 1850, brand: "KalaNiketan", category: "Sarees", rating: "⭐⭐⭐⭐", image: "https://img.perniaspopupshop.com/catalog/product/g/r/GRJP042326_1.jpg?impolicy=detailimageprod" },
    { id: "s6", name: "Linen Casual Saree", price: 2400, brand: "Suta", category: "Sarees", rating: "⭐⭐⭐⭐⭐", image: "https://tse4.mm.bing.net/th/id/OIP.SoFVvpg_CJ-5cn9jlVfOfAHaKL?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },

    // === MEN'S COLLECTION (6 Products) ===
    { id: "m1", name: "Men's Slim Fit Shirt", price: 1299, brand: "Louis Philippe", category: "Mens", rating: "⭐⭐⭐⭐", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80" },
    { id: "m2", name: "Men's Formal Blazer", price: 4999, brand: "Raymond", category: "Mens", rating: "⭐⭐⭐⭐⭐", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80" },
    { id: "m3", name: "Classic Chino Trousers", price: 1799, brand: "Peter England", category: "Mens", rating: "⭐⭐⭐⭐", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&q=80" },
    { id: "m4", name: "Premium Knit Polo", price: 1499, brand: "Tommy Hilfiger", category: "Mens", rating: "⭐⭐⭐⭐⭐", image: "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?w=500&q=80" },
    { id: "m5", name: "Men's Denim Trucker Shirt", price: 1999, brand: "Roadster", category: "Mens", rating: "⭐⭐⭐⭐", image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=500&q=80" },
    { id: "m6", name: "Water-Resistant Bomber Jacket", price: 3499, brand: "Allen Solly", category: "Mens", rating: "⭐⭐⭐⭐⭐", image: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=500&q=80" },

    // === WESTERN COLLECTION (6 Products) ===
    { id: "w1", name: "Pure Cotton T-Shirt", price: 799, brand: "adidas", category: "Western", rating: "⭐⭐⭐⭐⭐", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&q=80" },
    { id: "w2", name: "Designer Summer Dress", price: 1599, brand: "zara", category: "Western", rating: "⭐⭐⭐⭐⭐", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80" },
    { id: "w3", name: "Casual Denim Jacket", price: 2499, brand: "levis", category: "Western", rating: "⭐⭐⭐⭐", image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&q=80" },
    { id: "w4", name: "High-Waist Cropped Jeans", price: 2199, brand: "H&M", category: "Western", rating: "⭐⭐⭐⭐⭐", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80" },
    { id: "w5", name: "Floral Satin Jumpsuit", price: 2799, brand: "Mango", category: "Western", rating: "⭐⭐⭐⭐", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&q=80" },
    { id: "w6", name: "Oversized Knit Sweater", price: 1899, brand: "UNIQLO", category: "Western", rating: "⭐⭐⭐⭐⭐", image: "https://images.unsplash.com/photo-1574164904299-3a102b110380?w=500&q=80" },

    // === ACCESSORIES COLLECTION (6 Products) ===
    { id: "a1", name: "Classic Gold Chronograph Watch", price: 3200, brand: "Titan", category: "Accessories", rating: "⭐⭐⭐⭐⭐", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80" },
    { id: "a2", name: "Saffiano Leather Handbag", price: 2800, brand: "Lavie", category: "Accessories", rating: "⭐⭐⭐⭐", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80" },
    { id: "a3", name: "Aviator Sunglasses", price: 1499, brand: "Fastrack", category: "Accessories", rating: "⭐⭐⭐⭐⭐", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80" },
    { id: "a4", name: "Minimalist Leather Wallet", price: 999, brand: "Wildhorn", category: "Accessories", rating: "⭐⭐⭐⭐", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80" },
    { id: "a5", name: "Sterling Silver Pendant Necklace", price: 1250, brand: "Giva", category: "Accessories", rating: "⭐⭐⭐⭐⭐", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80" },
    { id: "a6", name: "Canvas Travel Duffle Bag", price: 2200, brand: "Wildcraft", category: "Accessories", rating: "⭐⭐⭐⭐", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80" }
  ]);

  const sectionCategories = ["Traditional", "Sarees", "Mens", "Western", "Accessories"];

  // Filter items layout conditionally based on selected tab filter
  const displayedProducts = activeFilter === "All"
    ? productCatalog
    : productCatalog.filter(product => product.category === activeFilter);

  return (
    <div style={styles.page}>
      <style>{`
        @keyframes modalPopUp {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .nav-link-item {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          cursor: pointer;
          transition: 0.3s ease;
          position: relative;
          text-decoration: none;
          padding-bottom: 4px;
        }

        .nav-link-item:hover, 
        .nav-link-item.active {
          color: #088178;
        }

        .nav-link-item::after {
          content: "";
          width: 0;
          height: 2px;
          background: #088178;
          position: absolute;
          bottom: -4px;
          left: 0;
          transition: 0.3s ease;
        }

        .nav-link-item:hover::after, 
        .nav-link-item.active::after {
          width: 100%;
        }

        /* Sub-Navbar Navigation Menu Layout */
        .category-shortcut-bar {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin: 20px 0 40px 0;
          flex-wrap: wrap;
        }
        .category-btn {
          background-color: #f7f8fa;
          border: 1px solid #e2e8f0;
          color: #222;
          padding: 10px 24px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .category-btn:hover, .category-btn.active {
          background-color: #088178;
          color: #fff;
          border-color: #088178;
          box-shadow: 0 4px 10px rgba(8, 129, 120, 0.15);
        }
        .category-btn:hover {
          transform: translateY(-2px);
        }
      `}</style>

      {/* NAVBAR SECTION */}
      <nav style={styles.navbar}>
        <div style={styles.logo} onClick={() => navigate("/dashboard")}>
          CRS FASHIONS<span style={{ color: "#088178" }}>.</span>
        </div>
        
        <div style={styles.navLinks}>
          <span className={`nav-link-item ${location.pathname === "/dashboard" ? "active" : ""}`} onClick={() => navigate("/dashboard")}>Home</span>
          <span className={`nav-link-item ${location.pathname === "/products" ? "active" : ""}`} onClick={() => navigate("/products")}>Products</span>
          <span className={`nav-link-item ${isAboutOpen ? "active" : ""}`} onClick={() => setIsAboutOpen(true)}>About</span>
          <span className={`nav-link-item ${isContactOpen ? "active" : ""}`} onClick={() => setIsContactOpen(true)}>Contact</span>
          
          <span 
            className={`nav-link-item ${location.pathname === "/cart" ? "active" : ""}`} 
            onClick={() => navigate("/cart")}
            style={styles.bagWrapper}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              style={styles.bagSvg}
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            
            {totalItemsCount > 0 && (
              <span style={styles.cartBadge}>{totalItemsCount}</span>
            )}
          </span>

          <button style={styles.logoutBtn} onClick={() => {
            localStorage.removeItem("loggedInUser");
            localStorage.removeItem("token");
             navigate("/login");
              }}>
            Logout 🚪
            </button>
        </div>
      </nav>

      {/* PRODUCTS CATALOG CONTAINER */}
      <div style={styles.container}>
        <h2 style={styles.sectionTitle}>Shop Our Collections</h2>
        <p style={styles.sectionSub}>Explore handpicked styles customized for your needs</p>

        {/* SECTION NAVBAR FILTER CONTROLS */}
        <div className="category-shortcut-bar">
          <button 
            className={`category-btn ${activeFilter === "All" ? "active" : ""}`} 
            onClick={() => setActiveFilter("All")}
          >
            All Products
          </button>
          {sectionCategories.map((category) => (
            <button 
              key={category} 
              className={`category-btn ${activeFilter === category ? "active" : ""}`} 
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* DYNAMIC PRODUCT VIEWPORT MATRIX */}
        <div style={styles.sectionBlock}>
          <h3 style={styles.categoryHeading}>
            {activeFilter === "All" ? "All Products Collection" : `${activeFilter} Collection`}
          </h3>
          
          <div style={styles.productGrid}>
            {displayedProducts.map((product) => {
              const isAdded = addedStatus[product.id];
              return (
                <div key={product.id} style={styles.productCard}>
                  <img src={product.image} alt={product.name} style={styles.productImg} />
                  <div style={styles.productDetails}>
                    <span style={styles.productBrand}>{product.brand}</span>
                    <h5 style={styles.productName}>{product.name}</h5>
                    <div style={styles.rating}>{product.rating}</div>
                    <div style={styles.productPriceRow}>
                      <span style={styles.productPrice}>₹{product.price}</span>
                      <button 
                        style={{
                          ...styles.addCartIconBtn,
                          backgroundColor: isAdded ? "#088178" : "#e8f6ea",
                          color: isAdded ? "#fff" : "#088178"
                        }} 
                        onClick={() => handleCartClick(product)}
                      >
                        {isAdded ? "✓" : "🛒"}
                      </button>
                    </div>
                    {/* FULL WIDTH DEDICATED ADD TO CART BUTTON WITH TOGGLE STATE */}
                    <button 
                      style={{
                        ...styles.fullWidthAddCartBtn,
                        backgroundColor: isAdded ? "#13a89e" : "#088178"
                      }} 
                      onClick={() => handleCartClick(product)}
                    >
                      {isAdded ? "Added! ✓" : "Add To Cart"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ABOUT MODAL OVERLAY */}
      {isAboutOpen && (
        <div style={styles.modalOverlay} onClick={() => setIsAboutOpen(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeModalBtn} onClick={() => setIsAboutOpen(false)}>×</button>
            <h2 style={styles.modalTitle}>About CRS FASHIONS</h2>
            <div style={styles.divider}></div>
            <p style={styles.modalText}>
              Welcome to <strong>CRS FASHIONS</strong>, your ultimate destination for modern, high-quality, and trendy clothing. Inspired by global aesthetics and local comforts, we curate styles designed to make you stand out.
            </p>
            <p style={styles.modalText}>
              From premium cotton staples to show-stopping designer wears, our vision is built heavily around sustainable fashion metrics, unparalleled customer service, and fast delivery timelines.
            </p>
          </div>
        </div>
      )}

      {/* CONTACT MODAL OVERLAY */}
      {isContactOpen && (
        <div style={styles.modalOverlay} onClick={() => setIsContactOpen(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeModalBtn} onClick={() => setIsContactOpen(false)}>×</button>
            <h2 style={styles.modalTitle}>Contact Us</h2>
            <div style={styles.divider}></div>
            <div style={styles.contactContainer}>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>📍</span>
                <div style={styles.contactDetails}>
                  <strong>Headquarters Address</strong>
                  <p style={styles.contactSubText}>123 Fashion Street, Sector 4, New Delhi, India</p>
                </div>
              </div>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>📞</span>
                <div style={styles.contactDetails}>
                  <strong>Phone / Support</strong>
                  <p style={styles.contactSubText}>+91 95600 95600 / +91 11 2345 6789</p>
                </div>
              </div>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>✉️</span>
                <div style={styles.contactDetails}>
                  <strong>Email Address</strong>
                  <p style={styles.contactSubText}>support@crsfashions.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: { fontFamily: "'League Spartan', sans-serif, Arial", backgroundColor: "#ffffff", minHeight: "100vh", margin: 0, padding: 0 },
  navbar: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 80px", backgroundColor: "#E3E6F3", boxShadow: "0 5px 15px rgba(0, 0, 0, 0.06)", position: "sticky", top: 0, zIndex: 100 },
  logo: { fontSize: "24px", fontWeight: "bold", color: "#222", cursor: "pointer", letterSpacing: "1px" },
  navLinks: { display: "flex", alignItems: "center", gap: "35px" },
  bagWrapper: { position: "relative", display: "inline-flex", alignItems: "center" },
  bagSvg: { width: "20px", height: "20px", verticalAlign: "middle" },
  cartBadge: { position: "absolute", top: "-10px", right: "-12px", backgroundColor: "#088178", color: "#fff", fontSize: "10px", borderRadius: "50%", width: "16px", height: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700" },
  logoutBtn: { fontSize: "14px", fontWeight: "700", color: "#fff", backgroundColor: "#de4c4c", border: "none", padding: "8px 16px", borderRadius: "4px", cursor: "pointer", transition: "background-color 0.2s ease" },
  container: { padding: "40px 80px", maxWidth: "1200px", margin: "0 auto", textAlign: "center" },
  sectionTitle: { fontSize: "40px", margin: "0 0 10px 0", color: "#222", fontWeight: "700" },
  sectionSub: { fontSize: "16px", color: "#606063", margin: "0 0 10px 0" },
  sectionBlock: { marginBottom: "60px", textAlign: "left" },
  categoryHeading: { fontSize: "26px", color: "#222", fontWeight: "700", borderBottom: "2px solid #088178", paddingBottom: "8px", marginBottom: "20px", display: "inline-block" },
  productGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "30px", paddingTop: "10px" },
  productCard: { width: "100%", padding: "12px", border: "1px solid #cce7d0", borderRadius: "25px", backgroundColor: "#fff", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between" },
  productImg: { width: "100%", borderRadius: "20px", objectFit: "cover", height: "250px", backgroundColor: "#f0f0f0" },
  productDetails: { textAlign: "left", padding: "10px 0 0 0", display: "flex", flexDirection: "column", flexGrow: 1 },
  productBrand: { color: "#606063", fontSize: "12px" },
  productName: { color: "#222", fontSize: "14px", margin: "5px 0", minHeight: "36px" },
  rating: { fontSize: "12px", color: "#f3b519", margin: "5px 0" },
  productPriceRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px", marginBottom: "15px" },
  productPrice: { fontSize: "15px", fontWeight: "700", color: "#088178" },
  addCartIconBtn: { width: "40px", height: "40px", borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", transition: "all 0.2s ease" },
  fullWidthAddCartBtn: { width: "100%", padding: "10px 0", color: "#ffffff", border: "none", borderRadius: "8px", fontWeight: "700", fontSize: "14px", cursor: "pointer", transition: "background-color 0.2s ease", marginTop: "auto" },
  
  // Modals Styling Matrix
  modalOverlay: { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0, 0, 0, 0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2000 },
  modalContent: { backgroundColor: "#ffffff", padding: "40px", borderRadius: "15px", maxWidth: "520px", width: "90%", boxShadow: "0 20px 40px rgba(0,0,0,0.3)", position: "relative", animation: "modalPopUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards" },
  closeModalBtn: { position: "absolute", top: "15px", right: "20px", fontSize: "28px", background: "none", border: "none", cursor: "pointer", color: "#606063" },
  modalTitle: { fontSize: "28px", color: "#222", margin: "0 0 10px 0", textAlign: "center" },
  divider: { width: "60px", height: "3px", backgroundColor: "#088178", margin: "0 auto 25px auto" },
  modalText: { fontSize: "15px", color: "#465b52", lineHeight: "22px", marginBottom: "15px", textAlign: "center" },
  contactContainer: { display: "flex", flexDirection: "column", gap: "20px", textAlign: "left" },
  contactItem: { display: "flex", alignItems: "flex-start", gap: "15px" },
  contactIcon: { fontSize: "22px", backgroundColor: "#e8f6ea", padding: "10px", borderRadius: "50%", display: "inline-block", lineHeight: "1" },
  contactDetails: { fontSize: "16px", color: "#222" },
  contactSubText: { margin: "4px 0 0 0", fontSize: "14px", color: "#465b52" }
};

export default Products;