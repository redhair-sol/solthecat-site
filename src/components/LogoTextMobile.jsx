import { Link } from "react-router-dom";

export default function LogoTextMobile() {
  return (
    <Link to="/" className="hover:opacity-90 transition">
      <div
        style={{
          fontFamily: '"Dancing Script", cursive',
          color: "#aa4dc8", // ή #9253a5 αν προτιμάς πιο βαθύ
          fontWeight: 700,
          fontSize: "2rem",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          lineHeight: 1.1,
        }}
      >
        <span>SOLadventures</span>
        <span style={{ fontSize: "0.9em", transform: "translateY(-2px)" }}>
          👑
        </span>
      </div>
    </Link>
  );
}
