# Changelog

Όλες οι σημαντικές αλλαγές που έγιναν στη SOLadventures ιστοσελίδα.

---

## v1.7 - Cinematic Welcome & Unified Style (2025-05-25)

### ? Home Page
- Refactored headings:
  - "Welcome to" and "the journey of a Queen" now use Playfair Display (italic serif)
  - Sharpened textShadow for clean cinematic feel
  - Maintained bold pop style for "SOLadventures"

### ??? Map Page
- Animated route between episode locations:
  - Pathline progressively unfolds city-to-city
  - Paw icon now moves smoothly and accurately
  - Button state resets properly after journey completes

### ?? Gallery Page
- Visuals now match cinematic theme
- Font, spacing, and hover behavior aligned with global style

### ?? Episodes Page
- Typography and layout unified:
  - Headings updated for consistency with homepage
  - Padding/margin standardized across all screen sizes

### ?? Global Styling
- All pages now use consistent:
  - Font stack and sizes
  - Heading hierarchy
  - Color palette (#aa4dc8 / #4a005f / background gradient)
- Mobile layout adjusted for optimal readability



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
