document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize AOS
    AOS.init({
        duration: 1100,
        once: true,
        offset: 100,
        easing: 'ease-out-quart',
    });

    // 2. GSAP Hero Animation - More reliable version
    if (typeof gsap !== "undefined") {
        gsap.set("#hero-text, #hero-card, .logo-img, .nav-link", { opacity: 0 }); // Safe initial state

        const tl = gsap.timeline();

        tl.fromTo(".logo-img", 
            { opacity: 0, y: -40 }, 
            { duration: 1.1, opacity: 1, y: 0, ease: "power4.out" }
        )
        .fromTo(".nav-link", 
            { opacity: 0, y: -20 }, 
            { duration: 0.9, opacity: 1, y: 0, stagger: 0.1, ease: "power3.out" }, 
            "-=0.7"
        )
        .fromTo("#hero-text", 
            { opacity: 0, y: 80 }, 
            { duration: 1.6, opacity: 1, y: 0, ease: "power4.out" }, 
            "-=0.8"
        )
        .fromTo("p.mt-10", 
            { opacity: 0, y: 40 }, 
            { duration: 1.1, opacity: 1, y: 0, ease: "power3.out" }, 
            "-=1"
        )
        .fromTo("#hero-card", 
            { opacity: 0, x: 80 }, 
            { duration: 1.3, opacity: 1, x: 0, ease: "power3.out" }, 
            "-=1.1"
        );

        console.log("✅ GSAP Hero Animation Started");
    } else {
        console.warn("GSAP not loaded");
        // Fallback: show everything if GSAP fails
        document.querySelectorAll("#hero-text, #hero-card, .logo-img, .nav-link").forEach(el => {
            el.style.opacity = 1;
        });
    }

    // 3. Mobile Menu Logic
    const menu = document.getElementById('mobileMenu');
    const button = document.getElementById('mobileMenuButton');
    const icon = button?.querySelector('svg');

    if (button && menu && icon) {
        const hamburgerPath = 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5';
        const closePath = 'M6 18L18 6M6 6l12 12';

        button.addEventListener('click', () => {
            const isHidden = menu.classList.toggle('hidden');
            const path = icon.querySelector('path');
            path.setAttribute('d', isHidden ? hamburgerPath : closePath);
        });

        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.add('hidden');
                icon.querySelector('path').setAttribute('d', hamburgerPath);
            });
        });
    }

    // 4. Refresh AOS after load
    window.addEventListener('load', () => {
        AOS.refresh();
    });

    console.log('%c✅ Mazaj Studio - Animations Initialized Successfully', 'color:#00d4ff; font-weight:bold;');
});