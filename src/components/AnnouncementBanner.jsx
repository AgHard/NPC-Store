import { motion } from "framer-motion";
import { useAnnouncement } from "../context/AnnouncementContext"; // update the path if needed

const AnnouncementBanner = () => {
  const { activeAnnouncement } = useAnnouncement();

  if (!activeAnnouncement?.is_active || !activeAnnouncement?.message) return null;

  return (
    <div
      style={{
        backgroundColor: "#FFD700",
        color: "#1e1e1e",
        padding: "8px 24px",
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        textAlign: "center",
        zIndex: 100,
        fontWeight: 600,
        fontFamily: "'Cairo', sans-serif",
        overflow: "hidden",
        borderRadius: "999px",
      }}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 0,
          duration: 20,
          ease: "linear",
        }}
        style={{
          display: "inline-block",
          paddingLeft: "100%",
          whiteSpace: "nowrap",
        }}
      >
        {activeAnnouncement.message}
      </motion.div>
    </div>
  );
};

export default AnnouncementBanner;
