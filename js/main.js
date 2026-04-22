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

    // 4. Contact Form Logic
    const form = document.getElementById('elegantContactForm');
    const statusDiv = document.getElementById('formStatusMsg');
    const submitBtn = document.getElementById('submitBtn');

    if (form && statusDiv && submitBtn) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const required = form.querySelectorAll('[required]');
            let isValid = true;

            required.forEach((field) => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#ff6b6b';
                    isValid = false;
                } else {
                    field.style.borderColor = 'rgba(255,255,255,0.12)';
                }
            });

            if (!isValid) {
                statusDiv.classList.add('show');
                statusDiv.innerHTML = 'Please fill all required fields before submitting.';
                statusDiv.className = 'status-box show mt-5 rounded-xl p-3 text-sm font-medium bg-rose-500/10 text-rose-300 border border-rose-500/30';
                return;
            }

            statusDiv.classList.add('show');
            statusDiv.innerHTML = 'Sending your strategic brief...';
            statusDiv.className = 'status-box show mt-5 rounded-xl p-3 text-sm font-medium bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/30';
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Submitting ...';

            try {
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: { Accept: 'application/json' }
                });

                if (!response.ok) throw new Error('Submission failed');

                statusDiv.innerHTML = 'Inquiry received. We will review and reply within 48 hours.';
                statusDiv.className = 'status-box show mt-5 rounded-xl p-3 text-sm font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/30';
                form.reset();
            } catch (error) {
                statusDiv.innerHTML = 'Submission error. Please email us directly at hello@mazajcontent.com';
                statusDiv.className = 'status-box show mt-5 rounded-xl p-3 text-sm font-medium bg-rose-500/10 text-rose-300 border border-rose-500/30';
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Submit strategic brief →';
            }
        });
    }

    // 5. Refresh AOS after load
    window.addEventListener('load', () => {
        AOS.refresh();
    });

    console.log('%c✅ Mazaj Studio - Animations Initialized Successfully', 'color:#00d4ff; font-weight:bold;');
});