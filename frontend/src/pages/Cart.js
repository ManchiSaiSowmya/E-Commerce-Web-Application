import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Cart({ cartItems = [], updateQty, removeItem }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Modal tracking states
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Securely compute subtotals from active array records
  const subtotal = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => acc + (Number(item.price || 0) * Number(item.qty || 0)), 0)
    : 0;

  // Securely sum up individual item quantities for badge indicators
  const totalItemsCount = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => sum + (Number(item.qty) || 0), 0)
    : 0;

  const shipping = 0; // Free shipping rule applied globally

  return (
    <div style={styles.page}>
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
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
      `}</style>

      {/* NAVBAR SECTION */}
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

          <button
          style={styles.logoutBtn}
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("loggedInUser");
            sessionStorage.clear();
            navigate("/login");
            }}
            >
         Logout 🚪
          </button>
        </div>
      </nav>

      {/* MAIN CART CONTENT */}
      <div style={styles.cartContainer}>
        {cartItems.length === 0 ? (
          <div style={styles.emptyCart}>
            <div style={{ fontSize: "60px" }}>🛒</div>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <button style={styles.shopBtn} onClick={() => navigate("/products")}>Go Shopping</button>
          </div>
        ) : (
          <div style={styles.layoutGrid}>
            <div style={styles.itemsColumn}>
              <h2 style={styles.title}>Shopping Cart ({cartItems.length})</h2>
              {cartItems.map(item => (
                <div key={item.id} style={styles.cartCard}>
                  <img src={item.image} alt={item.name} style={styles.itemImg} />
                  <div style={styles.itemDetails}>
                    <span style={styles.itemBrand}>{item.brand}</span>
                    <h4 style={styles.itemName}>{item.name}</h4>
                    <span style={styles.itemPrice}>₹{item.price}</span>
                  </div>
                  <div style={styles.qtyContainer}>
                    <button style={styles.qtyBtn} onClick={() => updateQty && updateQty(item.id, -1)}>−</button>
                    <span style={styles.qtyText}>{item.qty}</span>
                    <button style={styles.qtyBtn} onClick={() => updateQty && updateQty(item.id, 1)}>+</button>
                  </div>
                  <button style={styles.deleteBtn} onClick={() => removeItem && removeItem(item.id)}>✕</button>
                </div>
              ))}
            </div>

            <div style={styles.summaryColumn}>
              <h3 style={styles.summaryTitle}>Order Summary</h3>
              <div style={styles.summaryRow}>
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div style={styles.summaryRow}>
                <span>Shipping</span>
                <span style={{ color: "#088178", fontWeight: "600" }}>FREE</span>
              </div>
              <hr style={styles.hr} />
              <div style={{ ...styles.summaryRow, fontSize: "18px", fontWeight: "700" }}>
                <span>Total</span>
                <span style={{ color: "#088178" }}>₹{subtotal + shipping}</span>
              </div>
              <button style={styles.checkoutBtn} onClick={() => alert("Proceeding to payment Gateway...")}>
                Proceed To Checkout
              </button>
            </div>
          </div>
        )}
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
  page: { fontFamily: "'League Spartan', sans-serif, Arial", backgroundColor: "#f9f9f9", minHeight: "100vh", margin: 0, padding: 0 },
  navbar: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 80px", backgroundColor: "#E3E6F3", boxShadow: "0 5px 15px rgba(0, 0, 0, 0.06)", position: "sticky", top: 0, zIndex: 100 },
  logo: { fontSize: "24px", fontWeight: "bold", color: "#222", cursor: "pointer", letterSpacing: "1px" },
  navLinks: { display: "flex", alignItems: "center", gap: "35px" },
  bagWrapper: { position: "relative", display: "inline-flex", alignItems: "center" },
  bagSvg: { width: "20px", height: "20px", verticalAlign: "middle" },
  cartBadge: { position: "absolute", top: "-10px", right: "-12px", backgroundColor: "#088178", color: "#fff", fontSize: "10px", borderRadius: "50%", width: "16px", height: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700" },
  logoutBtn: { fontSize: "14px", fontWeight: "700", color: "#fff", backgroundColor: "#de4c4c", border: "none", padding: "8px 16px", borderRadius: "4px", cursor: "pointer", transition: "background-color 0.2s ease" },
  cartContainer: { padding: "40px 80px", maxWidth: "1200px", margin: "0 auto" },
  emptyCart: { textAlign: "center", padding: "60px 20px", color: "#606063" },
  shopBtn: { backgroundColor: "#088178", color: "#fff", border: "none", padding: "12px 30px", fontSize: "15px", fontWeight: "600", borderRadius: "4px", cursor: "pointer", marginTop: "15px" },
  layoutGrid: { display: "grid", gridTemplateColumns: "2fr 1fr", gap: "40px", alignItems: "start" },
  itemsColumn: { display: "flex", flexDirection: "column", gap: "20px" },
  title: { margin: "0 0 10px 0", color: "#222" },
  cartCard: { display: "flex", alignItems: "center", backgroundColor: "#fff", padding: "15px 20px", borderRadius: "12px", border: "1px solid #eef2f5", boxShadow: "0 4px 12px rgba(0,0,0,0.01)" },
  itemImg: { width: "80px", height: "90px", objectFit: "cover", borderRadius: "8px", marginRight: "20px" },
  itemDetails: { flex: 1, textAlign: "left" },
  itemBrand: { color: "#606063", fontSize: "12px" },
  itemName: { fontSize: "15px", color: "#222", margin: "3px 0 6px 0" },
  itemPrice: { fontSize: "15px", fontWeight: "700", color: "#088178" },
  qtyContainer: { display: "flex", alignItems: "center", border: "1px solid #eef2f5", borderRadius: "20px", padding: "4px 8px", backgroundColor: "#f9f9f9", marginRight: "30px" },
  qtyBtn: { background: "none", border: "none", fontSize: "16px", cursor: "pointer", padding: "0 10px", fontWeight: "bold" },
  qtyText: { fontSize: "14px", fontWeight: "600", minWidth: "20px", textAlign: "center" },
  deleteBtn: { background: "none", border: "none", fontSize: "16px", color: "#aaa", cursor: "pointer", transition: "color 0.2s" },
  summaryColumn: { backgroundColor: "#fff", padding: "30px", borderRadius: "16px", border: "1px solid #eef2f5", boxShadow: "0 10px 30px rgba(0,0,0,0.02)", animation: "slideInRight 0.5s ease" },
  summaryTitle: { margin: "0 0 20px 0", fontSize: "20px" },
  summaryRow: { display: "flex", justifyContent: "space-between", margin: "12px 0", fontSize: "15px", color: "#465b52" },
  hr: { border: "none", borderTop: "1px solid #eef2f5", margin: "20px 0" },
  checkoutBtn: { width: "100%", backgroundColor: "#088178", color: "#fff", border: "none", padding: "14px 0", fontSize: "16px", fontWeight: "600", borderRadius: "8px", cursor: "pointer", marginTop: "15px", transition: "opacity 0.2s" },
  
  // Modal Layout Specifics
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

export default Cart;