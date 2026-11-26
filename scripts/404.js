
/* =====================================
   BURTON — 404 INTERACTION SYSTEM
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    // LIVE CLOCK
    const clock = document.getElementById("currentTime");

    function updateClock() {
        if (!clock) return;

        clock.textContent = new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        }).format(new Date());
    }

    updateClock();
    setInterval(updateClock, 1000);


    // GO BACK BUTTON
    const backButton = document.getElementById("goBack");

    if (backButton) {
        backButton.addEventListener("click", () => {

            if (document.referrer &&
                new URL(document.referrer).origin === window.location.origin) {

                history.back();

            } else {

                window.location.href = "index.html";

            }

        });
    }


    // GLITCH EFFECT
    const errorCode = document.querySelector(".error-code");

    if (errorCode) {
        errorCode.addEventListener("mouseenter", () => {
            errorCode.classList.add("glitch-active");
        });

        errorCode.addEventListener("mouseleave", () => {
            errorCode.classList.remove("glitch-active");
        });
    }


    // CONSOLE BRANDING
    console.log(
        "%c BURTON SYSTEM ",
        "background:#080808;color:#fff;padding:10px;font-weight:bold;"
    );

    console.log(
        "%c ERROR 404 — PAGE NOT FOUND ",
        "color:#888;font-size:12px;"
    );

});
