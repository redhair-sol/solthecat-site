// src/pages/WhoIsSol.jsx

import React from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../context/LanguageContext.jsx";
import PageContainer from "../components/PageContainer.jsx";
import styled from "styled-components";

const WatermarkedContainer = styled(PageContainer)`
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url('/images/sol-watermark.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;  /* γεμίζει όλη την επιφάνεια */
    opacity: 0.3;             /* πιο έντονο watermark */
    z-index: 0;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  max-width: 768px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #6a1b9a;
  margin-bottom: 0.5rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
`;

const IntroText = styled.p`
  font-size: 1rem;
  color: #5b2b7b;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const FunFactsTitle = styled.h2`
  font-size: 1.75rem;
  color: #aa4dc8;
  font-weight: 600;
  margin: 2rem 0 1rem;
`;

const FunFactsList = styled.ul`
  list-style: disc;
  padding-left: 1.5rem;
  text-align: left;
  color: #444;
  font-size: 1rem;
  line-height: 1.6;
`;

const FunFactItem = styled.li`
  margin-bottom: 0.5rem;
`;

const FooterText = styled.p`
  font-size: 0.875rem;
  color: #666;
  margin-top: 2rem;
`;

const ContactLink = styled.a`
  color: #aa4dc8;
  text-decoration: underline;
  &:hover {
    color: #7a3299;
  }
`;

export default function WhoIsSol() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Sol’s Story ✒️",
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
        { label: "Dislikes:", value: `Loud noises, closed doors and the "no" word.` },
        { label: "Secret talent:", value: "Looking royal even mid-yawn." },
        { label: "Zodiac sign:", value: "Virgo ♍." },
        { label: "Favorite human:", value: "Her dad (obviously)." },
      ],
      footer: "Yes, she has staff. You’re one of them now. 🐾",
      contact: "For press or collaborations: ",
    },
    el: {
      title: "Η Ιστορία της Sol ✒️",
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
        { label: "Αντιπάθειες:", value: `Οι φασαρίες, οι κλειστές πόρτες και το "όχι".` },
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
    <>
      <Helmet>
        <title>
          {language === "en"
            ? "Who is Sol the Cat? – SolTheCat"
            : "Ποια είναι η Sol; – SolTheCat"}
        </title>
        <link rel="canonical" href="https://solthecat.com/whoissol" />
      </Helmet>

      <WatermarkedContainer alignTop>
        <Content>
          <Title>{t.title}</Title>
          <IntroText>{t.intro1}</IntroText>
          <IntroText>{t.intro2}</IntroText>
          <FunFactsTitle>{t.funFactsTitle}</FunFactsTitle>
          <FunFactsList>
            {t.funFacts.map((fact, idx) => (
              <FunFactItem key={idx}>
                <strong>{fact.label}</strong> {fact.value}
              </FunFactItem>
            ))}
          </FunFactsList>
          <FooterText>{t.footer}</FooterText>
          <FooterText>
            {t.contact}
            <ContactLink href="mailto:info@solthecat.com">
              info@solthecat.com
            </ContactLink>
          </FooterText>
        </Content>
      </WatermarkedContainer>
    </>
  );
}
