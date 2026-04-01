import { saveScrollProgress, getSavedProgress,
    updateProgressBar } from "./export-progress.js"; /* Importing the function from export-progess.js */

const saved = getSavedProgress(); /* Gets the saved scroll value */

window.addEventListener("scroll", () => {   /* Each time the user scrolls, these functions are called */
    saveScrollProgress();
    updateProgressBar();
});

function scrollToSavedPosition() {
    if(saved === null) return; /* Safety check, if saved is null it returns */

    document.getElementById("resume-prompt").hidden = true; /* Hides the prompt after clicking 'Yes' */
    
    window.scrollTo({
        top: parseInt(saved), /* Scrolls to the saved position after parseInt converts the string to integer */
        behavior: "smooth" /* Makes the transition smooth */
    });
}

if(saved !== null) {
    const prompt = document.getElementById("resume-prompt");    /* Gets the resume prompt */
    prompt.hidden = false;  /* Makes the resume prompt visible if saved has a value */

    const btn = document.getElementById("resume-btn");  /* Gets the resume button */
    btn.onclick = scrollToSavedPosition;    /* Calls the function to go to saved location */

    setTimeout(() => {
        prompt.hidden=true;  /* If user does not click the resume button within 10 seconds, hide the prompt again */
    }, 10000);
}

