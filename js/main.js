document.addEventListener('DOMContentLoaded', () => {
    const menu = document.getElementById('mobileMenu');
    const icon = document.getElementById('hamburger');
    const button = document.getElementById('mobileMenuButton');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

    if (!menu || !icon || !button) {
        return;
    }

    const hamburgerIconPath = 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5';
    const closeIconPath = 'M6 18L18 6M6 6l12 12';

    function setMenuState(isOpen) {
        menu.classList.toggle('hidden', !isOpen);
        button.setAttribute('aria-expanded', String(isOpen));
        icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="${isOpen ? closeIconPath : hamburgerIconPath}" />`;
    }

    function toggleMobileMenu() {
        const isOpen = menu.classList.contains('hidden');
        setMenuState(isOpen);
    }

    button.addEventListener('click', toggleMobileMenu);

    mobileMenuLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (!menu.classList.contains('hidden')) {
                setMenuState(false);
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            setMenuState(false);
        }
    });

    setMenuState(false);

    console.log('%c✅ Mazaj Content — Final responsive version loaded.', 'color:#00d4ff; font-family:monospace;');
});