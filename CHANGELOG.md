# Changelog

���� �� ���������� ������� ��� ������ ��� SOLadventures ����������.

---

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
