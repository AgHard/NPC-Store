import React from 'react';
import { motion } from 'framer-motion';
import { ciciImg, hassanImg, yassenImg, gaberImg } from "../utils";

const textContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const textItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Hero2 = () => {
  const goldColor = "#FFD700";
  const fontFamily = "'Cairo', sans-serif";

  const headingWords = "Power Up Your Games with Instant Game Points.".split(" ");
  const subline = "NPC is your go-to online store for buying game points, credits, and gift cards securely and instantly.";

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        background: "linear-gradient(to bottom right, #2c2c2c, black)",
        color: "white",
        paddingTop: "12rem",
        paddingBottom: "6rem",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily,
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
      }}
    >
      {/* Top Tagline */}
      <motion.h4
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          marginBottom: "1rem",
          textTransform: "uppercase",
          fontWeight: "600",
          fontSize: "14px",
          color: goldColor,
        }}
      >
        Welcome to NPC
      </motion.h4>

      {/* Animated Heading */}
      <motion.h1
        variants={textContainer}
        initial="hidden"
        animate="visible"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          fontSize: "2.5rem",
          fontWeight: "900",
          lineHeight: 1.3,
          marginBottom: "1.5rem",
        }}
      >
        {headingWords.map((word, idx) => (
          <motion.span
            key={idx}
            variants={textItem}
            style={{
              marginRight: "8px",
              color: word === "Instant" || word === "Points." ? "#ccc" : "white",
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>

      {/* Animated Description */}
      <motion.p
        variants={textContainer}
        initial="hidden"
        animate="visible"
        style={{
          maxWidth: "640px",
          marginBottom: "2.5rem",
          fontSize: "16px",
          color: "#bbb",
        }}
      >
        {subline.split(" ").map((word, idx) => (
          <motion.span
            key={idx}
            variants={textItem}
            style={{ marginRight: "5px" }}
          >
            {word}
          </motion.span>
        ))}
      </motion.p>

      {/* Call to Action */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => {
          document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
        }}
        style={{
          padding: "12px 24px",
          backgroundColor: goldColor,
          color: "#000",
          fontWeight: 600,
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "2.5rem",
          transition: "background 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.background = "#e6c200")}
        onMouseLeave={(e) => (e.target.style.background = goldColor)}
      >
        Shop Now
      </motion.button>

      {/* Testimonials */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "8px 16px",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "999px",
          backdropFilter: "blur(6px)",
        }}
      >
        <div style={{ display: "flex", marginRight: "8px" }}>
          {[ciciImg, hassanImg, gaberImg, yassenImg].map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`user${idx}`}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "999px",
                border: "2px solid white",
                marginLeft: idx > 0 ? "-10px" : 0,
                backgroundColor: "#000",
              }}
            />
          ))}
        </div>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)" }}>
          Trusted by 10,000+ gamers
        </p>
      </motion.div>
    </motion.section>
  );
};

export default Hero2;
