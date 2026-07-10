---
name: Highland Sanctuary
colors:
  surface: '#fbf9f6'
  surface-dim: '#dbdad7'
  surface-bright: '#fbf9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f0'
  surface-container: '#efeeeb'
  surface-container-high: '#e9e8e5'
  surface-container-highest: '#e3e2e0'
  on-surface: '#1b1c1a'
  on-surface-variant: '#434843'
  inverse-surface: '#30312f'
  inverse-on-surface: '#f2f1ee'
  outline: '#737973'
  outline-variant: '#c3c8c1'
  surface-tint: '#4d6453'
  primary: '#061b0e'
  on-primary: '#ffffff'
  primary-container: '#1b3022'
  on-primary-container: '#819986'
  inverse-primary: '#b4cdb8'
  secondary: '#b02d21'
  on-secondary: '#ffffff'
  secondary-container: '#fc6451'
  on-secondary-container: '#650001'
  tertiary: '#1f1414'
  on-tertiary: '#ffffff'
  tertiary-container: '#352828'
  on-tertiary-container: '#a08e8e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d0e9d4'
  primary-fixed-dim: '#b4cdb8'
  on-primary-fixed: '#0b2013'
  on-primary-fixed-variant: '#364c3c'
  secondary-fixed: '#ffdad5'
  secondary-fixed-dim: '#ffb4a9'
  on-secondary-fixed: '#410000'
  on-secondary-fixed-variant: '#8e130c'
  tertiary-fixed: '#f3dedd'
  tertiary-fixed-dim: '#d6c2c1'
  on-tertiary-fixed: '#241919'
  on-tertiary-fixed-variant: '#524343'
  background: '#fbf9f6'
  on-background: '#1b1c1a'
  surface-variant: '#e3e2e0'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
  button-text:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
  3xl: 104px
---

## Brand & Style

This design system embodies the intersection of Himalayan heritage and ultra-modern luxury. It draws inspiration from the silent grandeur of the mountains and the tactile richness of organic farming. The aesthetic is defined by "Organic Minimalism"—a blend of high-end editorial layouts and soft, environmental textures.

The target audience is the discerning traveler and conscious consumer who values authenticity over ostentation. The UI evokes a sense of stillness, breathability, and premium craftsmanship. To achieve this, the system utilizes:
- **Minimalism:** Aggressive use of whitespace to signify luxury and mental clarity.
- **Glassmorphism:** Subtle, frosted overlays that mimic Himalayan mist and mountain air.
- **Tactile Refinement:** High-quality imagery paired with soft, depth-based UI elements that feel "physical."

## Colors

The palette is rooted in the natural landscape of the orchard. 
- **Forest Green (#1B3022):** The primary anchor, used for headers, primary actions, and deep structural elements to evoke the canopy.
- **Off-White (#F9F8F6) & Warm Cream (#EFEDE7):** The canvas of the system, used to create soft transitions between sections and reduce eye strain.
- **Deep Brown (#3C2F2F):** Reserved for high-contrast typography and subtle dividers, grounding the ethereal whites.
- **Apple Red (#C0392B):** A strategic accent color. Use sparingly for critical calls to action, price points, or "live" availability indicators to ensure high visibility without breaking the tranquil mood.

## Typography

The typographic hierarchy relies on a high-contrast pairing between serif and sans-serif. 
- **Headlines:** Playfair Display provides a literary, editorial feel. Use "Display" sizes for hero sections with tight letter-spacing to maintain a modern look.
- **Body:** Inter ensures maximum legibility for long-form content about the orchard’s history or room descriptions. 
- **Navigation & Metadata:** Manrope is used for functional UI elements. Its geometric nature adds a precision-engineered feel to buttons and labels, balancing the softness of the serif headlines.

## Layout & Spacing

The layout philosophy follows a **4px base grid** with a focus on expansive margins.
- **Grid:** A 12-column fluid grid for desktop with 24px gutters. For mobile, shift to a 4-column grid with 16px margins.
- **Rhythm:** Vertical rhythm should be generous. Use `3xl` (104px) spacing between major sections to allow the brand imagery to breathe.
- **Content Reflow:** On mobile, imagery should typically span the full width of the screen to maintain visual impact, while text containers use the 16px safe area.

## Elevation & Depth

Depth in this design system is achieved through atmospheric layers rather than heavy shadows.
- **Glassmorphism:** Use for navigation bars and floating action cards. Apply a 20px backdrop-blur with a 10% white tint and a 1px border (#FFFFFF 20% opacity) to simulate a frosted glass pane.
- **Soft Shadows:** When necessary for elevation (e.g., a primary booking card), use a large, ultra-diffused shadow: `0px 20px 40px rgba(27, 48, 34, 0.05)`. The tint should be a dark green rather than pure black to maintain color harmony.
- **Tonal Layering:** Use Warm Cream (#EFEDE7) surfaces on top of Off-White (#F9F8F6) backgrounds to create a low-contrast, sophisticated hierarchy.

## Shapes

The shape language is smooth and approachable. 
- **Base Components:** Standard buttons and input fields use a `0.5rem` (8px) radius.
- **Containers:** Property cards, feature sections, and modal windows use a `rounded-xl` (1.5rem / 24px) radius to create a soft, inviting frame for content.
- **Image Treatment:** Photography should always feature rounded corners to match the UI, reinforcing the "Aman-resort" luxury feel.

## Components

### Buttons
- **Primary:** Forest Green background, Manrope White text, 0.5rem radius. Subtle hover state: slight lift and increased shadow.
- **Secondary:** Transparent background with a 1.5px Forest Green border.
- **Accent (Booking):** Apple Red background. Used exclusively for "Book Now" or "Purchase" to drive conversion through contrast.

### Cards
- **Property/Product Cards:** `rounded-xl` corners, no border, soft green-tinted shadow. Use a "floating" style with the title in Playfair Display overlapping the image slightly or placed immediately below with generous padding.

### Navigation
- **Header:** Glassmorphic background (frosted), pinned to the top. Links in Manrope 12px Bold Caps. 
- **Mobile Menu:** Full-screen overlay in Warm Cream with large Playfair Display links.

### Input Fields
- Underlined or softly boxed with #EFEDE7 background. Focus state: Border transitions to Forest Green with a 1px stroke.

### Chips/Tags
- Small, rounded-pill shapes using a light tint of Forest Green (10% opacity) with dark green text for labels like "Organic," "Limited Edition," or "Mountain View."