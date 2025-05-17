import React,{useState} from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { fadeIn } from '../utils/motion';

const GameCard = ({ index, id, name, image_url, selected, onClick, region_name }) => {
  const navigate = useNavigate();
  const [selectedRegionId, setSelectedRegionId] = useState(null);
  const fontFamily = "'Cairo', sans-serif";
  const goldColor = "#FFD700";
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/games/${id}`);
    }
  };

  return (
    <Tilt options={{ max: 45, scale: 1, speed: 450 }} className="xs:w-[250px] w-full">
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
        onClick={handleClick}
        style={{
          position: 'relative',
          borderRadius: '20px',
          padding: '1px',
          overflow: 'hidden',
          cursor: 'pointer',
          boxShadow: '0 0 15px rgba(255, 255, 255, 0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.03)';
          e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.1)';
        }}
      >
        {/* Animated gradient border layers */}
        <span style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%',
          height: '3px',
          background: 'linear-gradient(to right, #ff0080, #7928ca)',
          animation: 'slide-right 2s linear infinite',
        }} />
        <span style={{
          position: 'absolute',
          bottom: 0, left: 0,
          width: '100%',
          height: '3px',
          background: 'linear-gradient(to left, #ff0080, #7928ca)',
          animation: 'slide-left 2s linear infinite',
        }} />
        <span style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '3px',
          height: '100%',
          background: 'linear-gradient(to bottom, #ff0080, #7928ca)',
          animation: 'slide-down 2s linear infinite',
        }} />
        <span style={{
          position: 'absolute',
          top: 0, right: 0,
          width: '3px',
          height: '100%',
          background: 'linear-gradient(to top, #ff0080, #7928ca)',
          animation: 'slide-up 2s linear infinite',
        }} />

        {/* Main content card */}
        <div
          style={{
            backgroundColor: '#1f1f1f',
            borderRadius: '20px',
            width: '100%',
            height: '280px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <img
            src={image_url}
            alt={name}
            style={{
              width: '95%',
              height: '95%',
              objectFit: 'cover',
              borderRadius: '16px',
            }}
          />
        </div>
        {region_name && (
        <motion.div
        key={id}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        animate={{ 
          borderColor: selectedRegionId === id ? goldColor : "#444",
          backgroundColor: selectedRegionId === id ? "#1e1e1e" : "#111" 
        }}
        transition={{ type: "spring", stiffness: 300 }}
        className={`cursor-pointer px-4 py-3 rounded-lg border-2 text-white shadow-md font-bold text-center`}
        style={{ fontFamily }}
      >
        {name}
      </motion.div>
      )}

        {/* Inline keyframe animations */}
        <style>
          {`
            @keyframes slide-right {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
            @keyframes slide-left {
              0% { transform: translateX(100%); }
              100% { transform: translateX(-100%); }
            }
            @keyframes slide-down {
              0% { transform: translateY(-100%); }
              100% { transform: translateY(100%); }
            }
            @keyframes slide-up {
              0% { transform: translateY(100%); }
              100% { transform: translateY(-100%); }
            }
          `}
        </style>
      </motion.div>
    </Tilt>
  );
};

export default GameCard;
