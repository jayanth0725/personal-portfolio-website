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
        behavior: "smooth" /* Makes the transition smooth (unless user prefers reduced motion) */
    });
}

setTimeout( () => { /* Gives the browser time to check its scroll postion before it checks if the prompt is required */
    if(saved !== null && parseInt(saved) > 200 && window.scrollY < 100) { /* Checks if saved exists and it is greater than 0 (not the top of the page). The third condition is while the user is in the middle of the page, a reload occurs and the page goes back to top, it should show the prompt but if after reload the page is where it was before, the prompt should not be visible.*/
        const prompt = document.getElementById("resume-prompt");    /* Gets the resume prompt */
        prompt.hidden = false;  /* Makes the resume prompt visible if saved has a value */

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches; /* Check for reduced motion preference in JS */
        const btn = document.getElementById("resume-btn");

        function hidePrompt() {
            prompt.classList.add("fade-out");   /* Adds the class .fade-out so the prompt disappears smoothly */

            let delay;  
            if (prefersReducedMotion) {
                delay = 0;  /* If prefersReducedMotion is true, sets delay to 0 ms */
            } else {
                delay = 500;    /* Else, sets delay to 500 ms */
            }   
            
            setTimeout(() => {
                prompt.hidden = true;   /* Completely hides the prompt. If reduced motion is on, hide immediately. If off, wait 500ms for the transition to finish. */
            }, delay);
        };

        let autoHideTimer = setTimeout(hidePrompt, 10000); /* If user does not click the resume button within 10 seconds, hide the prompt again */

        btn.onclick = () => {
            scrollToSavedPosition();    /* If the user clicks the button, calls the function to scroll to saved position */
            hidePrompt();   /* Calls the function to hide the prompt smoothly */
        };

        window.addEventListener('scroll', () => {   /* Hides the prompt if the user starts scrolling */
            hidePrompt();
            clearTimeout(autoHideTimer); /* Stops the 10 seconds timer if they scroll */
        }, { once: true }); /* Tells the browser to run it only one time */
    }
}, 100);
