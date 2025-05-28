# Changelog

Όλες οι σημαντικές αλλαγές που έγιναν στη SOLadventures ιστοσελίδα.

---

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
