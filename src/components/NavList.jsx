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
  const [navItems, setNavItems] = useState([]);
  const { collections } = useCollections();
  const [hoveredNav, setHoveredNav] = useState(null);

  useEffect(() => {
    const fetchNavItems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/navItems");
        setNavItems(res.data);
      } catch (err) {
        console.error("Failed to fetch nav items", err);
      }
    };
    fetchNavItems();
  }, []);

  const getCollectionId = (name) => {
    switch (name) {
      case "GiftCards":
        return 1;
      case "Games":
        return 2;
      case "Softwares":
        return 3;
      default:
        return null;
    }
  };

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

      {navItems.map((nav) => {
        const isDropdown = ["GiftCards", "Games", "Softwares"].includes(nav.name);
        const collectionId = getCollectionId(nav.name);
        const dropdownItems = collections.filter(
          (item) => item.collection_id === collectionId
        );

        return (
          <div
            key={nav.id}
            className="relative px-4 py-2"
            onMouseEnter={() => setHoveredNav(nav.name)}
            onMouseLeave={() => setHoveredNav(null)}
          >
            <NavLink
              to={`/${nav.slug}`}
              className={({ isActive }) =>
                `flex items-center gap-1 text-sm font-semibold transition-all duration-200 ${
                  isActive ? "text-white" : "text-white/70 hover:text-white"
                }`
              }
            >
              {nav.name}
              {isDropdown && (
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: hoveredNav === nav.name ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiChevronDown className="mt-[2px] text-sm" />
                </motion.span>
              )}
            </NavLink>

            <AnimatePresence>
              {isDropdown && hoveredNav === nav.name && (
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