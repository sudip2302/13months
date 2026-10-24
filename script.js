
document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector(".nav-links");
    const toggle = document.querySelector(".menu-toggle");

    if (toggle && nav) {
        toggle.addEventListener("click", () => {
            nav.classList.toggle("open");
        });
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

    const year = document.querySelectorAll("[data-anniversary]");
    year.forEach(el => el.textContent = OUR_STORY.anniversary);

    const reasons = document.getElementById("reasonsGrid");
    if (reasons && typeof OUR_STORY !== "undefined") {
        reasons.innerHTML = OUR_STORY.reasons.map((reason, i) => `
            <article class="glass-card reason-card reveal">
                <div class="reason-number">${String(i + 1).padStart(2,"0")}</div>
                <p>${escapeHTML(reason)}</p>
            </article>
        `).join("");
        reasons.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    }

    const chapters = document.getElementById("chaptersList");
    if (chapters && typeof OUR_STORY !== "undefined") {
        chapters.innerHTML = OUR_STORY.chapters.map(chapter => `
            <article class="timeline-card reveal">
                <div class="timeline-date">${escapeHTML(chapter.date)}</div>
                <h3>${escapeHTML(chapter.title)}</h3>
                <p>${escapeHTML(chapter.text)}</p>
            </article>
        `).join("");
        chapters.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    }

    const notes = document.getElementById("littleThingsGrid");
    if (notes && typeof OUR_STORY !== "undefined") {
        notes.innerHTML = OUR_STORY.littleThings.map(item => `
            <article class="note-card reveal"><p>${escapeHTML(item)}</p></article>
        `).join("");
        notes.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    }

    const letter = document.getElementById("loveLetter");
    if (letter && typeof OUR_STORY !== "undefined") {
        letter.innerHTML = OUR_STORY.letter.split("\n").map(line =>
            `<p>${escapeHTML(line)}</p>`
        ).join("");
    }

    const surpriseButton = document.getElementById("surpriseButton");
    const surpriseMessage = document.getElementById("surpriseMessage");
    if (surpriseButton && surpriseMessage) {
        let lastIndex = -1;
        surpriseButton.addEventListener("click", () => {
            const messages = OUR_STORY.surpriseMessages;
            let index = Math.floor(Math.random() * messages.length);
            if (messages.length > 1) {
                while (index === lastIndex) index = Math.floor(Math.random() * messages.length);
            }
            lastIndex = index;
            surpriseMessage.textContent = messages[index];
        });
    }

    document.querySelectorAll("[data-name='her']").forEach(el => el.textContent = OUR_STORY.herName);
    document.querySelectorAll("[data-name='you']").forEach(el => el.textContent = OUR_STORY.yourName);
});

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}
