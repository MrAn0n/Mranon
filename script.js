
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

        });
    }


    /* =====================================
       2. BACKGROUND MUSIC
    ===================================== */

    function updateMusicButton() {
        if (!musicButton || !music) return;

        musicButton.textContent = music.paused
            ? "♫ SOUND OFF"
            : "♫ SOUND ON";

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
       8. DEBUG
    ===================================== */

    console.log(
        "%c BURTON WEBSITE ",
        "background:#fff;color:#000;padding:8px;font-weight:bold;"
    );

    console.log("Website initialized successfully.");

});
