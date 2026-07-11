==============================================================================
DJ'S HARVEST WORDPRESS THEME INSTALLATION GUIDE
==============================================================================

Welcome to the WordPress edition of the DJ's Harvest homestay portal. We have
packaged your static codebase into a standard, premium WordPress theme.

------------------------------------------------------------------------------
1. How to Package and Install the Theme
------------------------------------------------------------------------------
To deploy this theme, follow these simple steps:

1. Compress this folder ("djs-harvest-theme") into a standard ZIP archive:
   - On macOS: Right-click the folder and select "Compress 'djs-harvest-theme'".
   - On Windows: Right-click, select "Send to > Compressed (zipped) folder".
   - Name the final file: "djs-harvest-theme.zip".

2. Upload to your WordPress dashboard:
   - Go to: Appearance > Themes > Add New > Upload Theme.
   - Select the "djs-harvest-theme.zip" file.
   - Click "Install Now" and then "Activate".

------------------------------------------------------------------------------
2. Creating and Assigning Pages
------------------------------------------------------------------------------
Once active, create the following pages in your WordPress dashboard (under
Pages > Add New) and assign their custom layouts in the "Page Attributes"
template panel:

- Homepage:
  - Create a page named "Home".
  - Template: Default.
  - Go to Settings > Reading > "Your homepage displays" > Select "A static page".
  - Set Homepage to "Home" and Posts page to "Stories".

- Stay (Sanctuaries Catalog):
  - Create a page named "Stay".
  - Template selector: "Sanctuary Stays".

- Shop (Seasonal Catalog):
  - Create a page named "Shop".
  - Template selector: "Orchard Shop".

- Stories (Journal Page):
  - Create a page named "Stories".
  - Template selector: Default (it maps to index.php).

- Checkout (Gateway Page):
  - Create a page named "Checkout".
  - Template selector: "Checkout Gateway".

------------------------------------------------------------------------------
3. Dynamic WordPress Elements & Post Loops
------------------------------------------------------------------------------
- Stays & Rooms:
  - We have registered a Custom Post Type "Sanctuary".
  - Add stays by navigating to the "Sanctuaries (Stays)" menu in WordPress.
  - Set custom price tags using the metadata key: "cottage-price", "suite-price",
    "loft-price", or "treehouse-price".

- Stories & Blog:
  - Simply publish posts in the standard "Posts" menu.
  - Upload a "Featured Image" to render headers automatically.
  - Add custom reading times using the custom metadata key: "read_time".

------------------------------------------------------------------------------
Enjoy the stillness of the peaks, powered by WordPress.
==============================================================================
