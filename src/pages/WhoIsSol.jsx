import React, { useState } from "react";

export default function WhoIsSol() {
  const [language, setLanguage] = useState("en");

  const content = {
    en: {
      title: "Who is Sol the Cat?",
      intro1:
        "Sol the Cat isn’t just a feline — she’s the queen of calm chaos, the muse of marble temples and velvet cushions. She’s the heart of SOLadventures, a paw-some storyteller who roams rooftops, cobblestones, and camera lenses.",
      intro2:
        "Born in Athens, Sol always knew she was destined for more than nap spots and scratching posts. She began her journey as a quiet observer of humans — but somewhere between the Parthenon and her first Instagram reel, she became a feline icon.",
      funFactsTitle: "✨ Fun Facts About Sol",
      funFacts: [
        { label: "Favorite food:", value: "Cooked chicken. With attitude." },
        { label: "Treat of choice:", value: "Tuna mousse. She sniffs. She approves." },
        { label: "Nap spots:", value: "Sunny patches, velvet chairs, your keyboard." },
        { label: "Morning routine:", value: "One dramatic stretch. Three slow blinks." },
        { label: "Hobbies:", value: "Judging humans, starring in reels, ignoring expensive toys." },
        { label: "Dislikes:", value: "Loud noises, closed doors, and the word 'no'." },
        { label: "Secret talent:", value: "Looking royal even mid-yawn." },
        { label: "Zodiac sign:", value: "Virgo ♍ (obviously)." },
        { label: "Favorite human:", value: "Her dad." },
      ],
      footer: "Yes, she has staff. You’re one of them now. 🐾",
    },
    el: {
      title: "Ποια είναι η Sol η Γάτα;",
      intro1:
        "Η Sol δεν είναι απλώς μια γάτα – είναι η βασίλισσα της ήσυχης αναστάτωσης, η μούσα των μαρμάρινων ναών και των βελούδινων μαξιλαριών. Είναι η καρδιά των SOLadventures, μια γατίσια αφηγήτρια που περπατά σε σκεπές, λιθόστρωτα και φωτογραφικούς φακούς.",
      intro2:
        "Γεννημένη στην Αθήνα, ήξερε πάντα ότι προοριζόταν για κάτι πέρα από απλούς ύπνους και ξυστράκια. Ξεκίνησε ως παρατηρήτρια των ανθρώπων – αλλά κάπου ανάμεσα στον Παρθενώνα και το πρώτο της reel, έγινε ένα γατίσιο είδωλο.",
      funFactsTitle: "✨ Μικρά Μυστικά της Sol",
      funFacts: [
        { label: "Αγαπημένο φαγητό:", value: "Ψητό κοτόπουλο. Με ύφος." },
        { label: "Λιχουδιά:", value: "Μους τόνου. Την μυρίζει. Την εγκρίνει." },
        { label: "Μέρη για ύπνο:", value: "Ηλιόλουστα σημεία, βελούδινες καρέκλες, το πληκτρολόγιό σου." },
        { label: "Πρωινή ρουτίνα:", value: "Ένα δραματικό τέντωμα. Τρία αργά ανοιγοκλεισίματα ματιών." },
        { label: "Χόμπι:", value: "Να κρίνει ανθρώπους, να πρωταγωνιστεί σε reels, να αγνοεί ακριβά παιχνίδια." },
        { label: "Αντιπάθειες:", value: "Οι φασαρίες, οι κλειστές πόρτες και το «όχι»." },
        { label: "Κρυφό ταλέντο:", value: "Να δείχνει βασιλική ακόμη και με χασμουρητό." },
        { label: "Ζώδιο:", value: "Παρθένος ♍ (προφανώς)." },
        { label: "Αγαπημένος άνθρωπος:", value: "Ο μπαμπάς της." },
      ],
      footer: "Ναι, έχει προσωπικό. Τώρα είσαι κι εσύ. 🐾",
    },
  };

  const t = content[language];

  return (
    <div className="relative w-full min-h-screen bg-[#fce4ec] overflow-hidden">
      {/* Watermark */}
      <img
        src="/images/sol-watermark.png"
        alt="Sol Watermark"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-10 z-0 pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8">
        {/* Language Toggle */}
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

        <h1 className="text-3xl font-semibold mb-4 text-[#aa4dc8]">{t.title}</h1>
        <p className="text-lg mb-4">{t.intro1}</p>
        <p className="text-lg mb-6">{t.intro2}</p>

        <h2 className="text-2xl font-semibold mt-8 mb-3 text-[#aa4dc8]">{t.funFactsTitle}</h2>
        <ul className="list-disc pl-6 text-lg space-y-2 text-[#444]">
          {t.funFacts.map((fact, index) => (
            <li key={index}>
              <strong>{fact.label}</strong> {fact.value}
            </li>
          ))}
        </ul>

        <p className="text-sm text-gray-500 mt-8">{t.footer}</p>
      </div>
    </div>
  );
}
