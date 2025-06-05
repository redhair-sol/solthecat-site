import React, { useState } from "react";
import SolBrand from "../components/SolBrand";

export default function WhoIsSol() {
  const [language, setLanguage] = useState("en");

  const content = {
    en: {
      title: "💫 Who is Sol the Cat?",
      intro1:
        "Sol, known online as solthecat, wasn’t born to go unnoticed. She has the stillness that speaks louder than words, the grace of a queen without a crown, and the step of a cat who knows everything belongs to her. She’s the soul of SOLadventures — a storyteller with paws full of tales, wandering from Athens' marble to the pages of imagination… and then, to Instagram.",
      intro2:
        "Raised in Athens, Sol always felt the windows of her neighborhood were too small for her world. She began quietly — curiosity in her gaze, dignity in her posture. But somewhere between the Parthenon and her first reel, she became more than a cat. She became a symbol. She became Sol.",
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
      contact: "For press or collaborations: ",
    },
    el: {
      title: "💫 Ποια είναι η Sol;",
      intro1:
        "Η Sol, γνωστή στο διαδίκτυο ως solthecat, δεν γεννήθηκε για να περάσει απαρατήρητη. Έχει το βλέμμα της σιωπής που σε καθηλώνει, τη χάρη μιας βασίλισσας που δε χρειάζεται στέμμα και το βήμα μιας γάτας που ξέρει πως όλα της ανήκουν. Είναι η ψυχή των SOLadventures — μια αφηγήτρια με πατούσες γεμάτες ιστορίες, που περιπλανιούνται από τα μάρμαρα της Αθήνας ώς τις σελίδες της φαντασίας… κι από εκεί, στο Instagram.",
      intro2:
        "Μεγαλωμένη στην Αθήνα, η Sol ένιωθε πάντα πως τα παράθυρα της γειτονιάς δεν της έφταναν. Ξεκίνησε σιωπηλά, με περιέργεια στα μάτια και αξιοπρέπεια στο βλέμμα. Κάπου όμως, ανάμεσα στον Παρθενώνα και το πρώτο της reel, έγινε κάτι παραπάνω από γάτα. Έγινε σύμβολο. Έγινε Sol.",
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
      contact: "Για συνεργασίες ή δημοσιογραφική επικοινωνία: ",
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
        <p className="text-sm text-gray-600 mt-2">
          {t.contact}
          <a
            href="mailto:info@solthecat.com"
            className="text-[#aa4dc8] underline hover:text-[#7a3299]"
          >
            info@solthecat.com
          </a>
        </p>
      </div>
    </div>
  );
}
