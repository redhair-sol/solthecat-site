# Changelog

Όλες οι σημαντικές αλλαγές που έγιναν στη SOLadventures ιστοσελίδα.

---

## [2.5.9] - 2025-06-28

### Added
- `InstagramFloatingButton.jsx`: Floating κουμπί Instagram κάτω δεξιά για κινητά (`md:hidden`) με απαλή κίνηση bounce (`framer-motion`) και ημιδιαφανές στυλ (`opacity-50`).
- Ενσωματώθηκε στο `App.jsx`, εμφανίζεται σε όλες τις σελίδες.

### Changed
- Οπτική εμπειρία: πιο διακριτική πρόσκληση για follow χωρίς να καλύπτει περιεχόμενο, σε πλήρη αρμονία με την αισθητική του SOLadventures.

### Technical Notes
- Χρησιμοποιεί `framer-motion`, ήδη παρόν στο project.
- Δεν απαιτεί νέα εξαρτήματα ή πακέτα.

## [5.8] - 2025-06-21

### Added
- ? **Structured SEO:** Πλήρης ρύθμιση SEO στο `index.html` (Open Graph, Twitter Card, JSON-LD Organization, Website & Person).
- ? **Helmet-Async:** Αντικατάσταση του `react-helmet` με `react-helmet-async` για συμβατότητα με React 19 και ασφαλή Strict Mode.

### Fixed
- ?? **Preload warnings:** Αφαίρεση άχρηστου `preload` για το `sol-menu.webp` που έβγαζε warning στο PageSpeed.
- ?? **Console warnings:** Μείωση των unsafe warnings με νέα βιβλιοθήκη `helmet-async`.
- ?? **Royal Puzzle Best Time:** Ολοκληρωμένη αποθήκευση και εμφάνιση καλύτερου χρόνου στο puzzle (per episode & level).

### Updated
- ?? **Royal Puzzle:** Καλύτερη μέτρηση χρόνου και σταθερό download κουμπί στο τέλος του puzzle.
- ?? **SEO Meta & Preloads:** Σταθεροποιήθηκαν τα preloads: LCP font μόνο `Dancing Script`, υπόλοιπα lazy.
- ?? **Deploy instructions:** Προσθήκη clear οδηγιών για `uninstall` και `install` του `react-helmet-async` με `--legacy-peer-deps`.

### Removed
- ? **react-helmet:** Πλήρης αφαίρεση της παλιάς βιβλιοθήκης από όλα τα components.

## [5.7] - 2025-06-20

### Added
- ? Νέο παιχνίδι: Royal Puzzle (`/games/royalpuzzle`)
- ? Περιγραφή και κουμπί download εικόνας στο τέλος του Royal Puzzle
- ? Προσθήκη Royal Puzzle στην σελίδα Games, ακριβώς δίπλα από το SOL's Puzzle Map

### Fixed
- ? Σωστή στοίχιση puzzle κομματιών και responsive μέγεθος περιοχής για mobile και desktop
- ? Βελτίωση drag συμπεριφοράς σε touch devices χωρίς react-draggable
- ? Ομοιομορφία κουμπιών με SolButton
- ? Διορθώθηκε το Dropdown επιλογής επεισοδίου σε mobile

### Updated
- ?? Ενημέρωση Games.jsx για σωστή σειρά παιχνιδιών (Puzzle Map και Royal Puzzle συνεχόμενα)
- ?? Γενική συντήρηση styled components για consistency σε όλο το site

## [5.6.0] - 2024-06-14

### Added
- ?? Προστέθηκε το **Streak Badges** feature με παρακολούθηση συνεχόμενων επισκέψεων.
- Κάθε badge υποστηρίζει πλήρη διγλωσσία (`name` & `description`).
- Το block εμφανίζεται μόνο αν έχει unlocked streak.
- Η επιλογή mood/fortune cache-άρει το daily message ανά mode, language και ημερομηνία.

### Changed
- Minor cleanups στο Home για το νέο block (χωρίς αλλαγές σε υπάρχον content).
- Δεν πειράχτηκε η λογική των games, journey ή Instagram.

### Fixed
- Κανένα reported bug δεν υπήρχε σε αυτή την έκδοση.

