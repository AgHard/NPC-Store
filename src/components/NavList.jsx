import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useCollections } from "../context/CollectionContext";

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -10,
    pointerEvents: "none",
    transition: { duration: 0.2 },
  },
  visible: {
    opacity: 1,
    y: 0,
    pointerEvents: "auto",
    transition: { type: "spring", duration: 0.4, bounce: 0.2 },
  },
};

const NavList = () => {
  const [descriptions, setDescriptions] = useState([]);
  const [hoveredNav, setHoveredNav] = useState(null);
  const { collections } = useCollections();

  useEffect(() => {
    const fetchDescriptions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/collections/descriptions/all");
        const uniqueDescriptions = res.data.map((item) => item.description);
        setDescriptions(uniqueDescriptions);
      } catch (err) {
        console.error("Failed to fetch collection descriptions", err);
      }
    };

    fetchDescriptions();
  }, []);

  const fontFamily = "'Cairo', sans-serif";

  return (
    <div
      className="items-center justify-center flex-1 hidden gap-8 sm:flex"
      style={{ fontFamily }}
    >
      <NavLink
        to="/"
        className={({ isActive }) =>
          `text-sm font-semibold transition-all duration-200 ${
            isActive ? "text-white" : "text-white/70 hover:text-white"
          }`
        }
      >
        Home
      </NavLink>

      {descriptions.map((desc) => {
        const dropdownItems = collections.filter(
          (item) => item.description === desc
        );

        return (
          <div
            key={desc}
            className="relative px-4 py-2"
            onMouseEnter={() => setHoveredNav(desc)}
            onMouseLeave={() => setHoveredNav(null)}
          >
            <NavLink
              to={`/${desc.toLowerCase()}`}
              className={({ isActive }) =>
                `flex items-center gap-1 text-sm font-semibold transition-all duration-200 ${
                  isActive ? "text-white" : "text-white/70 hover:text-white"
                }`
              }
            >
              {desc}
              <motion.span
                initial={{ rotate: 0 }}
                animate={{ rotate: hoveredNav === desc ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FiChevronDown className="mt-[2px] text-sm" />
              </motion.span>
            </NavLink>

            <AnimatePresence>
              {hoveredNav === desc && (
                <motion.div
                  key="dropdown"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="absolute left-0 z-50 w-56 mt-3 overflow-hidden shadow-xl rounded-xl ring-1 ring-gray-800"
                  style={{ backgroundColor: "#1E1E1E", fontFamily }}
                >
                  {dropdownItems.map((item) => (
                    <Link
                      key={item.group_id}
                      to={`/games/${item.group_id}`}
                      className="block px-5 py-3 text-base font-semibold transition border-l-4 border-transparent hover:bg-gray-800 hover:border-yellow-500"
                      style={{ color: "white", fontSize: "14px", transition: "0.2s" }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default NavList;
