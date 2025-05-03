import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { animateWithGsap } from '../utils/animations';
import { useGSAP } from '@gsap/react';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import { useNavigate } from 'react-router-dom';
import GameCard from './GameCard';

const Collections = () => {
  const [groupedCollections, setGroupedCollections] = useState({});

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/collections');
        const grouped = res.data.reduce((acc, collection) => {
          if (!acc[collection.collection_id]) {
            acc[collection.collection_id] = [];
          }
          acc[collection.collection_id].push(collection);
          return acc;
        }, {});
        setGroupedCollections(grouped);
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
    };
    fetchCollections();
  }, []);

  useGSAP(() => {
    animateWithGsap('#features_title', { y: 0, opacity: 1 });
    
  }, []);

  const collectionNames = {
    1: "Gift Cards",
    2: "Games",
    3: "Softwares",
    4: "Valorant Accounts",
  };

  return (
    <>
      <motion.div variants={textVariant()} initial="hidden" animate="show">
        <h1 id="features_title" className="section-heading">
            Explore the Giftcards and Games.
        </h1>
      </motion.div>

      {Object.entries(groupedCollections).map(([collectionId, items]) => (
        <div key={collectionId} className="mt-16">
          <h3 className="text-white text-[24px] font-bold mb-6">
            🏷️ {collectionNames[collectionId] || `Collection ${collectionId}`}
          </h3>
          <div className="flex flex-wrap gap-10">
            {items.map((item, index) => (
              <GameCard
                key={item.id}
                index={index}
                id={item.group_id}
                name={item.name}
                image_url={item.image_url}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default SectionWrapper(Collections, "collections", true);
