/* Vandana Geddada Portfolio – refreshed interactions */
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const nav = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");
    const topBtn = document.getElementById("topBtn");

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("active");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
            const icon = menuToggle.querySelector("i");
            if (icon) icon.className = isOpen ? "fas fa-xmark" : "fas fa-bars";
        });

        navItems.forEach(link => link.addEventListener("click", () => {
            nav.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            const icon = menuToggle.querySelector("i");
            if (icon) icon.className = "fas fa-bars";
        }));
    }

    const sections = document.querySelectorAll("main section, body > section, section[id]");
    const updateNavigation = () => {
        let current = "";
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 160) current = section.id;
        });
        navItems.forEach(link => {
            const active = link.getAttribute("href") === "#" + current;
            link.classList.toggle("active", active);
            if (active) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
        });
        if (topBtn) topBtn.style.display = window.scrollY > 400 ? "block" : "none";
    };
    window.addEventListener("scroll", updateNavigation, { passive: true });
    updateNavigation();

    if (topBtn) {
        topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }

    const revealItems = document.querySelectorAll(
        ".project-card, .skill-card, .certificate-card, .timeline-content, .contact-card, .step"
    );
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealItems.forEach(item => observer.observe(item));
    } else {
        revealItems.forEach(item => item.classList.add("show"));
    }
});
