export function saveScrollProgress() {  /* Makes the function available to other js files */
    const scrollPosition = window.scrollY; /* How many pixels it has been scrolled down */
    sessionStorage.setItem("about-scroll", scrollPosition); /* Saves in session storage the scroll value corresponding to a string called 'about-scroll */
}

export function getSavedProgress() {
    return sessionStorage.getItem("about-scroll"); /* Retrieves the stored scroll value */
}

export function updateProgressBar() {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;

    const bar = document.getElementById("progress-bar");
    if (bar) {
        bar.style.width = progress + "%";
        bar.setAttribute("aria-valuenow", Math.round(progress));
    }
}

