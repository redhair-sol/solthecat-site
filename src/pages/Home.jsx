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
        textAlign: "center",
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(to bottom, #fff1f9, #fce4ec)"
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          fontSize: "2.7rem",
          marginBottom: "0.3rem",
          fontWeight: 600,
          fontFamily: "'Playfair Display', serif",
          color: "#4a005f",
          textShadow: "0 1px 1px rgba(0, 0, 0, 0.05)",
          fontStyle: "italic"
        }}
      >
        Welcome to{" "}
        <span
          style={{
            color: "#aa4dc8",
            fontFamily: "'Poppins', sans-serif",
            fontStyle: "normal"
          }}
        >
          SOLadventures
        </span>
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        style={{
          fontSize: "1.8rem",
          fontWeight: 600,
          fontFamily: "'Playfair Display', serif",
          color: "#4a005f",
          textShadow: "0 1px 1px rgba(0, 0, 0, 0.05)",
          fontStyle: "italic",
          marginBottom: "1.5rem"
        }}
      >
        the journey of a Queen
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        style={{
          fontSize: "1.3rem",
          fontStyle: "italic",
          fontWeight: 500,
          color: "#6a1b9a",
          marginBottom: "2rem"
        }}
      >
        Fluffy. Fierce. Fabulous.{" "}
        <span style={{ display: "inline-block", lineHeight: 1 }}>
          🐾🐾🐾
        </span>
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <Link
          to="/episodes"
          style={{
            padding: "0.8rem 1.5rem",
            backgroundColor: "#aa4dc8",
            color: "white",
            textDecoration: "none",
            borderRadius: "16px",
            fontWeight: "bold",
            display: "inline-block",
            boxShadow: "0 4px 10px rgba(170, 77, 200, 0.3)",
            transition: "transform 0.2s ease-in-out"
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1.0)")}
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
        transition={{ delay: 1.1 }}
        style={{
          color: "#aa4dc8",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          fontWeight: "normal",
          fontSize: "0.95rem",
          marginTop: "1.5rem"
        }}
      >
        <img
          src="/icons/instagram-icon.png"
          alt="Instagram"
          style={{
            width: "20px",
            height: "20px",
            marginRight: "0.4rem",
            verticalAlign: "middle"
          }}
        />
        Follow on Instagram
      </motion.a>
    </motion.div>
  );
}
