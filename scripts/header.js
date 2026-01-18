/**
 * Navigation handling for the portfolio site
 */

function toggleNavbar() {
    const navlinks = document.getElementById('navlinks');
    const menubutton = document.getElementById('menubutton');
    const backdrop = document.getElementById('nav-backdrop');
    
    if (!navlinks || !menubutton) return;
    
    const isExpanded = navlinks.classList.contains('active');
    
    navlinks.classList.toggle('active');
    backdrop?.classList.toggle('active');
    menubutton.setAttribute('aria-expanded', !isExpanded);
}

function closeNavbar() {
    const navlinks = document.getElementById('navlinks');
    const menubutton = document.getElementById('menubutton');
    const backdrop = document.getElementById('nav-backdrop');
    
    if (!navlinks || !menubutton) return;
    
    navlinks.classList.remove('active');
    backdrop?.classList.remove('active');
    menubutton.setAttribute('aria-expanded', 'false');
}

function loadNav() {
    const navbar = document.getElementById('navbar');
    
    if (!navbar) return;
    
    // Close menu when clicking a nav link
    const navlinks = document.getElementById('navlinks');
    if (navlinks) {
        navlinks.addEventListener('click', (e) => {
            if (e.target.classList.contains('navLink')) {
                closeNavbar();
            }
        });
    }
    
    // Close menu when clicking backdrop
    const backdrop = document.getElementById('nav-backdrop');
    if (backdrop) {
        backdrop.addEventListener('click', closeNavbar);
    }
    
    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeNavbar();
        }
    });
}

// Initialize navigation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNav);
} else {
    loadNav();
}
