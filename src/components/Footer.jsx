import React from "react";
import { motion } from "framer-motion";
import {
  FaDiscord,
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { logoImg } from "../utils/";

const Footer = () => {
  const goldColor = "#FFD700";
  const mutedGray = "#BBBBBB";
  const bgColor = "#121212";
  const cardBg = "#1E1E1E";
  const fontFamily = "'Cairo', sans-serif";

  return (
    <motion.footer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{
        backgroundColor: bgColor,
        color: "white",
        fontFamily,
        paddingTop: "3rem",
        paddingBottom: "2rem",
        borderTop: "1px solid #2c2c2c",
      }}
    >
      <div
        style={{
          display: "grid",
          gap: "2rem",
          padding: "0 2rem",
          maxWidth: "1200px",
          margin: "0 auto",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          fontSize: "14px",
        }}
      >
        {/* Column 1: Logo and Description */}
        <div>
          <img src={logoImg} alt="Logo" style={{ width: "80px" }} />
          <p style={{ marginTop: "0.5rem", color: mutedGray }}>
            An online store specializing in PUBG products, Fortnite, and all other games. Platforms, software, and services at competitive prices.
          </p>
        </div>

        {/* Column 2: Contact */}
        <div>
          <h4 style={{ marginBottom: "1rem", fontSize: "16px", fontWeight: "600", color: goldColor }}>
            Contact us
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", color: mutedGray }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <FaPhone />
              <span>+201122510769</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <FaEnvelope />
              <span>daber@gmail.com</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <FaDiscord />
              <a href="https://discord.gg" style={{ color: goldColor }}>NPC Store</a>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <FaInstagram />
              <a href="https://instagram.com" style={{ color: goldColor }}>NPC Store</a>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <FaFacebook />
              <a href="https://facebook.com" style={{ color: goldColor }}>NPC Store</a>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <FaWhatsapp />
              <a href="https://wa.me" style={{ color: goldColor }}>NPC Store</a>
            </div>
          </div>
        </div>

        {/* Column 3: Links */}
        <div>
          <h4 style={{ marginBottom: "1rem", fontSize: "16px", fontWeight: "600", color: goldColor }}>
            Important Links
          </h4>
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {[
              { label: "About", to: "/About" },
              { label: "FAQ", to: "/faq" },
              { label: "Contact us", to: "/contactus" },
            ].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  style={{
                    color: mutedGray,
                    transition: "color 0.2s ease, transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = goldColor;
                    e.target.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = mutedGray;
                    e.target.style.transform = "scale(1)";
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Payments */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", alignItems: "center" }}>
          {[
            "applepay.svg", "fawry.svg", "visa.svg", "mastercard.svg",
            "aman.png", "vodafone.svg", "meeza.svg", "gpay.svg",
            "mada.svg", "stc.svg"
          ].map((file) => (
            <img key={file} src={`/payments/${file}`} alt={file} style={{ height: "32px" }} />
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          textAlign: "center",
          fontSize: "13px",
          color: "#666",
          borderTop: "1px solid #2c2c2c",
        }}
      >
        &copy; {new Date().getFullYear()} NPC Store. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