### Compatibility
- ? Full backward compatibility.
- ? Δεν απαιτεί schema migration ή data migration.
- ? Fully compatible με version 5.x.


## [5.4.0] - 2025-06-13

### Updated
- Unified page layout spacing across all main sections
- Increased `min-height` of `PageContainer` to `90vh` for consistent vertical alignment
- Added `margin-bottom: 2rem` to `Gallery` and `Games` grids to ensure proper bottom spacing

### Improved
- Mobile padding consistency for PageContainer

## [v5.3.0] - 2025-06-13

### Added
- Toggle selector on Home page between "Mood of the Day" and "Fortune of the Day"
- `/data/smartFortunes.json` with 100 bilingual fortunes for Sol

### Fixed
- Proper handling of fortune file when deployed (404 issue resolved)
- Fallback text if no mood/fortune is found

### Changed
- Refactored `Home.jsx` to support dynamic quote loading based on toggle selection


v5.2.0 - Smart Daily Quote Engine ?
Date: 2025-06-12

? New Features:
Added smartQuotes.json with 30+ bilingual quotes
- Supports: ISO date, weekday, season, and default

Implemented intelligent quote selection logic in Home.jsx
- Auto-selects based on current date, language, and context

Added fallback quote when no match is found
- "Sol is taking a royal pause today ??" / "Η Sol ξεκουράζεται βασιλικά σήμερα ??"

?? UX / Copy Updates:
Updated Greek label for quote box title from
"Η Πατουσένια Στιγμή της Ημέρας" ? "Η Βασιλική Στιγμή της Ημέρας" for consistency with English

Improved emoji handling in language switcher buttons with proper flag rendering (????, ????)

?? Internal:
Home.jsx: refactored useEffect logic to include:
- date detection
- weekday fallback
- seasonal fallback
- language-aware safety message

## [5.1] - 2025-06-11

### Fixed / Tweaks
- **Topbar.jsx**  
  - Αφαιρέθηκε το μπλε underline από το active link  
  - Ρυθμίστηκε το ύψος της topbar (μείωση `py`, `h-16` ? `h-10`, `img !h-16` ? `!h-10`)  
  - Αφαιρέθηκε το `hover:underline` από τα NavLink  

- **WhoIsSol.jsx**  
  - Refactor: αντικατάσταση `Wrapper` + `PageContainer noBg` με `WatermarkedContainer` που
    - κρατάει το global pink-gradient background  
    - προσθέτει το watermark via `&::before` με `opacity:0.2` και `background-size:cover`  
  - Όλα τα styled-components παρέμειναν ίδια, αλλά τώρα το watermark είναι διακριτικό πίσω από το περιεχόμενο  

## [5.0] - 2025-06-10

### Added
- **Global `PageContainer`** component with `alignTop` & `noBg` props for consistent layout and optional background removal  
- Unified **styled-components** across all pages (Home, Episodes, Map, Gallery, Games, Quiz, SolSnap, WhoIsSol, Shop)  
- Animation props (`initial`, `animate`, `transition`) moved into `PageContainer` for smooth page-load transitions  
- Support for background **watermark** on About page via `Wrapper` & `Overlay` components

### Changed
- Replaced per-page containers with the single `PageContainer` to enforce typography (`Segoe UI, Helvetica Neue`) and responsive padding  
- Migrated all inline styles and Tailwind utilities into styled-components  
- Topbar refactored to use absolute centering, clickable logo, and unified mobile/desktop behavior  
- Consistent font hierarchy (Poppins + Playfair Display for headlines) applied via `GlobalStyle`

### Fixed
- Quotation-escaping bug in `WhoIsSol.jsx` ("όχι") corrected using template literal  
- Mobile logo sizing override issue resolved with Tailwind-only classes and `!important` utilities  
- Gallery page vertical alignment fixed by adding `alignTop` to `PageContainer`  
- Removed unused imports/components (e.g. `SolBrand` in Gallery)  


## [v4.3.1] - 2025-06-09

### Added
- New `ScrollToTop` component to reset scroll position when changing pages.

### Fixed
- Page scroll issue where newly navigated pages preserved scroll position from the previous one.

