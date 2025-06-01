import React, { useState } from "react";
import SolBrand from "../components/SolBrand";

export default function WhoIsSol() {
  const [language, setLanguage] = useState("en");

  const content = {
    en: {
      title: "💫 Who is Sol the Cat?",
      intro1:
        "Sol isn’t just a cat. She’s a presence. With eyes that mesmerize, the grace of a queen, and the quiet certainty that every corner belongs to her, she’s the soul of SOLadventures. A storyteller with paws that journey from the marble of Athens to the cushions of imagination — and from there, straight to Instagram.",
      intro2:
        "Born in Athens, Sol always knew the world was too small for her. She began as a silent observer — curious, composed, almost philosophical. But somewhere between the Parthenon and her first reel, she became more than a cat. She became a symbol. She became Sol.",
      funFactsTitle: "✨ Fun Facts About Sol",
      funFacts: [
        { label: "Favorite food:", value: "Cooked chicken. With attitude." },
        { label: "Treat of choice:", value: "Tuna mousse. She sniffs. She approves." },
        { label: "Nap spots:", value: "Sunny patches, velvet chairs, your keyboard." },
        { label: "Morning routine:", value: "One dramatic stretch. Three slow blinks." },
        { label: "Hobbies:", value: "Judging humans, starring in reels, ignoring expensive toys." },
        { label: "Dislikes:", value: "Loud noises, closed doors, and the word 'no'." },
        { label: "Secret talent:", value: "Looking royal even mid-yawn." },
        { label: "Zodiac sign:", value: "Virgo ♍." },
        { label: "Favorite human:", value: "Her dad (obviously)." },
      ],
      footer: "Yes, she has staff. You’re one of them now. 🐾",
    },
    el: {
      title: "💫 Ποια είναι η Sol;",
      intro1:
        "Η Sol δεν είναι απλώς μια γάτα. Είναι παρουσία. Με βλέμμα που μαγνητίζει, τη χάρη μιας βασίλισσας και τη σιγουριά ότι κάθε γωνιά της ανήκει, είναι η ψυχή των SOLadventures. Μια αφηγήτρια με πατούσες που ταξιδεύουν από το μάρμαρο της Αθήνας στα μαξιλάρια της φαντασίας — κι από εκεί, κατευθείαν στο Instagram.",
      intro2:
        "Γεννημένη στην Αθήνα, η Sol ήξερε πάντα πως ο κόσμος είναι μικρός για εκείνη. Ξεκίνησε ως σιωπηλή παρατηρήτρια — περίεργη, γαλήνια, σχεδόν φιλοσοφημένη. Μα κάπου ανάμεσα στον Παρθενώνα και το πρώτο της reel, έγινε κάτι παραπάνω από γάτα. Έγινε σύμβολο. Έγινε Sol.",
      funFactsTitle: "✨ Μικρά Μυστικά της Sol",
      funFacts: [
        { label: "Αγαπημένο φαγητό:", value: "Ψητό κοτόπουλο. Με ύφος." },
        { label: "Λιχουδιά:", value: "Μους τόνου. Την μυρίζει. Την εγκρίνει." },
        { label: "Μέρη για ύπνο:", value: "Ηλιόλουστα σημεία, βελούδινες καρέκλες, το πληκτρολόγιό σου." },
        { label: "Πρωινή ρουτίνα:", value: "Ένα δραματικό τέντωμα. Τρία αργά ανοιγοκλεισίματα ματιών." },
        { label: "Χόμπι:", value: "Να κρίνει ανθρώπους, να πρωταγωνιστεί σε reels, να αγνοεί ακριβά παιχνίδια." },
        { label: "Αντιπάθειες:", value: "Οι φασαρίες, οι κλειστές πόρτες και το «όχι»." },
        { label: "Κρυφό ταλέντο:", value: "Να δείχνει βασιλική ακόμη και με χασμουρητό." },
        { label: "Ζώδιο:", value: "Παρθένος ♍." },
        { label: "Αγαπημένος άνθρωπος:", value: "Ο μπαμπάς της (προφανώς)." },
      ],
      footer: "Ναι, έχει προσωπικό. Τώρα είσαι κι εσύ μέλος. 🐾",
    },
  };

  const t = content[language];

  return (
    <div
      className="w-full min-h-screen relative bg-[#fce4ec]"
      style={{
        backgroundImage: "url('/images/sol-watermark.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay blur */}
      <div className="absolute inset-0 backdrop-blur-sm bg-[#fce4ec]/60 z-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8">
        {/* Brand title */}
        <div className="text-center mb-6">
          <SolBrand size="2.5rem" centered />
        </div>

        {/* Language toggle */}
        <div className="flex justify-center gap-3 mb-6">
          <button
            onClick={() => setLanguage("en")}
            className={`px-3 py-1 rounded border ${language === "en" ? "bg-[#f8bbd0]" : "bg-white"}`}
          >
            🇬🇧 English
          </button>
          <button
            onClick={() => setLanguage("el")}
            className={`px-3 py-1 rounded border ${language === "el" ? "bg-[#f8bbd0]" : "bg-white"}`}
          >
            🇬🇷 Ελληνικά
          </button>
        </div>

        {/* Intro */}
        <h1 className="text-3xl font-semibold mb-4 text-[#aa4dc8]">{t.title}</h1>
        <p className="text-lg mb-4">{t.intro1}</p>
        <p className="text-lg mb-6">{t.intro2}</p>

        {/* Fun Facts */}
        <h2 className="text-2xl font-semibold mt-8 mb-3 text-[#aa4dc8]">{t.funFactsTitle}</h2>
        <ul className="list-disc pl-6 text-lg space-y-2 text-[#444]">
          {t.funFacts.map((fact, index) => (
            <li key={index}>
              <strong>{fact.label}</strong> {fact.value}
            </li>
          ))}
        </ul>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-8">{t.footer}</p>
      </div>
    </div>
  );
}
