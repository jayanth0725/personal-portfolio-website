const button = document.getElementById("theme-toggle");
const root = document.documentElement; 

function updateButtonText() {
    if(root.dataset.theme === "dark"){
        button.textContent = "☀️";
        button.setAttribute("aria-label", "Switch to light mode");
    }
    else{
        button.textContent = "🌙";
        button.setAttribute("aria-label", "Switch to dark mode");
    }
}

function updateAria() {
    let isDark;
    if(root.dataset.theme === "dark"){
        isDark = true;
    }
    else{
        isDark=false;
    }
    button.setAttribute("aria-pressed", isDark); 
}

function toggleTheme() {
    let newTheme;
    if(root.dataset.theme === "dark"){
        newTheme = "light";
    }
    else{
        newTheme = "dark";
    }
    root.dataset.theme = newTheme;  
    localStorage.setItem("theme", newTheme);
    updateButtonText();
    updateAria();
}

updateButtonText(); //Calls these functions only once when the page loads
updateAria();

button.addEventListener("click", toggleTheme); //Calls the function when button is clicked