## [v4.2.1] - 2025-06-08

### Changed
- Improved mobile layout and visual centering across all games:
  - `/games/puzzlemap`: puzzle grid and dropdown fully centered and responsive.
  - `/games/cityquiz`: dropdown and quiz layout now aligned and mobile-friendly.
  - `/games/pawprints`: (if needed) updated to match SolUI 2025 standards.
- Eliminated horizontal scroll on small devices for all game pages.
- Standardized dropdown styling with max-width and wrapper container.

##[4.2] - 2025-06-08


MobileMenu.jsx: Removed logo/brand section from header; only navigation links and close button remain.

MobileMenu.jsx: Restored import of LogoTextMobile with updated markup to match desktop styling.

Home.jsx: Updated PageContainer styled-component to add a mobile-only media query (max-width: 480px) reducing top padding to 0.5rem and sides to 1rem, bottom to 1.5rem to eliminate excess white gap under header.

Fixed

Consistent header spacing across mobile and desktop by adjusting padding rules.

Removed

References to old SolBrand and redundant LogoText imports from mobile menu.

## [v4.0.1-ntest] - 2025-06-07

### Changed
- **Topbar.jsx**: Enabled desktop sticky header via `sticky top-0 z-50`.
- **App.jsx**: Moved `<Topbar />` outside of the content wrapper (as a sibling) to allow independent sticky behavior.
- **Topbar.jsx**: Integrated mobile menu (`Sidebar` hamburger + `MobileMenu` overlay) alongside `LogoText` and desktop nav; removed standalone `<Sidebar />` from `App.jsx`.
- **App.jsx**: Added `pt-16 md:pt-0` to `<main>` for proper top-padding on mobile.
- **LogoText.jsx**: Removed `hidden md:flex` so logo is always visible; reduced margin/padding for compact height.

## [v4.0.0] - 2025-06-06

### Added
- ??? **New `/shop` page (SOLicious Delights)** - Dynamically loads product data from `products.json`, with support for ???? English and ???? Greek. Includes responsive design and availability labels (`Available`, `Coming Soon`, `Sold Out`).

### Fixed
- ?? `setLanguage is not defined` error in `SolSnap.jsx` - removed unused local state, now uses global `LanguageContext`.
- ?? Removed unused `selectedAnswer` and `correct` props from render to prevent React DOM warnings.

### Improved
- ?? Cleaned up redundant imports and local state handling in `Gallery`, `Map`, `Games`, `WhoIsSol`, and `SolSnap`.
- ?? All pages now rely fully on `LanguageContext` without local toggles, ensuring consistent language behavior across the site.

## [v3.2.0] - 2025-06-05

### Added
- **SolSnap** entry στο "Sol's Game Room" (Games.jsx):
  - Προστέθηκαν emoji ??, τίτλος "SolSnap" και περιγραφή "Snap decision: 3 yes/no questions per episode."
  - Route: `/games/solsnap`
- ***SolSnap.jsx*** component:
  - Πλήρης λογική για 3 ερωτήσεις / επεισόδιο, 5? χρονόμετρο, δίγλωσση υποστήριξη, summary & navigation.
  - Αυτόματη διάταξη "Next Episode" / "Back to Games" ανάλογα με το αν υπάρχει ή όχι επόμενο ορατό επεισόδιο.

### Changed
- **Routing** (index.jsx ή main.jsx):
  - Προστέθηκε `<Route path="games/solsnap" element={<SolSnap />} />` μέσα στη διαδρομή `games`.
- **Games.jsx**:
  - Ενημερώθηκε ο πίνακας `games` με νέο αντικείμενο `id: 4`, ώστε να εμφανίζεται το SolSnap card.
  - Δημιουργήθηκαν τα styled-components `GameCard`, `GameDescription`, `PlayButton` (όπου δεν υπήρχαν ήδη) για ομοιομορφία με τα υπόλοιπα παιχνίδια.

### Deployment
1. Commit τα παραπάνω αρχεία (Games.jsx, SolSnap.jsx, index.jsx/main.jsx).
2. Push στο repository και κάνε deploy (π.χ. Vercel/Netlify ή όποιον host χρησιμοποιείς).
3. Επιβεβαίωσε ότι στο `https://solthecat.com/games` εμφανίζεται το SolSnap card και ότι το Play οδηγεί κανονικά στο `/games/solsnap`.

