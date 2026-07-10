# Highland Sanctuary Design System

This document defines the unified design system for the **Himalayan Orchard Retreat** web application. It serves as the single source of truth for design tokens, typography, visual guides, and theme settings.

---

## 1. Core Brand & Theme Guidelines

This design system embodies the intersection of Himalayan heritage and ultra-modern luxury. The aesthetic, termed **"Organic Minimalism"**, blends high-end editorial typography with environmental textures, glassmorphic effects, and natural color palettes.

- **Minimalism:** Aggressive use of whitespace to signify luxury and visual clarity.
- **Glassmorphism:** Frosting effects mimicking mountain mist (`backdrop-blur-xl`, `border-white/20`).
- **Tactile Shadows:** Large, ultra-diffused shadows with dark forest green tints (`shadow-[0px_20px_40px_rgba(27,48,34,0.05)]`).

---

## 2. Design Tokens & Configuration

Theme configuration is managed globally in the external configuration script [js/tailwind.config.js](file:///Users/nishantguleria/Desktop/Dj's%20Harvest/js/tailwind.config.js). 

Below is the structured registry of the extended design tokens:

### Colors Palette
| Token | HEX Code | Theme Purpose |
| :--- | :--- | :--- |
| `primary` | `#061b0e` | Deep canopy green. Primary brand color for text, structures, and key buttons. |
| `primary-container` | `#1b3022` | Muted forest green, used for dark background banners and cards. |
| `secondary` | `#b02d21` | Apple crimson red. Primary accent color reserved for CTAs (Booking/Add-to-cart). |
| `background` | `#ffffff` | Crisp pure white canvas surface for a clean, modern aesthetic. |
| `surface-container` | `#f1f5f9` | Soft slate gray background for standard cards and list widgets. |
| `outline-variant` | `#e2e8f0` | Light border color for soft glass borders and subtle separators. |

### Typography Scale
- **Headlines (Playfair Display):** Literary serif fonts that add premium editorial texture to display names, hero titles, and headers.
- **Body Text (Inter):** Highly legible sans-serif for description copy, stories, and articles.
- **Functional Labeling (Manrope):** Geometric typeface for caps headers, navigation items, buttons, and badges.

```javascript
// Example Font Classes mapped in Tailwind:
font-family: 'Playfair Display' -> .font-headline-md, .font-display-lg
font-family: 'Inter'            -> .font-body-md, .font-body-lg
font-family: 'Manrope'          -> .font-label-caps, .font-button-text
```

### Spacing Grid
Spacing operates on a **4px base grid** with fluid margin values to preserve breathing room:
- `xs`: `4px`
- `sm`: `8px`
- `md`: `16px`
- `lg`: `24px`
- `xl`: `40px`
- `2xl`: `64px`
- `3xl`: `104px`

### Border Radii
approachable, rounded shape language mapping Aman-resort luxury styles:
- `DEFAULT`: `0.25rem` (4px)
- `lg`: `0.5rem` (8px) for buttons and inputs.
- `xl`: `0.75rem` (12px) for accommodation and product cards.
- `full`: `9999px` for pills/chips/badges.

---

## 3. How to Manage and Update

This project uses **Tailwind CSS Play CDN** for quick client-side rendering. To edit layout style rules globally:

1. **Modify Theme Constants:** Edit theme variables directly in [js/tailwind.config.js](file:///Users/nishantguleria/Desktop/Dj's%20Harvest/js/tailwind.config.js). Changes will propagate to all files.
2. **Modify Animation & Drawer CSS:** Edit global animations, keyframe transitions, and custom glass effects in [css/style.css](file:///Users/nishantguleria/Desktop/Dj's%20Harvest/css/style.css).
3. **Reference Config in New Pages:** Add the script elements inside the `<head>` tag:
   ```html
   <script src="js/tailwind.config.js"></script>
   <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
   <link rel="stylesheet" href="css/style.css" />
   ```
