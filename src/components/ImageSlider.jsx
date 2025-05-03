import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import marvel from "./images/marvel.jpeg";
import freefire from "./images/ff.jpg";
import fortnite from "./images/fortnite.webp";
import pubg from "./images/pubg.jpg";
import valorant from "./images/valo.webp";

const ImageSlider = () => {
  const [positionIndexes, setPositionIndexes] = useState([0, 1, 2, 3, 4]);

  const handleNext = () => {
    setPositionIndexes((prevIndexes) =>
      prevIndexes.map((prevIndex) => (prevIndex + 1) % 5)
    );
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 3000);
    return () => clearInterval(interval);
  }, []);

  const images = [marvel, freefire, fortnite, pubg, valorant];

  const positions = ["center", "left1", "left", "right", "right1"];

  const imageVariants = {
    center: { x: "0%", scale: 1, zIndex: 5 },
    left1: { x: "-50%", scale: 0.7, zIndex: 3 },
    left: { x: "-90%", scale: 0.5, zIndex: 2 },
    right: { x: "90%", scale: 0.5, zIndex: 1 },
    right1: { x: "50%", scale: 0.7, zIndex: 3 },
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen mt-0 bg-black sm:mt-20 md:mt-28 lg:mt-36 xl:mt-40">
      {images.map((image, index) => (
        <motion.img
          key={index}
          src={image}
          alt="slider-img"
          className="rounded-[12px]"
          initial="center"
          animate={positions[positionIndexes[index]]}
          variants={imageVariants}
          transition={{ duration: 0.5 }}
          style={{ width: "30%", position: "absolute" }}
        />
      ))}
    </div>
  );
};

export default ImageSlider;