## [v3.1.0] - 2025-06-05

### Added
- Language toggle (????/????) to the Home page, consistent with other pages (e.g. Episodes, WhoIsSol).
- SEO-optimized mini-bio block on Home, featuring keyword **solthecat** to improve discoverability.
- New Games promo section on the homepage with CTA: "Play the Games" / "Παίξε Παιχνίδια".

### Improved
- Unified visual style and structure for language switch across the site.
- Better engagement flow by highlighting interactive features early.

### Fixed
- Minor spacing inconsistencies in top-level Home layout.


## [v3.0.0] - 2025-06-04

### ?? Added - New Game: City Quiz
- Προστέθηκε νέο παιχνίδι γνώσεων στο route `/games/quiz`.
- Κάθε quiz εμφανίζει **8 τυχαίες ερωτήσεις** από σύνολο **25 ανά πόλη**.
- Υποστηρίζει **δίγλωσσο περιεχόμενο** (???? English / ???? Ελληνικά).
- Τα quiz είναι διαθέσιμα για τα επεισόδια: Athens, Rome, Paris.
- Οι ερωτήσεις φορτώνονται δυναμικά από τα αρχεία `data/quiz/[city].json`.

### ?? Improved - Visual Consistency
- Το κουμπί **Start Quiz** αποκτά το ίδιο στυλ με το `JourneyButton` της αρχικής σελίδας για συνεκτική εμπειρία χρήστη.

### ?? Cleaned - Code Cleanup
- Αφαιρέθηκαν όλα τα debug logs από το `QuizPlayer.jsx`.
- Ο κώδικας οργανώθηκε για καθαρότερη λογική εμφάνισης ερωτήσεων και αποτελεσμάτων.

## [v2.9.2] - 2025-06-03
### Changed
- PuzzleMap now uses a guaranteed solvable shuffle logic via legal empty-tile moves (100 steps).
- Ensures all 3x3 sliding puzzles can always be completed by the player.

## [v2.9.1] - 2025-06-03

### Added
- ?? New "Match the Pawprints" memory game at `/games/pawprints`.
- ?? Cards feature pawprints, food, and travel emojis in a fun memory challenge.
- ? 60-second countdown timer and success/failure messages.
- ?? Confetti animation when the game is won.
- ?? "Play Again" button and ? Back to games navigation.

### Improved
- Game logic structured for reuse and clarity.
- Responsive grid layout for both desktop and mobile.

## [v2.9.0] - 2025-06-02
### Added
- Fully redesigned `/404` Not Found page with centered layout, image background, and blur overlay
- Stylized translucent "404" title
- Quote: "This corner of the world hasn't been explored yet - not even by Sol."
- New button: "Back to safety" linking to home

### Removed
- SolBrand from the 404 page for a cleaner appearance


## v2.8.1 - 2025-06-02
### ? WhoIsSol Page
- Refined introduction text for both English and Greek (more poetic and expressive)
- Added official contact email: info@solthecat.com

## v2.8.0 - 2025-06-01

### Changed
- ?? Hid the `/contact` page from both desktop and mobile menus (Topbar.jsx, MobileMenu.jsx)

### Notes
- The Contact page remains accessible via direct URL: `/contact`
- Dual-language Google Forms will be added later before making it public again

## [v2.7.1] - 2025-05-31

### Added
- ?? Emoji added to the title of the "Who is Sol?" page in both English and Greek (`?? Who is Sol the Cat?`, `?? Ποια είναι η Sol;`).
- "About" link added to the **desktop navigation (Topbar.jsx)** and **mobile menu (MobileMenu.jsx)**, linking to `/whoissol`.

### Changed
- Updated desktop layout to clarify that menu navigation is handled by `Topbar.jsx`, not `Sidebar.jsx`.
- Clarified visual hierarchy and branding alignment by applying consistent emoji styling to section titles (e.g. matching the ? used in "Fun Facts").
- Finalized the use of Topbar for all desktop navigation and Sidebar only for mobile hamburger logic.

