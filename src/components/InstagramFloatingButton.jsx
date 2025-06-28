import React from "react";
import { Instagram } from "lucide-react";
import { motion } from "framer-motion";

function InstagramFloatingButton() {
  return (
    <motion.a
      href="https://www.instagram.com/solthecat01/"
      target="_blank"
      rel="noopener noreferrer"
      className="block md:hidden fixed bottom-4 right-4 z-50 bg-pink-400 text-white rounded-full p-3 shadow-lg opacity-50"
      aria-label="Follow Sol on Instagram"
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    >
      <Instagram className="w-6 h-6" />
    </motion.a>
  );
}

export default InstagramFloatingButton;
