// import React from 'react';
// import { Tilt } from 'react-tilt';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { fadeIn } from '../utils/motion';

// const GameCard = ({ index, id, name, image_url, selected, onClick }) => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     if (onClick) {
//       onClick();
//     } else {
//       navigate(`/games/${id}`);
//     }
//   };

//   return (
//     <Tilt options={{ max: 45, scale: 1, speed: 450 }} className='xs:w-[250px] w-full'>
//   <motion.div
//     initial="hidden"
//     animate="show"
//     variants={fadeIn("right", "spring", index * 0.5, 0.75)}
//     onClick={handleClick}
//     className={`w-full ${selected ? 'border-4 border-yellow-400' : 'green-pink-gradient'} p-[1px] rounded-[20px] shadow-card cursor-pointer`}
//   >
//     {/* <div className='bg-tertiary rounded-[20px] w-full h-[280px] overflow-hidden'>
//       <img
//         src={image_url}
//         alt={name}
//         className='w-full h-full object-cover rounded-[20px]'
//       />
//     </div> */}
//     <div className='bg-tertiary rounded-[20px] w-full h-[280px] flex justify-center items-center overflow-hidden'>
//   <img
//     src={image_url}
//     alt={name}
//     className='w-[95%] h-[95%] object-cover rounded-[16px]'
//   />
// </div>

//   </motion.div>
// </Tilt>

//   );
// };

// export default GameCard;

// import React from 'react';
// import { Tilt } from 'react-tilt';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { fadeIn } from '../utils/motion';

// const GameCard = ({ index, id, name, image_url, selected, onClick }) => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     if (onClick) {
//       onClick();
//     } else {
//       navigate(`/games/${id}`);
//     }
//   };

//   const containerStyle = {
//     position: 'relative',
//     borderRadius: '20px',
//     padding: '1px',
//     overflow: 'hidden',
//     cursor: 'pointer',
//     boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
//   };

//   const animatedBorderStyle = {
//     position: 'absolute',
//     top: '-50%',
//     left: '-50%',
//     width: '200%',
//     height: '200%',
//     background:
//       'linear-gradient(45deg, red, orange, yellow, green, cyan, blue, violet, red)',
//     animation: 'spin 4s linear infinite',
//     opacity: 0.7,
//     zIndex: 0,
//   };

//   const blurredBorderStyle = {
//     ...animatedBorderStyle,
//     filter: 'blur(10px)',
//     zIndex: 0,
//   };

//   const innerCardStyle = {
//     backgroundColor: '#1f1f1f',
//     borderRadius: '20px',
//     width: '100%',
//     height: '280px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     zIndex: 1,
//     position: 'relative',
//   };

//   const imageStyle = {
//     width: '95%',
//     height: '95%',
//     objectFit: 'cover',
//     borderRadius: '16px',
//   };

//   return (
//     <Tilt options={{ max: 45, scale: 1, speed: 450 }} className="xs:w-[250px] w-full">
//       <motion.div
//         initial="hidden"
//         animate="show"
//         variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
//         onClick={handleClick}
//         style={containerStyle}
//       >
//         {/* Animated gradient borders */}
//         <div style={animatedBorderStyle}></div>
//         <div style={blurredBorderStyle}></div>

//         {/* Main content card */}
//         <div style={innerCardStyle}>
//           <img src={image_url} alt={name} style={imageStyle} />
//         </div>
//       </motion.div>

//       {/* Inline keyframe animation */}
//       <style>
//         {`
//           @keyframes spin {
//             0% { transform: rotate(0deg) translate(-50%, -50%); }
//             100% { transform: rotate(360deg) translate(-50%, -50%); }
//           }
//         `}
//       </style>
//     </Tilt>
//   );
// };

// export default GameCard;

import React from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { fadeIn } from '../utils/motion';

const GameCard = ({ index, id, name, image_url, selected, onClick }) => {
  const navigate = useNavigate();

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
              width: '75%',
              height: '75%',
              objectFit: 'cover',
              borderRadius: '16px',
            }}
          />
        </div>

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
