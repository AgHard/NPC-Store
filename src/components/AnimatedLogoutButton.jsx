import { motion } from "framer-motion";
import { FaDoorOpen } from "react-icons/fa";
import { useState } from "react";

export default function AnimatedLogoutButton({ handleLogout }) {
    const [start, setStart] = useState(false);

  const triggerLogout = () => {
    setStart(true);
    setTimeout(() => handleLogout(), 1200);
  };

  return (
    <motion.button
      onClick={triggerLogout}
      className="flex items-center w-full gap-3 px-4 py-2 overflow-hidden text-left text-white bg-transparent hover:bg-gray-800"
    >
      <motion.div
        animate={start ? { rotate: 90 } : { rotate: 0 }}
        transition={{ duration: 1 }}
      >
        <FaDoorOpen />
      </motion.div>
      <motion.span
        animate={start ? { x: 100, opacity: 0 } : { x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Logout
      </motion.span>
    </motion.button>
  );
}

// import { motion } from "framer-motion";
// import { useState } from "react";

// export function LogoutWalkAway({ handleLogout }) {
//   const [start, setStart] = useState(false);

//   const triggerLogout = () => {
//     setStart(true);
//     setTimeout(() => handleLogout(), 1200);
//   };

//   return (
//     <motion.button
//       onClick={triggerLogout}
//       className="relative flex items-center w-full gap-2 px-4 py-2 overflow-hidden text-left text-white bg-transparent hover:bg-gray-800"
//     >
//       <motion.span
//         initial={{ x: 0 }}
//         animate={start ? { x: -40, opacity: 0 } : { x: 0 }}
//         transition={{ duration: 1 }}
//       >
//         Logout
//       </motion.span>
//       <motion.span
//         initial={{ x: 0 }}
//         animate={start ? { x: 100 } : { x: 0 }}
//         transition={{ duration: 1 }}
//       >
//         🚶‍♂️
//       </motion.span>
//     </motion.button>
//   );
// }
