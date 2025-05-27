import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import GameCard from "./GameCard";

const GiftCards = () => {
  const [cards, setCards] = useState([]);
  const fontFamily = "'Cairo', sans-serif";
  const goldColor = "#FFD700";

  useEffect(() => {
    const fetchGiftCards = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/collections");
        const giftCardCollections = response.data.filter(item => item.collection_id === 1);
        setCards(giftCardCollections);
      } catch (error) {
        console.error("Error fetching gift cards:", error);
      }
    };

    fetchGiftCards();
  }, []);

  return (
    <>
      <motion.div
        variants={textVariant()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        style={{
          textAlign: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h2 style={{ fontSize: "2.5rem", fontWeight: 800, color: goldColor, marginTop: "2rem" }}>
        Gift Cards.
        </h2>
      </motion.div>
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        style={{
          textAlign: "center",
          maxWidth: "720px",
          margin: "0 auto",
          fontSize: "17px",
          lineHeight: "30px",
          color: "#bbb",
        }}
      >
        Choose from a variety of gift cards available across multiple platforms.
      </motion.p>
      {cards.length === 0 ? (
        <p className="text-lg text-white">Loading gift cards...</p>
      ) : (
        <div className="flex flex-wrap gap-10 mt-20">
          {cards.map((card, index) => (
            <GameCard
              key={card.group_id}
              index={index}
              id={card.group_id}
              name={card.name}
              image_url={card.image_url}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default SectionWrapper(GiftCards, "giftcards", true);
