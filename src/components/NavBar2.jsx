import { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { bagImg } from "../utils";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Logo from "./Logo";
import NavList from "./NavList";
import MobileMenu from "./MobileMenu";
import UserMenu from "./UserMenu";
import CartDrawer from "./CartDrawer";

const NavBar2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [collections, setCollections] = useState([]);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const cartRef = useRef();

  const fontFamily = "'Cairo', sans-serif";
  const goldColor = "#FFD700";

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/collections");
        setCollections(res.data);
      } catch (err) {
        console.error("Failed to fetch collections", err);
      }
    };
    fetchCollections();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target) &&
        !event.target.closest('img[alt="Cart"]')
      ) {
        setIsCartOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* Header */}
      <header
        style={{
          position: "fixed",
          zIndex: 50,
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: "1200px",
          padding: "12px 24px",
          backgroundColor: "rgba(28, 28, 28, 0.8)",
          color: "white",
          backdropFilter: "blur(10px)",
          borderRadius: "999px",
          boxShadow: "0 0 10px rgba(255,255,255,0.1)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          fontFamily,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Navigation Content */}
        <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <Logo />
          <NavList />
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }} className="hidden sm:flex">
            {/* Cart Icon */}
            <div style={{ position: "relative" }}>
              <img
                src={bagImg}
                alt="Cart"
                width={18}
                height={18}
                style={{ cursor: "pointer" }}
                onClick={() => setIsCartOpen(!isCartOpen)}
              />
              {/* Dropdown for guests */}
              <AnimatePresence>
                {isCartOpen &&
                  !user && (
                    <motion.div
                      ref={cartRef}
                      key="cartDropdown"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        position: "absolute",
                        right: 0,
                        marginTop: "16px",
                        width: "256px",
                        backgroundColor: "#1e1e1e",
                        borderRadius: "12px",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                        zIndex: 50,
                      }}
                    >
                      <div style={{ padding: "16px" }}>
                        <h3 style={{ borderBottom: "1px solid #333", paddingBottom: "8px", fontSize: "16px", fontWeight: 600 }}>
                          Shopping Cart
                        </h3>
                        <p style={{ paddingTop: "12px", fontSize: "14px", color: "#bbb" }}>
                          You need to be logged in to view your cart.
                        </p>
                        <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
                          <Link
                            to="/login"
                            style={{
                              flex: 1,
                              backgroundColor: goldColor,
                              color: "#000",
                              textAlign: "center",
                              padding: "8px",
                              borderRadius: "8px",
                              fontWeight: 600,
                              textDecoration: "none",
                            }}
                          >
                            Login
                          </Link>
                          <Link
                            to="/signup"
                            style={{
                              flex: 1,
                              backgroundColor: "#fff",
                              color: "#000",
                              textAlign: "center",
                              padding: "8px",
                              borderRadius: "8px",
                              fontWeight: 600,
                              textDecoration: "none",
                            }}
                          >
                            Sign Up
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
              </AnimatePresence>
            </div>

            {/* User menu */}
            <UserMenu
              hoveredNav={hoveredNav}
              setHoveredNav={setHoveredNav}
              handleLogout={handleLogout}
            />
          </div>

          {/* Mobile Toggle */}
          <button
            className="sm:hidden"
            style={{ fontSize: "24px", color: "white" }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </nav>

        {/* Mobile Menu Component */}
        <MobileMenu
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          handleLogout={handleLogout}
        />
      </header>

      {/* Slide-In Cart Drawer (Logged In Only) */}
      <AnimatePresence>
        {isCartOpen && user && (
          <motion.div
            key="cartDrawer"
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              height: "100%",
              zIndex: 99,
            }}
          >
            <CartDrawer setIsCartOpen={setIsCartOpen} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar2;
