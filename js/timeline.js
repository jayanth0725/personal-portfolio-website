const timeline = document.getElementById("timeline"); /* Gets the container of the single event listener */

function saveOpenItems() {
    const items = document.querySelectorAll("#timeline li");    /* Gets all the timeline elements */
    const openIndexes = []; /* Will store their number here */

    items.forEach((item, index) => {    /* Iterating through all the elements and if their content class is open, pushing that element's number into openIndexes */
        const content = item.querySelector(".content");
        if (content.classList.contains("open")) {
            openIndexes.push(index);
        }
    });

    sessionStorage.setItem("timeline-open", JSON.stringify(openIndexes));   /* Updating sessionStorage with the open element's numbers */
}

function expandTimeline(e) {    /* e contains info about what was clicked */
    const button = e.target.closest(".toggle"); /* Checks the clicked element and its ancestors to find the closest one with the class .toggle */
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
    if (!saved) return; /* If there is no saved value, return */

    const openIndexes = JSON.parse(saved);  /* Get the element numbers that are open */
    const items = document.querySelectorAll("#timeline li");

    openIndexes.forEach(index => {  /* Iterating through all the open elements  */
        const item = items[index];
        if (!item) return; /* Stops the loop if there are no open elements */

        const button = item.querySelector(".toggle");   
        const content = item.querySelector(".content");

        content.classList.add("open");  /* Opens the element's content */
        button.setAttribute("aria-expanded", "true");   /* Sets the aria-expanded attribute of that element to true */
    });
}

restoreOpenItems(); /* Restores the timeline elements. It is called only once when the page loads */

timeline.addEventListener("click", expandTimeline); /* Adding event listener that calls expandTimeline when click occurs anywhere inside the timeline container */