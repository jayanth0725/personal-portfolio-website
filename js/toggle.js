const button = document.getElementById("theme-toggle"); /* Gets the toggle button */
const root = document.documentElement;  /* Gets the root <html> element */

function updateButtonText() {
    if(root.dataset.theme === "dark"){
        button.textContent = "☀️";  /* If the current theme is dark, sets the button's text to light mode change */
        button.setAttribute("aria-label", "Switch to light mode");  /* Updates aria-label to say if you press the button now, it will set theme to light mode */
    }
    else{
        button.textContent = "🌙";  /* If the current theme is light, sets the button's text to dark mode change */
        button.setAttribute("aria-label", "Switch to dark mode");   /* Updates aria-label to say if you press the button now, it will set theme to dark mode */
    }
}

function updateAria() {
    let isDark;
    if(root.dataset.theme === "dark"){  
        isDark = true;
    }
    else{
        isDark=false;   /* If the theme is dark, sets isDark to true else false */
    }
    button.setAttribute("aria-pressed", isDark);    /* Updates the aria-pressed attribute of the button to isDark. Since default light them is light, if isDark is true the button has been pressed */
}

function toggleTheme() {
    let newTheme;
    if(root.dataset.theme === "dark"){
        newTheme = "light"; /* Sets the newTheme variable to light if current theme is dark */
    }
    else{
        newTheme = "dark";  /* Sets the newTheme variable to dark if current theme is light */
    }
    root.dataset.theme = newTheme;  /* Sets the theme to newTheme */
    localStorage.setItem("theme", newTheme);    /* Updates the localStorage to newTheme */
    updateButtonText(); /* Calls function to update button text */
    updateAria();   /* Calls function tio update aria-pressed attribute of the button */
}

updateButtonText(); //Calls these functions only once when the page loads
updateAria();

button.addEventListener("click", toggleTheme); //Calls the function when button is clicked