### Fixed
- Desktop sidebar (`Sidebar.jsx`) was previously assumed to be visible on large screens; corrected structure by maintaining mobile-only behavior.
- Navigation inconsistency between mobile and desktop regarding the visibility of the "About" page link.


## [v2.7.0] - 2025-05-31

### Added
- New brand header `<SolBrand />` at the top of the `/who-is-sol` page.
- Greek and English biography texts with full bilingual toggle.
- Watermark background image of SOL applied across full page (desktop & mobile).

### Changed
- Rewritten introduction paragraph in both languages for a more poetic and brand-consistent tone.
- Improved responsive layout to ensure watermark image covers full pink area without distortion.
- Layout width refined to maintain readability without text stretching.

### Fixed
- Visual imbalance on mobile where watermark was previously too faded or misplaced.

## [2.6.1] - 2025-05-30

### Changed
- Refactored `SolBrand.jsx` for consistent appearance across all pages and devices.
  - ?? Emoji is now vertically aligned and displayed inline.
  - Unified layout using `inline-flex` to avoid line breaks in mobile view.
  - Font size and spacing now adapt cleanly across breakpoints.

### Fixed
- Mobile layout issue on `/map` where the logo was misaligned or broken into two lines.
- Removed unnecessary margin-top tricks and replaced with proper flexbox layout.

### Visual Consistency
- `SolBrand` now looks identical in `/`, `/episodes`, `/gallery`, and `/map` on both desktop and mobile.

## [2.6.0] - 2025-05-30

### Added
- Component `SolBrand.jsx` created to display the SOLadventures logo consistently with crown.
- `LogoTextMobile.jsx` added for mobile-specific use of SOLadventures branding.

### Changed
- Mobile and desktop navigation (`Sidebar.jsx`, `MobileMenu.jsx`) updated to include `SolBrand` with consistent font and layout.
- Replaced all static "SOLadventures" `<h1>` page titles with the dynamic `<SolBrand />` component for:
  - `Episodes.jsx`
  - `Gallery.jsx`
  - `Map.jsx` (desktop only; mobile pending due to layout issues)

### Fixed
- Visual hover caption behavior in `Gallery.jsx` for desktop and static caption on mobile.
- Unified styling for `Sidebar` links (font-family, size, spacing).

### Pending
- Consistent vertical alignment of `SolBrand` on mobile in `Map.jsx` (to be addressed in future release).

## v2.5.0 - Visual refinement & Topbar styling (2025-05-28)

### ? Aesthetic updates
- Changed site background from pure white (`#ffffff`) to soft pastel pink (`#fef8f8`)
- Improved layout contrast and visual balance

### ?? Topbar
- Switched navigation font to `Marcellus`
- Increased size and weight for readability
- Added spacing above Topbar on desktop

### ? Result
- Visually balanced, softer appearance
- Navigation feels refined and elegant
- Responsive layout fully preserved

## v2.4.0 - 2025-05-27

### ? Features
- Added dynamic "Coming Soon" teaser card after last visible episode
  - Displays as: `SOLadventure #[n+1] - Coming Soon ??`
  - Uses grayscale styling and opacity to visually separate
- Episode list now pulls only `visible: true` entries from `episodes.json`
- Teaser card is not tied to actual episode data (no story, no quote)

### ?? Content
- Added full bilingual (EN/EL) `story` field for episodes 1-12
- Stories appear automatically when episode is published

### ?? Styling
- Applied grayscale and reduced opacity for teaser episodes
- Prevented teaser cards from triggering hover animation

### ?? Internationalization
- Language toggle (????/????) maintained across full episode and story content

## [v2.3.0] - 2025-05-26

### Προσθήκες
- Προστέθηκε εικόνα της SOL στο κάτω μέρος του mobile (hamburger) menu
- Η εικόνα αποθηκεύτηκε στο `/public/images/sol-menu.png`
- Responsive εμφάνιση με `object-contain`, `shadow`, `rounded`

### Σημειώσεις
- Βελτιώνει την αίσθηση brand consistency και προσωπικότητας του μενού
- Συμβατή με όλες τις mobile διαστάσεις

