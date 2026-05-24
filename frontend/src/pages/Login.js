import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Dynamically set whether we are logging in or registering based on the URL path
  const [isLogin, setIsLogin] = useState(true);
  const [backendStatus] = useState(""); // checking, online, offline
  const [message, setMessage] = useState({ text: "", type: "" }); // type: "error" | "success"
  useEffect(() => {
    // If the browser URL is /register, set mode to false (Registration mode)
    setIsLogin(location.pathname !== "/register");
  }, [location.pathname]);

  // Isolated background check to verify backend connection health on mount
  useEffect(() => {
  if (message.text) {
    const timer = setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 5000); // Clears the message after 5 seconds
    return () => clearTimeout(timer);
  }
}, [message]);

  const [form, setForm] = useState({
    name: "", 
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage({ text: "", type: "" }); // Clear previous message

  const API_BASE_URL = "https://ecommerce-backend-m3dz.onrender.com";

  try {
    if (isLogin) {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email: form.email,
        password: form.password
      });

      

if (res.data.token) {
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("loggedInUser", form.email);
  onLoginSuccess(); // This calls the function from App.js
  navigate("/dashboard");
}
    } else {
      await axios.post(`${API_BASE_URL}/api/auth/register`, form);
      setMessage({ text: "Registration successful! Please login.", type: "success" });
      setIsLogin(true); // Switch to login view
    }
  } catch (err) {
    const errorMsg = err.response?.data?.message || "Invalid email or password";
    setMessage({ text: errorMsg, type: "error" });
  }
};
  return (
    <div style={styles.page}>

      {/* STYLE + ANIMATION */}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-10vh) rotate(360deg); opacity: 0; }
        }

        .float-item {
          position: absolute;
          font-size: 2.5rem;
          animation: floatUp 12s linear infinite;
        }

        .card input:focus {
          outline: none;
          border: 1px solid #ff4b2b;
          box-shadow: 0 0 8px rgba(255,75,43,0.4);
        }

        .btn:hover {
          transform: scale(1.05);
          transition: 0.3s;
        }

        .toggle span:hover {
          text-decoration: underline;
        }
      `}</style>

      {/* Floating Background Items */}
      <div>
        <span className="float-item" style={{ left: "10%", animationDelay: "0s" }}>🛍️</span>
        <span className="float-item" style={{ left: "25%", animationDelay: "2s" }}>👗</span>
        <span className="float-item" style={{ left: "40%", animationDelay: "4s" }}>🧸</span>
        <span className="float-item" style={{ left: "60%", animationDelay: "1s" }}>👕</span>
        <span className="float-item" style={{ left: "75%", animationDelay: "3s" }}>🥿</span>
        <span className="float-item" style={{ left: "90%", animationDelay: "5s" }}>🛒</span>
      </div>

      {/* Main Card */}
      <div style={styles.container}>

        {/* Left Section */}
        <div style={styles.left}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "800", letterSpacing: "1px" }}>CRS FASHIONS</h1>
          <p style={{ marginTop: 15, lineHeight: 1.6, opacity: 0.9 }}>
            Welcome to CRS FASHIONS — your stylish destination for clothing,
            baby wear, fashion accessories, and premium shopping experience.
            We bring comfort, trend, and quality together in one place.
          </p>
        </div>

        {/* Right Section */}
        <div style={styles.right} className="card">
          <h2 style={{ marginBottom: "10px", color: "#333" }}>{isLogin ? "Login" : "Register"}</h2>
          {message.text && (
  <div style={{
    ...styles.errorBanner,
    backgroundColor: message.type === "success" ? "#e8f5e9" : "#ffebee",
    color: message.type === "success" ? "#2e7d32" : "#c62828",
    border: `1px solid ${message.type === "success" ? "#c8e6c9" : "#ffcdd2"}`
  }}>
    {message.text}
  </div>
)}
          {/* Connection Status Banner */}
          {backendStatus === "offline" && (
            <div style={styles.errorBanner}>
              ⚠️ Connection Alert: Your backend Node server appears to be offline on port 5000.
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {!isLogin && (
              <input
                name="name"
                placeholder="Name"
                value={form.name || ""}
                onChange={handleChange}
                style={styles.input}
                required
              />
            )}

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              style={styles.input}
              required
            />

            <button 
              type="submit" 
              style={{
                ...styles.button,
                opacity: backendStatus === "offline" ? 0.6 : 1,
                cursor: backendStatus === "offline" ? "not-allowed" : "pointer"
              }} 
              className="btn"
              disabled={backendStatus === "offline"}
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          <p style={styles.toggle} className="toggle">
              {isLogin ? "New user?" : "Already have an account?"}{" "}
              <span
                onClick={() => isLogin ? navigate("/register") : navigate("/login")}
                style={{ cursor: "pointer", color: "#ff4b2b", fontWeight: "bold" }}
              >
               {isLogin ? "Register" : "Login"}
              </span>
          </p>
          
        </div>
      </div>
    </div>
  );
}

/* INLINE STYLES */
const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
    overflow: "hidden",
    position: "relative",
    fontFamily: "system-ui, -apple-system, sans-serif"
  },

  container: {
    width: "85%",
    maxWidth: "950px",
    display: "flex",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    background: "#fff",
    zIndex: 2
  },

  left: {
    flex: 1,
    background: "linear-gradient(135deg, #ff6a00, #ee0979)",
    color: "white",
    padding: "45px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },

  right: {
    flex: 1,
    padding: "45px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },

  input: {
    width: "100%",
    padding: "12px 14px",
    margin: "8px 0",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "0.95rem",
    boxSizing: "border-box"
  },

  button: {
    width: "100%",
    padding: "13px",
    background: "linear-gradient(90deg, #ff6a00, #ee0979)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "bold",
    marginTop: "12px",
    boxShadow: "0 4px 10px rgba(238, 9, 121, 0.2)"
  },

  toggle: {
    marginTop: "18px",
    textAlign: "center",
    fontSize: "0.9rem",
    color: "#555"
  },

  errorBanner: {
    backgroundColor: "#ffebee",
    color: "#c62828",
    padding: "10px",
    borderRadius: "6px",
    fontSize: "0.8rem",
    fontWeight: "600",
    marginBottom: "15px",
    lineHeight: "1.4",
    border: "1px solid #ffcdd2"
  }
};