# Changelog

���� �� ���������� ������� ��� ������ ��� SOLadventures ����������.

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
