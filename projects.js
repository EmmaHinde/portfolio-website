// --- Collect all project cards ---
const projectCards = document.querySelectorAll(".project-card");

// --- Collect all tags from all projects ---
let allTags = new Set();

projectCards.forEach(card => {
    const tags = card.querySelectorAll(".project-tags span");
    tags.forEach(tag => allTags.add(tag.textContent.trim()));
});

// --- Create filter bar ---
const filterBar = document.createElement("div");
filterBar.className = "filter-bar";

// Convert Set → Array for slicing
const tagArray = [...allTags];

// Limit shown tags to 6 initially
let showAllTags = false;

// Function to render tag buttons
function renderTags() {
    filterBar.innerHTML = "";

    const visibleTags = showAllTags ? tagArray : tagArray.slice(0, 6);

    visibleTags.forEach(tag => {
        const btn = document.createElement("button");
        btn.className = "filter-btn";
        btn.textContent = tag;

        btn.addEventListener("click", () => {
            toggleTagFilter(btn, tag);
        });

        filterBar.appendChild(btn);
    });

    // Show All / Collapse button
    const toggleBtn = document.createElement("button");
    toggleBtn.className = "filter-btn toggle-tags";
    toggleBtn.textContent = showAllTags ? "Show Less" : "Show All Tags";

    toggleBtn.addEventListener("click", () => {
        showAllTags = !showAllTags;
        renderTags();
    });

    filterBar.appendChild(toggleBtn);
}

renderTags();

// --- Filtering logic ---
let activeTag = null;

function toggleTagFilter(btn, tag) {
    // If clicking the active tag → clear filter
    if (activeTag === tag) {
        activeTag = null;
        projectCards.forEach(card => (card.style.display = ""));
        highlightActive(null);
        return;
    }

    // Otherwise apply new filter
    activeTag = tag;

    projectCards.forEach(card => {
        const tags = [...card.querySelectorAll(".project-tags span")].map(t =>
            t.textContent.trim()
        );
        card.style.display = tags.includes(tag) ? "" : "none";
    });

    highlightActive(btn);
}

// --- Highlight active tag ---
function highlightActive(activeBtn) {
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    if (activeBtn) activeBtn.classList.add("active");
}

// --- Insert filter bar above the projects grid ---
const projectsSection = document.querySelector(".projects-section");
projectsSection.insertBefore(filterBar, projectsSection.children[1]);


