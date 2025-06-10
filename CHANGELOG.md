# Changelog

���� �� ���������� ������� ��� ������ ��� SOLadventures ����������.

---

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
- Quotation-escaping bug in `WhoIsSol.jsx` ("���") corrected using template literal  
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
- **SolSnap** entry ��� "Sol's Game Room" (Games.jsx):
  - ����������� emoji ??, ������ "SolSnap" ��� ��������� "Snap decision: 3 yes/no questions per episode."
  - Route: `/games/solsnap`
- ***SolSnap.jsx*** component:
  - ������ ������ ��� 3 ��������� / ���������, 5? ����������, �������� ����������, summary & navigation.
  - �������� ������� "Next Episode" / "Back to Games" ������� �� �� �� ������� � ��� ������� ����� ���������.

### Changed
- **Routing** (index.jsx � main.jsx):
  - ���������� `<Route path="games/solsnap" element={<SolSnap />} />` ���� ��� �������� `games`.
- **Games.jsx**:
  - ����������� � ������� `games` �� ��� ����������� `id: 4`, ���� �� ����������� �� SolSnap card.
  - �������������� �� styled-components `GameCard`, `GameDescription`, `PlayButton` (���� ��� ������� ���) ��� ����������� �� �� �������� ���������.

### Deployment
1. Commit �� �������� ������ (Games.jsx, SolSnap.jsx, index.jsx/main.jsx).
2. Push ��� repository ��� ���� deploy (�.�. Vercel/Netlify � ������ host �������������).
3. ����������� ��� ��� `https://solthecat.com/games` ����������� �� SolSnap card ��� ��� �� Play ������ �������� ��� `/games/solsnap`.

## [v3.1.0] - 2025-06-05

### Added
- Language toggle (????/????) to the Home page, consistent with other pages (e.g. Episodes, WhoIsSol).
- SEO-optimized mini-bio block on Home, featuring keyword **solthecat** to improve discoverability.
- New Games promo section on the homepage with CTA: "Play the Games" / "����� ���������".

### Improved
- Unified visual style and structure for language switch across the site.
- Better engagement flow by highlighting interactive features early.

### Fixed
- Minor spacing inconsistencies in top-level Home layout.


## [v3.0.0] - 2025-06-04

### ?? Added - New Game: City Quiz
- ���������� ��� �������� ������� ��� route `/games/quiz`.
- ���� quiz ��������� **8 ������� ���������** ��� ������ **25 ��� ����**.
- ����������� **�������� �����������** (???? English / ???? ��������).
- �� quiz ����� ��������� ��� �� ���������: Athens, Rome, Paris.
- �� ��������� ����������� �������� ��� �� ������ `data/quiz/[city].json`.

### ?? Improved - Visual Consistency
- �� ������ **Start Quiz** ������ �� ���� ���� �� �� `JourneyButton` ��� ������� ������� ��� ��������� �������� ������.

### ?? Cleaned - Code Cleanup
- ����������� ��� �� debug logs ��� �� `QuizPlayer.jsx`.
- � ������� ���������� ��� ���������� ������ ��������� ��������� ��� �������������.

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
- ?? Emoji added to the title of the "Who is Sol?" page in both English and Greek (`?? Who is Sol the Cat?`, `?? ���� ����� � Sol;`).
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

### ���������
- ���������� ������ ��� SOL ��� ���� ����� ��� mobile (hamburger) menu
- � ������ ������������ ��� `/public/images/sol-menu.png`
- Responsive �������� �� `object-contain`, `shadow`, `rounded`

### ����������
- ��������� ��� ������� brand consistency ��� �������������� ��� �����
- ������� �� ���� ��� mobile ����������

## [v2.2.1] - 2025-05-26

### ���������
- ���������� ��� hamburger menu ��� ������ (�� animation)
- ������������� ��� ������ `MobileMenu.jsx`
- ����������� ��� ������������ Tailwind CSS
- ����������� `tailwind.config.js` ��� `postcss.config.js`

### �������
- �� sidebar ����������� ���� �� desktop (`md:flex`)
- �� hamburger ����������� ���� �� ������ (`md:hidden`)
- �� layout ����� responsive ����� �������� ������ �����

### ���������� / ��������
- ���������� �� `SOL's Journey` ��� �� ����� (sidebar + hamburger)
- ��������� ���������� ���� �� direct URL `/sols-journey`

### ����������
- ���� ����� � ��� ������� responsive ���� ��� ���������� ��� �����
- �� ������� ����������� ������ �������� ���� links ��� �������

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

### ��������� & ����������
- ����������� SEO-friendly meta tags ��� `index.html`.
- ���������� ��� social sharing (Open Graph & Twitter Card meta).
- ���������� preview image `/icons/sol-preview.jpg` ��� Facebook & Instagram.
- ���������� �� `<!DOCTYPE html>` ��� ������� "Quirks Mode".
- Captions ������������ �� hover ��� Gallery (���� �� desktop).
- ������ (Map) ��������� ����� �� ���� �� ������ ���������.

### Visual Changes
- �������� ���������� Instagram ��� Home.
- �������� responsive ������������ (������ �� mobile).

## [v1.5] - 2025-05-23
### ���������
- �������� �������� ���� ���� ����������� ��� Gallery ���� ������� hover �� desktop

## [v1.4] - 2025-05-23
### ����������
- � ������ ���� ��������� ����� ���� ��������� ��� ���������� ���� ������� ���� ��� visible episode
- �� zoom ������� `13` ��� ��� ���� (�.�. �����) ��� `5` ��� ����� ���������
- ���������� fallback ��� �� ��� ������� render � ������ �� ��� ����� �������� ������

## [v1.3] - 2025-05-23
### ���������
- Responsive Sidebar: ������������ �� Top Navigation �� ������ (mobile layout)
- �������������� ��������� �� ������ ������

## [v1.2] - 2025-05-23
### ����������
- ������������ emoji ?? ���� ������ ������
- ���������� Instagram icon �� ������
- �������� ���������� �������� ������������

## [v1.1] - 2025-05-23
### ���������
- Framer Motion animations ���� ������ ������
- ����������� ���� �������� ������ & �������� ��� �������� ����������

## [v1.0] - 2025-05-22
### ����� ������� ������
- ������ ������ (Home)
- ��������� (Episodes)
- ������������ ������ (Map)
- ��� �������� �� responsive layout
