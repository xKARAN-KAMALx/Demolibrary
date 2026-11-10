XYZ LIBRARY WEBSITE DEMO
========================

FILES
-----
index.html   Main website structure
style.css    Responsive styling + light/dark themes
script.js    Theme switch, WhatsApp forms, gallery, menu and share actions

HOW TO PREVIEW
--------------
1. Extract the ZIP.
2. Open index.html in Chrome, Edge or another modern browser.
3. Internet is required for the Google Fonts and remote demo photographs.
4. For best testing, upload the folder to a static host (Netlify, Vercel or GitHub Pages).

CUSTOMIZE FOR A REAL LIBRARY
----------------------------
Open script.js and edit SITE_CONFIG near the top:

libraryName       Library name
enquiryNumber     Display contact number
whatsappNumber    WhatsApp number with country code, digits only
ownerName         Owner name
ownerMobileDisplay Owner mobile display text
directions        Destination text

Then edit index.html:
- Replace sample owner details, timings and membership prices.
- Replace the stock image URLs with actual library photographs.
- Update the Google Maps links if the actual library address is known.
- Update the facilities list to match the real library.

WHATSAPP
--------
The enquiry form opens WhatsApp with a pre-filled message. The visitor reviews
and sends it in WhatsApp. No form data is stored by this static demo.

IMPORTANT DEMO NOTES
--------------------
- No Firebase, database, admin panel or server backend is included.
- Gallery and hero use remote Unsplash stock photos as visual demo assets.
  They are not verified photos of XYZ Library.
- Membership prices and opening hours are sample placeholders.
- Directions currently point to a Noida, Uttar Pradesh search, not a verified
  street-level library pin.
- WhatsApp integration needs a valid WhatsApp number before client deployment.

This is a static HTML/CSS/JavaScript website and can be hosted on any static host.
