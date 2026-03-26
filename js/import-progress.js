import { saveScrollProgress, getSavedProgress,
    updateProgressBar } from "./export-progress.js"; /* Importing the function from export-progess.js */

const saved = getSavedProgress(); /* Gets the saved scroll value */

window.addEventListener("scroll", () => {
    saveScrollProgress();
    updateProgressBar();
});

function scrollToSavedPosition() {
    const saved = getSavedProgress();
    if(saved === null) return; /* Safety check, if saved is null it returns */
    window.scrollTo({
        top: parseInt(saved), /* Scrolls to the saved position after parseInt converts the string to integer */
        behavior: "smooth" /* Makes the transition smooth */
    });
}

if(saved !== null) {
    const prompt = document.getElementById("resume-prompt");
    prompt.hidden = false;

    const btn = document.getElementById("resume-btn");
    btn.onclick = scrollToSavedPosition;
}