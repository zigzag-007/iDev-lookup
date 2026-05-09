# Changelog

All notable changes to **iDev Lookup** are documented in this file.

## [0.2.8] – 2026-05-09

### Fixed

- EveryMac and Firmware links keep `whitespace-nowrap` on the anchor itself so long URLs and filenames never wrap and horizontal scroll inside each row stays reliable.

---

## [0.2.7] – 2026-05-09

### Fixed

- Applied uniform horizontal-scroll with invisible scrollbar to every result row (Device, Identifier, Family, Model, EMC, EveryMac, Firmware, Signed iOS). No field can overflow or wrap unexpectedly on any screen size.
- Removed redundant per-field wrapper divs from EveryMac and Firmware rows now that the `dd` element handles overflow directly.
- Fully suppressed scrollbar track on all WebKit browsers by setting `width: 0; height: 0; background: transparent` instead of `display: none` on `::webkit-scrollbar`.

---

## [0.2.6] – 2026-05-09

### Fixed

- Long FIRMWARE and EVERYMAC values now scroll horizontally inside their row cell with an invisible scrollbar instead of overflowing or truncating. Works on all screen sizes including mobile.
- FIRMWARE value uses monospace font at a smaller size for better readability of long filenames and hashes.

---

## [0.2.5] – 2026-05-09

### Added

- Cursor-follow ambient glow (`CursorGlow`) with reduced-motion and touch fallbacks.
- Result panel skeleton loading with shimmer; clears stale rows as soon as a new lookup starts.
- Idle status banner on the lookup column (“Enter an Apple device identifier above to begin.”) so layout matches loading and success states.
- IPSW **install** URL for signed iPhone/iPad firmware (`ipsw.me/install/...`) with existing download paths retained where appropriate (including Watch OTA handling).

### Changed

- **Release version** set to **0.2.5** (`package.json`); header badge continues to read the version from this file.
- Typography refresh: explicit font weights for Inter, Plus Jakarta Sans, and JetBrains Mono; refined display headings and metadata descriptions.
- Global visuals: stronger glass panels, card spotlight hover, ambient grid and aurora, staggered entry animations, skeleton shimmer utilities, gradient “Lookup” accent.
- Header version badge: themed styling with a subtle pulse animation (light and dark).
- Lookup UX: search icon in identifier field, compact hero and chips, refined buttons and quick actions.
- Result panel: stable panel height across idle, loading, and populated states; fixed header slot height so spinner vs “Live” badge does not shift layout; aligned skeleton row metrics with live rows.

### Fixed

- Horizontal overflow: `overflow-x: hidden` on `html` and `body`; root page wrapper uses `overflow-hidden` to clip animated backgrounds without runaway scroll.
- Footer visibility: tightened vertical rhythm so key content and footer fit more comfortably above the fold.
- Layout consistency between skeleton and final results (row heights and header chrome).
