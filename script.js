
/* ==========================================
   VANDANA GEDDATA PORTFOLIO
   SMOOTH INTERACTIONS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================
       1. MOBILE NAVIGATION
    ====================================== */

    const menuToggle = document.getElementById("menu-toggle");
    const nav = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");

    function closeMenu() {
        if (!menuToggle || !nav) return;

        nav.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.className = "fas fa-bars";
        }
    }

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {

            const isOpen = nav.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.className = isOpen
                    ? "fas fa-xmark"
                    : "fas fa-bars";
            }
        });

        navItems.forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });
    }


    /* ======================================
       2. ACTIVE NAVIGATION LINK
    ====================================== */

    const sections = document.querySelectorAll(
        "section[id]"
    );

    function updateNavigation() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 180;

            if (window.scrollY >= sectionTop) {
                currentSection = section.id;
            }
        });

        navItems.forEach(link => {

            const isActive =
                link.getAttribute("href") ===
                "#" + currentSection;

            link.classList.toggle("active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    window.addEventListener(
        "scroll",
        updateNavigation,
        { passive: true }
    );

    updateNavigation();


    /* ======================================
       3. SCROLL TO TOP BUTTON
    ====================================== */

    const topBtn = document.getElementById("topBtn");

    function updateTopButton() {

        if (!topBtn) return;

        topBtn.classList.toggle(
            "visible",
            window.scrollY > 400
        );
    }

    window.addEventListener(
        "scroll",
        updateTopButton,
        { passive: true }
    );

    updateTopButton();

    if (topBtn) {

        topBtn.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });
    }


    /* ======================================
       4. SMOOTH SCROLL REVEAL
    ====================================== */

    const revealItems = document.querySelectorAll(
        ".project-card, .skill-card, .certificate-card, " +
        ".timeline-content, .contact-card, .step"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);
                    }
                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -30px 0px"
            }
        );

        revealItems.forEach(item => {
            observer.observe(item);
        });

    } else {

        revealItems.forEach(item => {
            item.classList.add("show");
        });
    }

});