## [v2.2.1] - 2025-05-26

### Προσθήκες
- Προστέθηκε νέο hamburger menu για κινητά (με animation)
- Δημιουργήθηκε νέο αρχείο `MobileMenu.jsx`
- Εγκατάσταση και ενεργοποίηση Tailwind CSS
- Προστέθηκαν `tailwind.config.js` και `postcss.config.js`

### Αλλαγές
- Το sidebar εμφανίζεται μόνο σε desktop (`md:flex`)
- Το hamburger εμφανίζεται μόνο σε κινητό (`md:hidden`)
- Το layout έγινε responsive χωρίς εμφάνιση διπλών μενού

### Αφαιρέσεις / Απόκρυψη
- Αφαιρέθηκε το `SOL's Journey` από τα μενού (sidebar + hamburger)
- Παραμένει προσβάσιμο μόνο με direct URL `/sols-journey`

### Σημειώσεις
- Αυτή είναι η νέα σταθερή responsive βάση για επεκτάσεις του μενού
- Το σύστημα υποστηρίζει εύκολα προσθήκη νέων links και σελίδων

## [2.0.0] - 2025-05-26

### Added
- New episode: **SOLadventure #2 - Rome, with attitude ????**
- Animated path with paw icon between cities
- Automatic marker (paw) for every visible episode location
- Final zoom to last destination
- Dynamic persistent route line after animation ends

### Changed
- Rewrote Map.jsx with full animation logic
- Improved mobile behavior for captions and interactions

### Fixed
- Bug where final marker was missing after animation
- Caption overlay not appearing properly across devices

### Notes
- Ready to scale with future SOLadventure episodes
- Fully stable for publishing and deploy

## [v1.6] - 2025-05-24

### Προσθήκες & Βελτιώσεις
- Προστέθηκαν SEO-friendly meta tags στο `index.html`.
- Υποστήριξη για social sharing (Open Graph & Twitter Card meta).
- Προστέθηκε preview image `/icons/sol-preview.jpg` για Facebook & Instagram.
- Διορθώθηκε το `<!DOCTYPE html>` για αποφυγή "Quirks Mode".
- Captions εμφανίζονται με hover στο Gallery (μόνο σε desktop).
- Χάρτης (Map) κεντράρει σωστά με βάση τα ενεργά επεισόδια.

### Visual Changes
- Εμφάνιση εικονιδίου Instagram στο Home.
- Βελτίωση responsive συμπεριφοράς (ειδικά σε mobile).

## [v1.5] - 2025-05-23
### Προσθήκες
- Εμφάνιση λεζάντας πάνω στις φωτογραφίες του Gallery όταν γίνεται hover σε desktop

## [v1.4] - 2025-05-23
### Διορθώσεις
- Ο χάρτης τώρα κεντράρει σωστά στην τοποθεσία του επεισοδίου όταν υπάρχει μόνο ένα visible episode
- Το zoom γίνεται `13` για μία πόλη (π.χ. Αθήνα) και `5` για πολλά επεισόδια
- Προστέθηκε fallback για να μην γίνεται render ο χάρτης αν δεν έχουν φορτωθεί σημεία

## [v1.3] - 2025-05-23
### Προσθήκες
- Responsive Sidebar: μετατρέπεται σε Top Navigation σε κινητά (mobile layout)
- Βελτιστοποίηση εμφάνισης σε μικρές οθόνες

## [v1.2] - 2025-05-23
### Διορθώσεις
- Ευθυγράμμιση emoji ?? στην αρχική σελίδα
- Μεγαλύτερο Instagram icon σε κινητά
- Καλύτερη κατακόρυφη στοίχιση περιεχομένου

## [v1.1] - 2025-05-23
### Προσθήκες
- Framer Motion animations στην αρχική σελίδα
- Καθυστέρηση στην εμφάνιση τίτλων & κουμπιών για θεατρικό αποτέλεσμα

## [v1.0] - 2025-05-22
### Πρώτη σταθερή έκδοση
- Αρχική σελίδα (Home)
- Επεισόδια (Episodes)
- Διαδραστικός χάρτης (Map)
- Ροζ θεματική με responsive layout
