// Shared Tailwind CSS configuration for the Himalayan Orchard Retreat project
// This configuration is loaded on every page to ensure consistent styles, colors, and typography.
// It handles both loading orders: before or after the main Tailwind CDN script.

const tailwindConfig = {
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
        "on-tertiary-fixed-variant": "#475569",
        "surface-variant": "#cbd5e1",
        "background": "#ffffff",
        "on-secondary-container": "#650001",
        "error-container": "#ffdad6",
        "surface-dim": "#f1f5f9",
        "secondary-container": "#fc6451",
        "secondary-fixed": "#ffdad5",
        "on-secondary": "#ffffff",
        "surface-container-high": "#e2e8f0",
        "on-error": "#ffffff",
        "inverse-on-surface": "#f8fafc",
        "surface-tint": "#4d6453",
        "tertiary-fixed": "#f1f5f9",
        "surface-bright": "#ffffff",
        "on-error-container": "#93000a",
        "on-secondary-fixed-variant": "#8e130c",
        "on-tertiary-fixed": "#0f172a",
        "inverse-surface": "#0f172a",
        "on-surface": "#0f172a",
        "on-primary-fixed": "#0b2013",
        "tertiary-fixed-dim": "#cbd5e1",
        "on-primary-fixed-variant": "#364c3c",
        "on-tertiary": "#ffffff",
        "surface-container-highest": "#cbd5e1",
        "tertiary-container": "#1e293b",
        "primary-fixed": "#d0e9d4",
        "on-primary": "#ffffff",
        "outline-variant": "#e2e8f0",
        "on-tertiary-container": "#64748b",
        "on-primary-container": "#819986",
        "primary": "#061b0e",
        "on-surface-variant": "#475569",
        "secondary-fixed-dim": "#ffb4a9",
        "on-secondary-fixed": "#410000",
        "outline": "#64748b",
        "primary-container": "#1b3022",
        "surface": "#ffffff",
        "tertiary": "#0f172a",
        "surface-container": "#f1f5f9",
        "surface-container-lowest": "#ffffff",
        "on-background": "#0f172a",
        "error": "#ba1a1a",
        "secondary": "#b02d21",
        "inverse-primary": "#b4cdb8",
        "surface-container-low": "#f8fafc",
        "primary-fixed-dim": "#b4cdb8"
      },
      "borderRadius": {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      "spacing": {
        "3xl": "104px",
        "md": "16px",
        "lg": "24px",
        "2xl": "64px",
        "sm": "8px",
        "xs": "4px",
        "xl": "40px"
      },
      "fontFamily": {
        "headline-sm": ["Playfair Display"],
        "body-lg": ["Inter"],
        "button-text": ["Manrope"],
        "headline-md": ["Playfair Display"],
        "display-lg": ["Playfair Display"],
        "body-md": ["Inter"],
        "display-lg-mobile": ["Playfair Display"],
        "label-caps": ["Manrope"],
        "kalam": ["Kalam", "cursive"]
      },
      "fontSize": {
        "headline-sm": ["24px", {"lineHeight": "1.4", "fontWeight": "500"}],
        "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
        "button-text": ["14px", {"lineHeight": "1", "letterSpacing": "0.05em", "fontWeight": "600"}],
        "headline-md": ["32px", {"lineHeight": "1.3", "fontWeight": "600"}],
        "display-lg": ["64px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "body-md": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
        "display-lg-mobile": ["40px", {"lineHeight": "1.2", "fontWeight": "700"}],
        "label-caps": ["12px", {"lineHeight": "1", "letterSpacing": "0.1em", "fontWeight": "700"}]
      }
    }
  }
};

// Check if Tailwind global is already defined (CDN loaded first)
if (typeof tailwind !== 'undefined') {
  tailwind.config = tailwindConfig;
} else {
  // If config is loaded first, define it on window.tailwind
  window.tailwind = {
    config: tailwindConfig
  };
}
