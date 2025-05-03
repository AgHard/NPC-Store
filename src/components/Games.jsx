import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import GameCard from './GameCard';

const Games = () => {
  const [games, setGames] = useState([]);
  const fontFamily = "'Cairo', sans-serif";
  const goldColor = "#FFD700";

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/collections");
        const gameCollections = response.data.filter(item => item.collection_id === 2);
        setGames(gameCollections);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
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
        <h2 style={{ fontSize: "2.5rem", fontWeight: 800, color: goldColor }}>
          Games we offer.
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
        Browse our full list of games and discover great deals and top-ups.
      </motion.p>
      {games.length === 0 ? (
        <p className="text-lg text-white">Loading games...</p>
      ) : (
        <div className="flex flex-wrap gap-10 mt-20">
          {games.map((game, index) => (
            <GameCard
              key={game.group_id}
              index={index}
              id={game.group_id}
              name={game.name}
              image_url={game.image_url}
            />
          ))}
        </div>
      )}
    </>
  );
};


export default SectionWrapper(Games, "games", true);
