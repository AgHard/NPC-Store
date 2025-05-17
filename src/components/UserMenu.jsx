import { Link } from "react-router-dom";
import { useContext } from "react";
import { FiChevronDown } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import AnimatedLogoutButton from "./AnimatedLogoutButton";
import { FiShoppingCart, FiHeart } from "react-icons/fi";

export default function UserMenu({ hoveredNav, setHoveredNav, handleLogout }) {
  const { user } = useContext(AuthContext);

  const goldColor = "#FFD700";
  const fontFamily = "'Cairo', sans-serif";
  const bgColor = "#121212";

  if (!user) {
    return (
      <>
        <Link
          to="/login"
          style={{
            padding: "6px 16px",
            borderRadius: "999px",
            fontSize: "14px",
            fontWeight: 600,
            backgroundColor: "#fff",
            color: "#000",
            fontFamily,
            transition: "background 0.3s ease",
            marginRight: "8px",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#ddd")}
          onMouseLeave={(e) => (e.target.style.background = "#fff")}
        >
          Login
        </Link>
        <Link
          to="/signup"
          style={{
            padding: "6px 16px",
            borderRadius: "999px",
            fontSize: "14px",
            fontWeight: 600,
            fontFamily,
            color: "#fff",
            border: "1px solid #fff",
            transition: "all 0.3s ease",
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
    );
  }

  return (
    <div
      style={{ position: "relative", fontFamily }}
      onMouseEnter={() => setHoveredNav("user")}
      onMouseLeave={() => setHoveredNav(null)}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 16px",
          backgroundColor: "#1e1e1e",
          borderRadius: "999px",
          cursor: "pointer",
          color: "#fff",
          transition: "background 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#2a2a2a")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#1e1e1e")}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            backgroundColor: "#fff",
            color: "#000",
            borderRadius: "999px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          {user.username.charAt(0).toUpperCase()}
        </div>
        <span style={{ fontSize: "14px", fontWeight: 600 }}>
          {user.username}
        </span>
        <FiChevronDown size={14} />
      </div>

      <AnimatePresence>
        {hoveredNav === "user" && (
          <motion.div
            key="userDropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              zIndex: 50,
              width: "192px",
              padding: "8px 0",
              backgroundColor: "#1e1e1e",
              color: "#fff",
              fontSize: "14px",
              borderRadius: "10px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
              marginTop: "8px",
            }}
          >
            <Link
  to="/cartdetails"
  style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 16px",
    color: "#fff",
    textDecoration: "none",
    transition: "background 0.2s ease",
  }}
  onMouseEnter={(e) => (e.target.style.background = "#2a2a2a")}
  onMouseLeave={(e) => (e.target.style.background = "transparent")}
>
  <FiShoppingCart size={16} />
  View Cart
</Link>
            {/* <Link
              to="/wishlist"
              style={{
                display: "block",
                padding: "10px 16px",
                color: "#fff",
                textDecoration: "none",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#2a2a2a")}
              onMouseLeave={(e) => (e.target.style.background = "transparent")}
            >
              View Wishlist
            </Link> */}
            <AnimatedLogoutButton handleLogout={handleLogout} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
