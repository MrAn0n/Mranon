
/* =====================================
   BURTON — ANNOUNCEMENTS SYSTEM
===================================== */

/*
    برای انتشار اطلاعیه جدید،
    فقط یک مورد به آرایه announcements اضافه کن.
*/

const announcements = [

    {
        id: 1,
        category: "News",
        date: "2026-11-14",
        title: "WELCOME TO BURTON ANNOUNCEMENTS",
        message: "announcements add to website \n\n From now on, come here to read the full updates. (ADD BY V-Pro) "
    },

];


/* =====================================
   RENDER ANNOUNCEMENTS
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    const list = document.getElementById("announcementsList");
    const count = document.getElementById("announcementCount");

    if (!list || !count) return;

    const sortedAnnouncements = [...announcements].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    count.textContent =
        `${String(sortedAnnouncements.length).padStart(2, "0")} POSTS`;

    if (sortedAnnouncements.length === 0) {
        list.innerHTML = `
            <div class="ann-empty">
                <span>NO ANNOUNCEMENTS YET</span>
                <p>New messages will appear here.</p>
            </div>
        `;
        return;
    }

    list.innerHTML = sortedAnnouncements.map(item => {

        const card = document.createElement("article");
        card.className = "ann-card";

        const top = document.createElement("div");
        top.className = "ann-card-top";

        const category = document.createElement("span");
        category.className = "ann-category";
        category.textContent = item.category;

        const date = document.createElement("time");
        date.className = "ann-date";
        date.dateTime = item.date;
        date.textContent = formatDate(item.date);

        const title = document.createElement("h3");
        title.textContent = item.title;

        const message = document.createElement("p");
        message.textContent = item.message;

        top.append(category, date);
        card.append(top, title, message);

        return card.outerHTML;

    }).join("");

});


/* =====================================
   DATE FORMAT
===================================== */

function formatDate(dateString) {

    const date = new Date(`${dateString}T12:00:00`);

    if (Number.isNaN(date.getTime())) {
        return dateString;
    }

    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit"
    }).format(date);

}
