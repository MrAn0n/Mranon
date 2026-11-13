
/* =====================================
   BURTON — MAIN SCRIPT
   Simple and compatible with index.html
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ELEMENTS
    const intro = document.getElementById("intro");
    const site = document.getElementById("site");
    const enterButton = document.getElementById("enterButton");

    const music = document.getElementById("backgroundMusic");
    const musicButton = document.getElementById("musicButton");

    const ribbonTrack = document.getElementById("ribbonTrack");

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    const imageViewer = document.getElementById("imageViewer");
    const viewerImage = document.getElementById("viewerImage");
    const closeViewer = document.getElementById("closeViewer");


    /* =====================================
       1. ENTER WEBSITE
    ===================================== */

    if (enterButton) {
        enterButton.addEventListener("click", async () => {

            if (intro) {
                intro.classList.add("hidden");
            }

            if (site) {
                site.classList.add("visible");
            }

            document.body.classList.remove("no-scroll");

            // Start music after user interaction
            if (music) {
                try {
                    await music.play();
                } catch (error) {
                    console.log("Music playback unavailable:", error);
                }
            }

        /* =====================================
   BURTON — INTERACTIVE PARTICLES
===================================== */

const particleCanvas = document.getElementById("particleCanvas");

if (particleCanvas) {
    const ctx = particleCanvas.getContext("2d");

    let particles = [];
    let mouse = { x: -1000, y: -1000 };
    let width = 0;
    let height = 0;

    const isMobile = window.innerWidth < 700;
    const particleCount = isMobile ? 35 : 65;

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        particleCanvas.width = width * dpr;
        particleCanvas.height = height * dpr;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createParticles() {
        particles = [];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 1.8 + 0.5,
                speedX: (Math.random() - 0.5) * 0.35,
                speedY: (Math.random() - 0.5) * 0.35,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                p.x -= dx * 0.002;
                p.y -= dy * 0.002;
            }

            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
            ctx.fill();
        });

        requestAnimationFrame(drawParticles);
    }

    window.addEventListener("mousemove", event => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });

    window.addEventListener("mouseout", event => {
        if (!event.relatedTarget) {
            mouse.x = -1000;
            mouse.y = -1000;
        }
    });

    window.addEventListener("resize", () => {
        resizeCanvas();
        createParticles();
    });

    resizeCanvas();
    createParticles();
    drawParticles();
}

        });
    }


    /* =====================================
       2. BACKGROUND MUSIC
    ===================================== */

    function updateMusicButton() {
        if (!musicButton || !music) return;

        musicButton.textContent = music.paused
            ? " SOUND OFF"
            : " SOUND ON";

        musicButton.classList.toggle(
            "playing",
            !music.paused
        );
    }

    if (music && musicButton) {

        music.loop = true;
        music.volume = 0.35;

        musicButton.addEventListener("click", async () => {

            if (music.paused) {
                try {
                    await music.play();
                } catch (error) {
                    console.log("Could not play music:", error);
                }
            } else {
                music.pause();
            }

            updateMusicButton();
        });

        music.addEventListener("play", updateMusicButton);
        music.addEventListener("pause", updateMusicButton);

        updateMusicButton();
    }


    /* =====================================
       3. INFINITE IMAGE RIBBON
    ===================================== */

    if (ribbonTrack) {

        const imagePath = "assets/ribbon.png";

        // Remove old generated groups only
        ribbonTrack.innerHTML = "";

        for (let groupIndex = 0; groupIndex < 2; groupIndex++) {

            const group = document.createElement("div");
            group.className = "ribbon-group";

            for (let i = 0; i < 16; i++) {

                const image = document.createElement("img");

                image.src = imagePath;
                image.alt = "";
                image.className = "ribbon-image";
                image.draggable = false;

                image.addEventListener("error", () => {
                    image.remove();
                });

                group.appendChild(image);
            }

            ribbonTrack.appendChild(group);
        }
    }



/* =====================================
   BURTON UPDATE LOG
===================================== */

const updatesTrack = document.getElementById("updatesTrack");

