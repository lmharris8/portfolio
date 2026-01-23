/**
 * Gallery and library initialization for portfolio site
 */

let lightbox = null;

/**
 * Per-gallery configuration for thumbnail display
 * zoom: { imageNumber: scaleValue } - higher values show less of the image
 * border: [imageNumbers] - adds border to specified images
 */
const galleryConfig = {
    usf: {
        border: [15, 16, 17, 18, 19],
    },
};

/**
 * Initialize gallery from data attributes on body
 */
function initGallery() {
    const body = document.body;
    const folder = body.dataset.gallery;
    const count = parseInt(body.dataset.galleryCount, 10);
    const gallery = document.getElementById("gallery");

    if (folder && count && gallery) {
        renderThumbnails(gallery, folder, count);
    }
}

/**
 * Get size class for masonry layout based on image index
 * Creates visual variety with featured first image and alternating sizes
 */
function getMasonryClass(index, total) {
    // First image is always featured (large)
    if (index === 0) return "featured";

    // For small galleries, keep it simple
    if (total <= 4) return "";

    // Create a varied pattern for larger galleries
    // Pattern repeats every 6 images after the featured one
    const patternIndex = (index - 1) % 6;

    switch (patternIndex) {
        case 1:
            return "tall";
        case 3:
            return "wide";
        default:
            return "";
    }
}

/**
 * Render thumbnail grid for a gallery using GLightbox
 * Supports both legacy thumbnail grid and new masonry layout
 */
function renderThumbnails(gallery, folder, total) {
    const isMasonry = gallery.classList.contains("masonry-gallery");

    if (isMasonry) {
        renderMasonryGallery(gallery, folder, total);
    } else {
        renderLegacyThumbnails(gallery, folder, total);
    }

    // Initialize GLightbox after thumbnails are rendered
    initLightbox();
}

/**
 * Render masonry gallery with varied image sizes
 */
function renderMasonryGallery(gallery, folder, total) {
    const config = galleryConfig[folder] || {};

    const thumbnails = Array.from({ length: total }, (_, i) => {
        const num = i + 1;
        const sizeClass = getMasonryClass(i, total);
        const zoom = config.zoom?.[num];
        const hasBorder = config.border?.includes(num);
        const imgStyle = zoom ? `transform: scale(${zoom})` : "";
        const linkStyle = hasBorder ? "border: 1px solid rgba(0, 0, 0, 0.15)" : "";

        return `
            <a href="img/${folder}/${num}.png" 
               class="glightbox ${sizeClass}"
               data-gallery="project-gallery"
               role="listitem"
               aria-label="View image ${num} of ${total}"
               style="${linkStyle}">
                <img src="img/${folder}/${num}.png" 
                     class="gallery-img"
                     alt="Project image ${num}"
                     loading="${i < 4 ? "eager" : "lazy"}"
                     style="${imgStyle}">
            </a>
        `;
    }).join("");

    gallery.innerHTML = thumbnails;
}

/**
 * Render legacy thumbnail grid (for backward compatibility)
 */
function renderLegacyThumbnails(gallery, folder, total) {
    const isLarge = total === 1;
    const className = isLarge ? "thumbnail-large" : "thumbnail";

    const thumbnails = Array.from({ length: total }, (_, i) => {
        const num = i + 1;
        return `
            <a href="img/${folder}/${num}.png" 
               class="glightbox thumbnail-link" 
               data-gallery="project-gallery"
               data-description="Image ${num} of ${total}"
               role="listitem"
               aria-label="View image ${num} of ${total}">
                <div class="${className}" 
                     style="background-image: url('img/${folder}/${num}.png')"
                     role="img"
                     aria-label="Project image ${num}"></div>
            </a>
        `;
    }).join("");

    gallery.innerHTML = thumbnails;
}

/**
 * Initialize GLightbox
 */
function initLightbox() {
    if (typeof GLightbox !== "undefined") {
        lightbox = GLightbox({
            selector: ".glightbox",
            touchNavigation: true,
            loop: true,
            autoplayVideos: false,
            openEffect: "fade",
            closeEffect: "fade",
            slideEffect: "fade",
            preload: true,
        });
    }
}

/**
 * Initialize Lucide icons
 */
function initLucide() {
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
}

/**
 * Initialize all functionality
 */
function init() {
    // Initialize Lucide icons
    initLucide();

    // Initialize gallery if present
    initGallery();

    // Initialize lightbox for any static glightbox links (like rubric page)
    initLightbox();
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}
