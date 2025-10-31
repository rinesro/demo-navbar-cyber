
function switchTheme(themeClass) {
    const navbar = document.querySelector('nav');
    
    
    navbar.classList.remove('theme-crimson', 'theme-matrix');
    
    
    const logo = navbar.querySelector('.logo');
    
    
    if (themeClass) {
        navbar.classList.add(themeClass);
    }

    
    if (themeClass === 'theme-crimson') {
        logo.textContent = 'CRIMSON';
    } else if (themeClass === 'theme-matrix') {
        logo.textContent = 'MATRIX';
    } else {
        logo.textContent = 'DEFAULT';
    }
}


document.addEventListener('DOMContentLoaded', () => {
    
    const initialNavbar = document.querySelector('nav');
    if (initialNavbar) {
        if (initialNavbar.classList.contains('theme-crimson')) {
            switchTheme('theme-crimson');
        } else if (initialNavbar.classList.contains('theme-matrix')) {
            switchTheme('theme-matrix');
        } else {
            switchTheme('');
        }
    }

    const allNavbars = document.querySelectorAll('nav');

    allNavbars.forEach(nav => {
        const toggle = nav.querySelector('.menu-toggle');
        const menu = nav.querySelector('.nav-links');
        const dropdowns = nav.querySelectorAll('.dropdown > a');

        
        if (toggle && menu) {
            toggle.addEventListener('click', e => {
                e.stopPropagation();
                
                const isExpanded = toggle.classList.toggle('active');
                menu.classList.toggle('active');
                nav.classList.toggle('menu-open');

                toggle.setAttribute('aria-expanded', isExpanded);
                toggle.setAttribute('aria-label', isExpanded ? 'Tutup menu' : 'Buka menu');
            });
        }

        
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', e => {
                const isMobileView = window.innerWidth <= 820;

                if (isMobileView) {
                    e.preventDefault();
                    const parent = dropdown.parentElement;
                    parent.classList.toggle('open');
                }
            });
        });
    });

    
    document.addEventListener('click', e => {
        const activeMenu = document.querySelector('.nav-links.active');
        const activeToggle = document.querySelector('.menu-toggle.active');
        const activeNav = document.querySelector('nav.menu-open');

        if (activeMenu && activeToggle && activeNav) {
            if (!activeNav.contains(e.target)) {
                activeMenu.classList.remove('active');
                activeToggle.classList.remove('active');
                activeNav.classList.remove('menu-open');

                activeNav.querySelectorAll('.dropdown.open').forEach(dropdown => {
                    dropdown.classList.remove('open');
                });

                activeToggle.setAttribute('aria-expanded', 'false');
                activeToggle.setAttribute('aria-label', 'Buka menu');
            }
        }
    });
});