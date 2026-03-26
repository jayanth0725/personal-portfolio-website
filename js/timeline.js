const timeline = document.getElementById("timeline"); /* Gets the container of the single event listener */

function saveOpenItems() {
    const items = document.querySelectorAll("#timeline li");
    const openIndexes = [];

    items.forEach((item, index) => {
        const content = item.querySelector(".content");
        if (content.classList.contains("open")) {
            openIndexes.push(index);
        }
    });

    sessionStorage.setItem("timeline-open", JSON.stringify(openIndexes));
}

function expandTimeline(e) {    /* e contains info about what was clicked */
    const button = e.target.closest(".toggle"); /* Makes sure that if user clicks slightly off, it still gets the correct button, checks for closest neighbour with class .toggle */
    if(!button) return; /* If click is outside it, return */

    const content = button.nextElementSibling;
    const isOpen = content.classList.contains("open"); /* Checks if the timeline element is expanded */

    if(isOpen) {
        content.classList.remove("open");   /* If it isOpen is true, CSS hides the content */
        button.setAttribute("aria-expanded", "false");  /* Update the aria attribute */
    }
    else {
        content.classList.add("open");  /* If isOpen is false, CSS shows the content */
        button.setAttribute("aria-expanded", "true");   /* Update the aria attribute */
    }

    saveOpenItems();
}

function restoreOpenItems() {
    const saved = sessionStorage.getItem("timeline-open");
    if (!saved) return;

    const openIndexes = JSON.parse(saved);
    const items = document.querySelectorAll("#timeline li");

    openIndexes.forEach(index => {
        const item = items[index];
        if (!item) return;

        const button = item.querySelector(".toggle");
        const content = item.querySelector(".content");

        content.classList.add("open");
        button.setAttribute("aria-expanded", "true");
    });
}

restoreOpenItems();

timeline.addEventListener("click", expandTimeline); /* Adding event listener that calls expandTimeline when click occurs anywhere inside the timeline container */