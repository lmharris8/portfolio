/**
 * Navigation handling for the portfolio site
 */

const NAV_ITEMS = [
    { href: 'index.html', label: 'Home', page: 'home' },
    { href: 'portfolio.html', label: 'Portfolio', page: 'portfolio' },
    { href: 'cv.html', label: 'Curriculum Vitae', page: 'cv' },
    { href: 'thesis.html', label: 'Thesis', page: 'thesis' },
    { href: 'contact.html', label: 'Contact', page: 'contact' }
];

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

function getHeaderCode(currentPage) {
    const navItems = NAV_ITEMS.map(item => {
        const isActive = item.page === currentPage;
        const activeClass = isActive ? ' active-link' : '';
        const ariaCurrent = isActive ? ' aria-current="page"' : '';
        return `<li><a href="${item.href}" class="navLink${activeClass}"${ariaCurrent}>${item.label.toUpperCase()}</a></li>`;
    }).join('\n');
    
    return `
        <button type="button" id="menubutton" onclick="toggleNavbar()" aria-expanded="false" aria-controls="navlinks" aria-label="Toggle navigation menu">&#9776;</button>
        <span class="square" aria-hidden="true"></span>
        <span id="title">LAURA HARRIS</span>
        <span class="spacer"></span>
        <div id="navlinks">
            <ul>
                ${navItems}
            </ul>
        </div>
        <div id="nav-backdrop" aria-hidden="true"></div>
    `;
}

function loadNav() {
    const currentPageEl = document.getElementById('currentPage');
    const navbar = document.getElementById('navbar');
    
    if (!navbar) return;
    
    // Only generate HTML if navbar is empty (allows static HTML in pages)
    if (!navbar.querySelector('#navlinks')) {
        const currentPage = currentPageEl ? currentPageEl.textContent.trim() : 'home';
        navbar.innerHTML = getHeaderCode(currentPage);
    }
    
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
