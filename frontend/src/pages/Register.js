import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    location: "",
    mobile: "",
    age: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await axios.post(
      "https://ecommerce-backend-m3dz.onrender.com/api/auth/register",
      form
    );

    alert("Registered successfully");

    navigate("/login"); // ✅ redirect after success
  } catch (err) {
    console.log(err);
    alert(err.response?.data?.message || "Registration failed");
  }
};
  return (
    <div style={styles.page}>
      {/* ANIMATIONS */}
      <style>{`
        @keyframes move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes glow {
          0% { text-shadow: 0 0 10px #fff; }
          50% { text-shadow: 0 0 25px #ff4ecd, 0 0 40px #6a5cff; }
          100% { text-shadow: 0 0 10px #fff; }
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
      `}</style>

      {/* BACKGROUND */}
      <div style={styles.bg}></div>

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.header}
      >
        <h1 style={styles.title}>CRS FASHIONS</h1>
        <p style={styles.subtitle}>Luxury • Elegance • Modern Style</p>
      </motion.div>

      {/* MAIN WRAPPER (FIXED ALIGNMENT) */}
      <div style={styles.wrapper}>
        {/* LEFT - WHY CHOOSE US */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          style={styles.side}
        >
          <h2>Why Choose Us?</h2>

          {[
            ["🌍 Global Fashion Trends", "Paris • Milan • New York inspired designs"],
            ["🚀 Fast Delivery", "Lightning-fast doorstep delivery"],
            ["💎 Premium Quality", "Luxury fabrics & finishing"],
            ["👗 Exclusive Designs", "Unique fashion collections"],
            ["🔥 Trending Styles", "Updated daily fashion drops"],
            ["💖 Trusted Brand", "100K+ happy customers"],
          ].map((item, i) => (
            <div key={i} style={styles.card}>
              <h4>{item[0]}</h4>
              <p style={{ opacity: 0.85 }}>{item[1]}</p>
            </div>
          ))}
        </motion.div>

        {/* CENTER FORM */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={styles.formBox}
        >
          <h2>Create Account</h2>

          <form onSubmit={handleSubmit}>
            <input name="username" placeholder="Username" onChange={handleChange} style={styles.input} />
            <input name="email" placeholder="Email" onChange={handleChange} style={styles.input} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} style={styles.input} />

            <input name="mobile" placeholder="Mobile Number" onChange={handleChange} style={styles.input} />
            <input name="age" placeholder="Age" onChange={handleChange} style={styles.input} />

            <select name="gender" onChange={handleChange} style={styles.input}>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <input name="location" placeholder="Location" onChange={handleChange} style={styles.input} />

            <button type="submit" style={styles.button}>
              Register
            </button>
          </form>

          <p style={styles.loginText}>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} style={styles.link}>
              Login
            </span>
          </p>
        </motion.div>

        {/* RIGHT - IDENTITY */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          style={styles.side}
        >
          <h2>Fashion is Identity</h2>

          <p style={{ opacity: 0.85 }}>
            CRS FASHIONS helps you express confidence, elegance, and modern lifestyle through fashion.
          </p>

          {[
            "✨ Personalized Style Recommendations",
            "🎯 Perfect Fit Guarantee",
            "🌟 Celebrity Inspired Fashion",
            "🧵 Designer Handcrafted Wear",
            "💼 Formal + Casual Collection",
          ].map((t, i) => (
            <div key={i} style={styles.highlight}>
              {t}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  page: {
    minHeight: "100vh",
    fontFamily: "Arial",
    color: "white",
    overflow: "hidden",
    position: "relative",
  },

  bg: {
    position: "absolute",
    width: "200%",
    height: "200%",
    background: "linear-gradient(-45deg,#ff3cac,#784ba0,#2b86c5,#ffb347)",
    backgroundSize: "400% 400%",
    animation: "move 12s ease infinite",
    filter: "blur(70px)",
    zIndex: -1,
  },

  header: {
    textAlign: "center",
    padding: "20px",
  },

  title: {
    fontSize: "3.2rem",
    letterSpacing: "6px",
    animation: "glow 3s infinite",
    margin: 0,
  },

  subtitle: {
    opacity: 0.8,
  },

  /* 🔥 FIXED ALIGNMENT */
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start", // IMPORTANT FIX
    maxWidth: "1100px",
    margin: "auto",
    gap: "20px",
    padding: "20px",
  },

  side: {
    width: "300px",
    animation: "float 4s ease-in-out infinite",
  },

  formBox: {
    width: "340px",
    background: "rgba(255,255,255,0.15)",
    padding: "20px",
    borderRadius: "15px",
    backdropFilter: "blur(15px)",
  },

  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "8px",
    border: "none",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: "10px",
    background: "#ff3cac",
    border: "none",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  card: {
    background: "rgba(0,0,0,0.3)",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "12px",
  },

  highlight: {
    background: "rgba(255,255,255,0.1)",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "10px",
  },

  loginText: {
    textAlign: "center",
    marginTop: "10px",
  },

  link: {
    color: "yellow",
    cursor: "pointer",
  },
};