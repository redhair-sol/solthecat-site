import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        padding: "2rem",
        textAlign: "center"
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          fontSize: "2rem",
          marginBottom: "1rem",
          fontWeight: "bold"
        }}
      >
        Welcome to <span style={{ color: "#aa4dc8" }}>SOLadventures</span>, the journey of a queen
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ fontSize: "1.1rem", color: "#333", marginBottom: "2rem" }}
      >
        Fluffy. Fierce. Fabulous. 🐾🐾🐾
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Link
          to="/episodes"
          style={{
            padding: "0.8rem 1.5rem",
            backgroundColor: "#aa4dc8",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            marginBottom: "1.5rem",
            display: "inline-block"
          }}
        >
          View the Journey
        </Link>
      </motion.div>

      <motion.a
        href="https://www.instagram.com/solthecat01/"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        style={{
          color: "#aa4dc8",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          fontWeight: "normal",
          fontSize: "0.95rem"
        }}
      >
        <img
          src="/icons/instagram-icon.png"
          alt="Instagram"
          style={{
            width: "18px",
            height: "18px",
            marginRight: "0.4rem",
            verticalAlign: "middle"
          }}
        />
        Follow on Instagram
      </motion.a>
    </motion.div>
  );
}
