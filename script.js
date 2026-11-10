/* XYZ Library demo settings: update the values in this section for each client. */
const SITE_CONFIG = {
  libraryName: "XYZ Library",
  enquiryNumber: "9870931288",
  whatsappNumber: "919870931288", // country code + number, digits only
  ownerName: "XYZ",
  ownerMobileDisplay: "9870xxxxxc",
  directions: "Noida, Uttar Pradesh"
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

$$("[data-library-name]").forEach(el => el.textContent = SITE_CONFIG.libraryName);
$("#year").textContent = new Date().getFullYear();

const whatsappUrl = (message = "Hello! I would like to know more about " + SITE_CONFIG.libraryName + ".") =>
  `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

["#floatingWhatsApp", "#footerWhatsApp"].forEach(sel => {
  const link = $(sel);
  if (link) link.href = whatsappUrl();
});

const modal = $("#contactModal");
const interest = $("#visitorInterest");
function openModal(value = "General enquiry") {
  interest.value = value;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  setTimeout(() => $("#visitorName").focus(), 100);
}
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}
$$("[data-open-booking]").forEach(btn => btn.addEventListener("click", () => openModal("Book a seat")));
$$("[data-open-enquiry]").forEach(btn => btn.addEventListener("click", () => openModal("General enquiry")));
$$("[data-plan]").forEach(btn => btn.addEventListener("click", () => openModal(btn.dataset.plan)));
$$("[data-close-modal]").forEach(btn => btn.addEventListener("click", closeModal));
document.addEventListener("keydown", e => { if (e.key === "Escape") { closeModal(); closeLightbox(); } });

$("#contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = String(data.get("name") || "").trim();
  const phone = String(data.get("phone") || "").trim();
  const selected = String(data.get("interest") || "General enquiry");
  const message = String(data.get("message") || "").trim();
  const text = [
    `Hello ${SITE_CONFIG.libraryName}!`,
    "",
    "I would like to make an enquiry.",
    `Name: ${name}`,
    `Mobile: ${phone}`,
    `Interested in: ${selected}`,
    message ? `Message: ${message}` : "",
    "",
    "Please share the details. Thank you!"
  ].filter(Boolean).join("\n");
  window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
  closeModal();
});

$("#themeToggle").addEventListener("click", () => {
  const dark = document.body.classList.toggle("dark");
  $(".theme-symbol").textContent = dark ? "☀" : "☾";
  $("#themeToggle").setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  document.querySelector('meta[name="theme-color"]').content = dark ? "#101820" : "#f5f6f8";
});

$("#menuToggle").addEventListener("click", () => {
  $("#mainNav").classList.toggle("open");
});
$$('#mainNav a').forEach(link => link.addEventListener("click", () => $("#mainNav").classList.remove("open")));

$("#shareButton").addEventListener("click", async () => {
  const shareData = { title: SITE_CONFIG.libraryName, text: "Explore " + SITE_CONFIG.libraryName, url: location.href };
  if (navigator.share) {
    try { await navigator.share(shareData); } catch (err) { /* share sheet dismissed */ }
  } else if (navigator.clipboard) {
    try { await navigator.clipboard.writeText(location.href); alert("Website link copied!"); } catch (err) { alert("Copy this link: " + location.href); }
  } else {
    alert("Website link: " + location.href);
  }
});

const galleryImages = [
  "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1600&q=90",
  "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1600&q=90",
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=90",
  "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1600&q=90"
];
let galleryIndex = 0;
const lightbox = $("#lightbox");
function showGallery(index) {
  galleryIndex = (index + galleryImages.length) % galleryImages.length;
  $("#lightboxImage").src = galleryImages[galleryIndex];
  $("#lightboxCount").textContent = `${String(galleryIndex + 1).padStart(2, "0")} / 04`;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
}
$$("[data-gallery]").forEach(btn => btn.addEventListener("click", () => showGallery(Number(btn.dataset.gallery))));
$("#lightboxClose").addEventListener("click", closeLightbox);
$("#lightboxPrev").addEventListener("click", () => showGallery(galleryIndex - 1));
$("#lightboxNext").addEventListener("click", () => showGallery(galleryIndex + 1));
lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "ArrowLeft") showGallery(galleryIndex - 1);
  if (e.key === "ArrowRight") showGallery(galleryIndex + 1);
});

// Highlight the nav item for the section currently in view.
const navLinks = $$("#mainNav a");
const sections = navLinks.map(a => $(a.getAttribute("href"))).filter(Boolean);
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach(section => observer.observe(section));
}
