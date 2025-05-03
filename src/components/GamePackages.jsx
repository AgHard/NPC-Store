import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SectionWrapper } from '../hoc';
import FlipCard from './FlipCard';
import { motion } from 'framer-motion';
import GameCard from './GameCard';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

const GamePackages = () => {
  const { group_id } = useParams();
  const [packages, setPackages] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedRegionId, setSelectedRegionId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fontFamily = "'Cairo', sans-serif";
  const goldColor = "#FFD700";
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [packagesRes, regionsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/games/${group_id}/packages`),
          axios.get(`http://localhost:5000/api/games/${group_id}/regions`)
        ]);

        setPackages(packagesRes.data);
        setRegions(regionsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [group_id]);

  const filteredPackages = selectedRegionId
    ? packages.filter(pkg => pkg.game_id === selectedRegionId)
    : packages;

  return (
    <div className="relative p-6 overflow-hidden rounded-xl">
      {regions.length > 0 && (
        <div className="mb-16">
          <h2 style = {{ fontSize: "2.5rem", fontWeight: 800, color: goldColor }}>Available Regions</h2>
          <div className="flex flex-wrap gap-10">
            {regions.map((region, index) => (
              <GameCard
                key={region.id}
                index={index}
                id={region.id}
                name={region.name}
                image_url={region.image_url}
                onClick={() => setSelectedRegionId(region.id)}
                selected={selectedRegionId === region.id}
              />
            ))}
          </div>
        </div>
      )}

      {selectedRegionId && (
        <button
          onClick={() => setSelectedRegionId(null)}
          className="px-4 py-2 mb-6 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Show All Packages
        </button>
      )}

      <h2 className="mb-6 text-2xl font-bold text-white">ALL Packages</h2>

      {filteredPackages.length === 0 ? (
        <p className="mb-4 text-lg text-white">No packages available for this Section.</p>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
        >
          {filteredPackages.map((pkg) => (
            <motion.div variants={itemVariants} key={pkg.id}>
              <FlipCard pkg={pkg} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default SectionWrapper(GamePackages, 'game-packages');
