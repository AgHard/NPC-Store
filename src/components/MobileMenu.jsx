import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function MobileMenu({ isMenuOpen, setIsMenuOpen, handleLogout }) {
  const { user } = useContext(AuthContext);
  const [descriptions, setDescriptions] = useState([]);

  useEffect(() => {
    const fetchDescriptions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/collections/descriptions/all");
        const uniqueDescriptions = res.data.map((item) => item.description);
        setDescriptions(uniqueDescriptions);
      } catch (error) {
        console.error("Failed to fetch collection descriptions", error);
      }
    };

    fetchDescriptions();
  }, []);

  const goldColor = "#FFD700";
  const fontFamily = "'Cairo', sans-serif";

  return (
    <div
      style={{
        position: isMenuOpen ? "fixed" : "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        backgroundColor: "#121212",
        color: "white",
        display: isMenuOpen ? "flex" : "none",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease",
        zIndex: 40,
        fontFamily,
      }}
    >
      {/* Close Button */}
      <button
        onClick={() => setIsMenuOpen(false)}
        style={{
          position: "absolute",
          top: "1.25rem",
          right: "1.25rem",
          fontSize: "28px",
          color: goldColor,
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
      >
        <FiX />
      </button>

      {/* Home Link */}
      <Link
        to="/"
        onClick={() => setIsMenuOpen(false)}
        style={{
          padding: "12px 0",
          fontSize: "20px",
          color: "white",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => (e.target.style.color = goldColor)}
        onMouseLeave={(e) => (e.target.style.color = "white")}
      >
        Home
      </Link>

      {/* Dynamic Nav Links */}
      {descriptions.map((desc) => (
        <Link
          key={desc}
          to={`/${desc.toLowerCase()}`}
          onClick={() => setIsMenuOpen(false)}
          style={{
            padding: "12px 0",
            fontSize: "20px",
            color: "white",
            transition: "color 0.2s ease",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => (e.target.style.color = goldColor)}
          onMouseLeave={(e) => (e.target.style.color = "white")}
        >
          {desc}
        </Link>
      ))}

      {/* Auth Section */}
      <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
        {user ? (
          <>
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#fff",
                color: "#000",
                fontWeight: "bold",
                borderRadius: "999px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {user.username.charAt(0).toUpperCase()}
            </div>
            <span style={{ fontSize: "15px", fontWeight: 600 }}>{user.username}</span>
            <Link
              to="/cart"
              onClick={() => setIsMenuOpen(false)}
              style={{
                color: goldColor,
                textDecoration: "none",
                fontSize: "15px",
              }}
            >
              View Cart
            </Link>
            <Link
              to="/wishlist"
              onClick={() => setIsMenuOpen(false)}
              style={{
                color: goldColor,
                textDecoration: "none",
                fontSize: "15px",
              }}
            >
              View Wishlist
            </Link>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }}
              style={{
                color: "#f87171",
                fontSize: "15px",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              style={{
                padding: "8px 20px",
                backgroundColor: "#fff",
                color: "#000",
                borderRadius: "999px",
                fontWeight: 600,
                fontSize: "15px",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#ddd")}
              onMouseLeave={(e) => (e.target.style.background = "#fff")}
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setIsMenuOpen(false)}
              style={{
                padding: "8px 20px",
                border: "1px solid #fff",
                color: "#fff",
                borderRadius: "999px",
                fontWeight: 600,
                fontSize: "15px",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#fff";
                e.target.style.color = "#000";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#fff";
              }}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
