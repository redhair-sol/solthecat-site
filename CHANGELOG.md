# Changelog

Όλες οι σημαντικές αλλαγές που έγιναν στη SOLadventures ιστοσελίδα.

---

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
