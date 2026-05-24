import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Dashboard({ cartItems = [] }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const features = [
    { id: 1, title: "Free Shipping", bg: "#fddde4", icon: "🚚" },
    { id: 2, title: "Online Order", bg: "#cdebbc", icon: "⏰" },
    { id: 3, title: "Save Money", bg: "#d1e8f2", icon: "🐷" },
    { id: 4, title: "Promotions", bg: "#cdd4f8", icon: "💳" },
    { id: 5, title: "Happy Sell", bg: "#f6dbf6", icon: "👥" },
    { id: 6, title: "24/7 Support", bg: "#fff2e5", icon: "🎧" },
  ];

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
      @keyframes modalPopUp {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
      @keyframes toastSlideIn {
        from { transform: translateY(100px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
    `;
    document.head.appendChild(styleSheet);

    setProducts([
      { id: "1", name: "Pure Cotton T-Shirt", price: 799, brand: "adidas", rating: "⭐⭐⭐⭐⭐", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500" },
      { id: "2", name: "Designer Summer Dress", price: 1599, brand: "zara", rating: "⭐⭐⭐⭐⭐", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500" },
      { id: "3", name: "Casual Denim Jacket", price: 2499, brand: "levis", rating: "⭐⭐⭐⭐", image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500" },
      { id: "4", name: "Classic White Sneakers", price: 1899, brand: "nike", rating: "⭐⭐⭐⭐⭐", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500" },
    ]);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const triggerNotification = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("loggedInUser");
  sessionStorage.clear();

  triggerNotification("Logging out securely...");

  setTimeout(() => {
    navigate("/login");
  }, 1000);
};

  return (
    <div style={styles.page}>
      <style>{`
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
      `}</style>

      {/* MATCHING NAVBAR SECTION */}
      <nav style={styles.navbar}>
        <div style={styles.logo} onClick={() => navigate("/dashboard")}>
          CRS FASHIONS<span style={{ color: "#088178" }}>.</span>
        </div>
        <div style={styles.navLinks}>
          <span className={`nav-link-item ${location.pathname === "/dashboard" ? "active" : ""}`} onClick={() => navigate("/dashboard")}>Home</span>
          <span className={`nav-link-item ${location.pathname === "/products" ? "active" : ""}`} onClick={() => navigate("/products")}>Products</span>
          <span className="nav-link-item" onClick={() => setIsAboutOpen(true)}>About</span>
          <span className="nav-link-item" onClick={() => setIsContactOpen(true)}>Contact</span>
          
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

          <button style={styles.logoutBtn} onClick={handleLogout}>
              Logout 🚪
          </button>
        </div>
      </nav>

      {/* HERO BANNER SECTION */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h4 style={styles.heroSub}>Trade-in-offer</h4>
          <h1 style={styles.heroTitleMain}>Super value deals</h1>
          <h1 style={{ ...styles.heroTitleMain, color: "#088178" }}>On all products</h1>
          <p style={styles.heroText}>Save more with coupons & up to 70% off!</p>
          <button style={styles.heroBtn} onClick={() => navigate("/products")}>Shop Now</button>
        </div>
      </section>

      {/* FEATURES ROW */}
      <section style={styles.featuresSection}>
        {features.map((item) => (
          <div 
            key={item.id} 
            style={{
              ...styles.featureCard,
              boxShadow: hoveredCard === item.id ? "0 10px 25px rgba(0, 0, 0, 0.08)" : "0 4px 12px rgba(0, 0, 0, 0.03)"
            }}
            onMouseEnter={() => setHoveredCard(item.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={styles.featureIcon}>{item.icon}</div>
            <span style={{ ...styles.featureBadge, backgroundColor: item.bg }}>
              {item.title}
            </span>
          </div>
        ))}
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      <section style={styles.productsSection}>
        <h2 style={styles.sectionTitle}>Featured Products</h2>
        <p style={styles.sectionSub}>Summer Collection New Modern Design</p>
        
        <div style={styles.productGrid}>
          {products.map((product) => (
            <div 
              key={product.id} 
              style={{
                ...styles.productCard,
                boxShadow: hoveredProduct === product.id ? "0 12px 30px rgba(0,0,0,0.08)" : "0 6px 18px rgba(0,0,0,0.02)"
              }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <img src={product.image} alt={product.name} style={styles.productImg} />
              <div style={styles.productDetails}>
                <span style={styles.productBrand}>{product.brand}</span>
                <h5 style={styles.productName}>{product.name}</h5>
                <div style={styles.rating}>{product.rating}</div>
                <div style={styles.productPriceRow}>
                  <span style={styles.productPrice}>₹{product.price}</span>
                  <button 
                    style={styles.addCartBtn}
                    onClick={(e) => {
                      e.stopPropagation(); 
                      triggerNotification(`${product.name} added to cart! 🛒`);
                    }}
                  >
                    🛒
                  </button>
                </div>
              </div>
            </div>
            
          ))}
        </div>
        <button><a href="Products.js">View Products</a></button>
      </section>

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

      {toastMessage && <div style={styles.toastNotification}>{toastMessage}</div>}
    </div>
  );
}

const styles = {
  page: { fontFamily: "'League Spartan', sans-serif, Arial", backgroundColor: "#ffffff", margin: 0, padding: 0, boxSizing: "border-box", minHeight: "100vh" },
  navbar: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 80px", backgroundColor: "#E3E6F3", boxShadow: "0 5px 15px rgba(0, 0, 0, 0.06)", position: "sticky", top: 0, zIndex: 100 },
  logo: { fontSize: "24px", fontWeight: "bold", color: "#222", cursor: "pointer", letterSpacing: "1px" },
  navLinks: { display: "flex", alignItems: "center", gap: "35px" },
  bagWrapper: { position: "relative", display: "inline-flex", alignItems: "center" },
  bagSvg: { width: "20px", height: "20px", verticalAlign: "middle" },
  cartBadge: { position: "absolute", top: "-10px", right: "-12px", backgroundColor: "#088178", color: "#fff", fontSize: "10px", borderRadius: "50%", width: "16px", height: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700" },
  logoutBtn: { fontSize: "14px", fontWeight: "700", color: "#fff", backgroundColor: "#de4c4c", border: "none", padding: "8px 16px", borderRadius: "4px", cursor: "pointer", transition: "background-color 0.2s ease" },
  hero: { height: "70vh", width: "100%", backgroundImage: "linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.2)), url('https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600')", backgroundSize: "cover", backgroundPosition: "top 20% right 0", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", padding: "0 80px", boxSizing: "border-box" },
  heroContent: { display: "flex", flexDirection: "column", alignItems: "flex-start" },
  heroSub: { fontSize: "20px", paddingBottom: "15px", color: "#222", margin: 0 },
  heroTitleMain: { fontSize: "46px", lineHeight: "54px", color: "#222", margin: 0, fontWeight: "700" },
  heroText: { fontSize: "16px", color: "#465b52", margin: "15px 0 30px 0" },
  heroBtn: { backgroundImage: "url('https://raw.githubusercontent.com/tech2etc/build-and-deploy-ecommerce-website/main/img/button.png')", backgroundColor: "transparent", color: "#088178", border: "none", padding: "14px 80px 14px 65px", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "contain", cursor: "pointer", fontWeight: "700", fontSize: "15px" },
  featuresSection: { display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", padding: "40px 80px", gap: "25px" },
  featureCard: { width: "140px", textAlign: "center", padding: "25px 15px", border: "1px solid #cce7d0", borderRadius: "4px", display: "flex", flexDirection: "column", gap: "15px", transition: "box-shadow 0.3s ease" },
  featureIcon: { fontSize: "40px" },
  featureBadge: { display: "inline-block", padding: "6px 8px", borderRadius: "4px", color: "#088178", fontSize: "12px", fontWeight: "600" },
  productsSection: { padding: "40px 80px", textAlign: "center" },
  sectionTitle: { fontSize: "40px", margin: "0 0 10px 0", color: "#222" },
  sectionSub: { fontSize: "16px", color: "#606063", margin: "0 0 30px 0" },
  productGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "30px", paddingTop: "20px" },
  productCard: { width: "100%", padding: "12px", border: "1px solid #cce7d0", borderRadius: "25px", cursor: "pointer", transition: "box-shadow 0.2s ease", backgroundColor: "#fff", boxSizing: "border-box" },
  productImg: { width: "100%", borderRadius: "20px", objectFit: "cover", height: "250px" },
  productDetails: { textAlign: "left", padding: "10px 0 0 0" },
  productBrand: { color: "#606063", fontSize: "12px" },
  productName: { color: "#222", fontSize: "14px", margin: "5px 0" },
  rating: { fontSize: "12px", color: "#f3b519", margin: "5px 0" },
  productPriceRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" },
  productPrice: { fontSize: "15px", fontWeight: "700", color: "#088178" },
  addCartBtn: { width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#e8f6ea", color: "#088178", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" },
  
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
  contactSubText: { margin: "4px 0 0 0", fontSize: "14px", color: "#465b52" },
  toastNotification: { position: "fixed", bottom: "30px", right: "30px", backgroundColor: "#088178", color: "#ffffff", padding: "15px 25px", borderRadius: "8px", fontWeight: "600", boxShadow: "0 8px 24px rgba(8, 129, 120, 0.25)", zIndex: 3000, animation: "toastSlideIn 0.25s ease-out forwards" }
};

export default Dashboard;