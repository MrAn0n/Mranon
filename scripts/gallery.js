/* =====================================
   BURTON — MEDIA GALLERY
   Add your files inside assets/gallery/
===================================== */

/*
  HOW TO ADD MEDIA:
  image: { type: "image", title: "TITLE", category: "CATEGORY", src: "assets/gallery/photo.jpg" }
  video: { type: "video", title: "TITLE", category: "CATEGORY", src: "assets/gallery/video.mp4", poster: "assets/gallery/video-cover.jpg" }

  Keep image and video source files in the assets/gallery/ folder.
*/

const GALLERY_MEDIA = [

];

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("galleryGrid");
    const searchInput = document.getElementById("gallerySearch");
    const emptyState = document.getElementById("emptyState");
    const viewer = document.getElementById("mediaViewer");
    const viewerContent = document.getElementById("viewerContent");
    const viewerTitle = document.getElementById("viewerTitle");
    const viewerType = document.getElementById("viewerType");
    const viewerPosition = document.getElementById("viewerPosition");

    if (!grid || !viewer) return;

    let activeFilter = "all";
    let visibleItems = [];
    let currentIndex = 0;

    const pad = value => String(value).padStart(2, "0");

    document.getElementById("year").textContent = new Date().getFullYear();

    function updateCounts() {
        const photos = GALLERY_MEDIA.filter(item => item.type === "image").length;
        const videos = GALLERY_MEDIA.filter(item => item.type === "video").length;

        document.getElementById("totalCount").textContent = pad(GALLERY_MEDIA.length);
        document.getElementById("allCount").textContent = pad(GALLERY_MEDIA.length);
        document.getElementById("photoCount").textContent = pad(photos);
        document.getElementById("videoCount").textContent = pad(videos);
        document.getElementById("footerCount").textContent = pad(GALLERY_MEDIA.length);
    }

    function getFilteredItems() {
        const query = searchInput.value.trim().toLowerCase();

        return GALLERY_MEDIA.filter(item => {
            const matchesFilter = activeFilter === "all" || item.type === activeFilter;
            const searchable = `${item.title} ${item.category} ${item.type}`.toLowerCase();
            return matchesFilter && searchable.includes(query);
        });
    }

    function renderGallery() {
        visibleItems = getFilteredItems();
        grid.innerHTML = "";

        visibleItems.forEach((item, index) => {
            const card = document.createElement("button");
            card.type = "button";
            card.className = "media-card";
            card.setAttribute("aria-label", `Open ${item.title}`);

            const media = document.createElement("img");
            media.src = item.type === "video" ? (item.poster || "") : item.src;
            media.alt = item.title;
            media.loading = "lazy";
            media.addEventListener("error", () => {
                media.style.opacity = "0";
                card.classList.add("media-missing");
            });

            const type = document.createElement("span");
            type.className = "media-type";
            type.textContent = item.type === "video" ? "VIDEO" : "PHOTO";

            const info = document.createElement("span");
            info.className = "media-info";

            const textWrap = document.createElement("span");
            const title = document.createElement("strong");
            title.textContent = item.title;
            const category = document.createElement("small");
            category.textContent = item.category || (item.type === "video" ? "VIDEO" : "PHOTOGRAPHY");
            textWrap.append(title, category);

            const number = document.createElement("span");
            number.className = "media-index";
            number.textContent = pad(index + 1);
            info.append(textWrap, number);

            card.append(media, type);

            if (item.type === "video") {
                const play = document.createElement("span");
                play.className = "play-indicator";
                play.textContent = "▶";
                card.append(play);
            }

            card.append(info);
            card.addEventListener("click", () => openViewer(index));
            grid.appendChild(card);
        });

        emptyState.hidden = visibleItems.length !== 0;
    }

    function openViewer(index) {
        currentIndex = index;
        const item = visibleItems[currentIndex];
        if (!item) return;

        viewerContent.innerHTML = "";

        let mediaElement;
        if (item.type === "video") {
            mediaElement = document.createElement("video");
            mediaElement.src = item.src;
            if (item.poster) mediaElement.poster = item.poster;
            mediaElement.controls = true;
            mediaElement.autoplay = true;
            mediaElement.playsInline = true;
        } else {
            mediaElement = document.createElement("img");
            mediaElement.src = item.src;
            mediaElement.alt = item.title;
        }

        viewerContent.appendChild(mediaElement);
        viewerTitle.textContent = item.title;
        viewerType.textContent = item.type === "video" ? "VIDEO" : "PHOTO";
        viewerPosition.textContent = `${pad(currentIndex + 1)} / ${pad(visibleItems.length)}`;

        viewer.classList.add("active");
        viewer.setAttribute("aria-hidden", "false");
        document.body.classList.add("viewer-open");
    }

    function closeViewer() {
        viewer.classList.remove("active");
        viewer.setAttribute("aria-hidden", "true");
        document.body.classList.remove("viewer-open");
        const video = viewerContent.querySelector("video");
        if (video) video.pause();
        viewerContent.innerHTML = "";
    }

    function moveViewer(direction) {
        if (!visibleItems.length) return;
        currentIndex = (currentIndex + direction + visibleItems.length) % visibleItems.length;
        openViewer(currentIndex);
    }

    document.querySelectorAll(".filter-btn").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelector(".filter-btn.active")?.classList.remove("active");
            button.classList.add("active");
            activeFilter = button.dataset.filter;
            renderGallery();
        });
    });

    searchInput.addEventListener("input", renderGallery);
    document.getElementById("viewerClose").addEventListener("click", closeViewer);
    document.getElementById("viewerPrev").addEventListener("click", () => moveViewer(-1));
    document.getElementById("viewerNext").addEventListener("click", () => moveViewer(1));

    viewer.addEventListener("click", event => {
        if (event.target === viewer) closeViewer();
    });

    document.addEventListener("keydown", event => {
        if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
            event.preventDefault();
            searchInput.focus();
        }

        if (!viewer.classList.contains("active")) return;

        if (event.key === "Escape") closeViewer();
        if (event.key === "ArrowLeft") moveViewer(-1);
        if (event.key === "ArrowRight") moveViewer(1);
    });

    updateCounts();
    renderGallery();
});