if (updatesTrack) {

    const updates = [
        {
            version: "~~~~~",
            title: "UPDATE FULL",
            description: "add thing + update some system",
            date: "~~~"
        },
    ];

    updatesTrack.innerHTML = "";

    const createCard = (update) => {
        const card = document.createElement("div");
        card.className = "update-card";

        const top = document.createElement("div");
        top.className = "update-top";

        const version = document.createElement("span");
        version.className = "update-version";
        version.textContent = update.version;

        const date = document.createElement("span");
        date.className = "update-date";
        date.textContent = update.date;

        const title = document.createElement("h3");
        title.className = "update-title";
        title.textContent = update.title;

        const description = document.createElement("p");
        description.className = "update-description";
        description.textContent = update.description;

        top.append(version, date);
        card.append(top, title, description);

        return card;
    };

    updates.forEach(update => {
        updatesTrack.appendChild(createCard(update));
    });

    if (updates.length >= 5) {
        [...updates].forEach(update => {
            updatesTrack.appendChild(createCard(update));
        });

        updatesTrack.classList.add("updates-moving");
    }
}



    /* =====================================
       4. MOBILE MENU
    ===================================== */

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            menuToggle.classList.toggle("active");
            navLinks.classList.toggle("open");

        });

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("active");
                navLinks.classList.remove("open");

            });

        });

    }


    /* =====================================
       5. ACTIVE NAVIGATION
    ===================================== */

    const pageSections = document.querySelectorAll("main section[id]");
    const navigationItems = document.querySelectorAll(".nav-links a");

    function updateNavigation() {

        let activeSection = "home";

        pageSections.forEach(section => {

            const sectionTop = section.getBoundingClientRect().top;

            if (sectionTop <= 160) {
                activeSection = section.id;
            }

        });

        navigationItems.forEach(link => {

            const target = link.getAttribute("href");

            link.classList.toggle(
                "active",
                target === "#" + activeSection
            );

        });
    }

    window.addEventListener("scroll", updateNavigation, {
        passive: true
    });


    /* =====================================
       6. GALLERY IMAGE VIEWER
    ===================================== */

    const galleryImages = document.querySelectorAll(".gallery-item img");

    galleryImages.forEach(image => {

        image.addEventListener("click", () => {

            if (!imageViewer || !viewerImage) return;

            viewerImage.src = image.src;
            imageViewer.classList.add("active");
            document.body.classList.add("no-scroll");

        });

    });

    function closeImageViewer() {

        if (!imageViewer) return;

        imageViewer.classList.remove("active");
        document.body.classList.remove("no-scroll");

        if (viewerImage) {
            viewerImage.src = "";
        }

    }

    if (closeViewer) {
        closeViewer.addEventListener("click", closeImageViewer);
    }

    if (imageViewer) {

        imageViewer.addEventListener("click", event => {

            if (event.target === imageViewer) {
                closeImageViewer();
            }

        });

    }

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeImageViewer();
        }

    });


    /* =====================================
       7. FOOTER YEAR
    ===================================== */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


/* =====================================
   7.5 BURTON CINEMATIC EFFECTS
===================================== */

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


/* SCROLL REVEAL */

const revealElements = document.querySelectorAll(
    ".section-heading, .about-layout, .project-card, " +
    ".gallery-item, .contact-links a, .hero-content"
);

if (!reducedMotion) {

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-revealed");

                        revealObserver.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach((element, index) => {

            element.classList.add("cinematic-reveal");

            element.style.transitionDelay =
                `${Math.min(index % 3, 2) * 100}ms`;

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("is-revealed");
        });

    }

}


/* CUSTOM CURSOR */

const finePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
).matches;

if (finePointer && !reducedMotion) {

    const ring = document.createElement("div");
    ring.className = "cinematic-cursor cursor-ring";

    const dot = document.createElement("div");
    dot.className = "cinematic-cursor cursor-dot";

    document.body.append(ring, dot);

    document.body.classList.add("cinematic-cursor-active");

    document.addEventListener("pointermove", event => {

        const x = event.clientX;
        const y = event.clientY;

        ring.style.left = `${x}px`;
        ring.style.top = `${y}px`;

        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;

        ring.style.opacity = "1";
        dot.style.opacity = "1";

    });

    document.addEventListener("pointerover", event => {

        const target = event.target.closest(
            "a, button, .gallery-item"
        );

        ring.classList.toggle(
            "is-hovering",
            Boolean(target)
        );

    });

    document.addEventListener("pointerleave", () => {

        ring.style.opacity = "0";
        dot.style.opacity = "0";

    });

}


/* HERO INTERACTIVE LIGHT */

const hero = document.querySelector(".hero");

if (hero && !reducedMotion && finePointer) {

    hero.addEventListener("pointermove", event => {

        const rect = hero.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        hero.style.setProperty("--glow-x", `${x}px`);
        hero.style.setProperty("--glow-y", `${y}px`);

    });

}

/* =====================================
   BURTON AUTO TYPING
===================================== */

const typingElement = document.getElementById("typingText");

if (typingElement) {

    const typingWords = [
        "Just coding...",
        "this website is open source!.",
        "create app and more...",
        "Welcome to BURTON."
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const typingSpeed = 75;
    const deletingSpeed = 40;
    const pauseAfterTyping = 1600;
    const pauseAfterDeleting = 350;

    function typeEffect() {

        const currentWord = typingWords[wordIndex];

        if (!deleting) {

            typingElement.textContent =
                currentWord.substring(0, charIndex + 1);

            charIndex++;

            if (charIndex === currentWord.length) {

                deleting = true;

                setTimeout(typeEffect, pauseAfterTyping);
                return;
            }

            setTimeout(typeEffect, typingSpeed);

        } else {

            typingElement.textContent =
                currentWord.substring(0, charIndex - 1);

            charIndex--;

            if (charIndex === 0) {

                deleting = false;

                wordIndex = (wordIndex + 1) % typingWords.length;

                setTimeout(typeEffect, pauseAfterDeleting);
                return;
            }

            setTimeout(typeEffect, deletingSpeed);
        }
    }

    typeEffect();
}


    /* =====================================
       8. DEBUG
    ===================================== */

    console.log(
        "%c BURTON WEBSITE ",
        "background:#fff;color:#000;padding:8px;font-weight:bold;"
    );

    console.log("Website initialized successfully.");

});
