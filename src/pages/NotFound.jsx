import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      className="w-full min-h-screen relative bg-[#fce4ec]"
      style={{
        backgroundImage: "url('/images/404.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay blur + tint */}
      <div className="absolute inset-0 backdrop-blur-sm bg-[#fce4ec]/60 z-0"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 min-h-screen">
        <h1 className="text-9xl font-bold text-[#aa4dc8]/60 mb-6">404</h1>
        <p className="text-2xl max-w-3xl text-gray-800 leading-relaxed mb-8">
          This corner of the world hasn’t been explored yet — not even by Sol.
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-3 bg-[#aa4dc8] text-white font-semibold rounded-full shadow-md hover:bg-[#c35ad7] transition"
        >
          Back to safety
        </Link>
      </div>
    </div>
  );
}
