const savedTheme = localStorage.getItem("theme");   /* Gets the saved theme from localStorage */

if(savedTheme) {
    document.documentElement.dataset.theme = savedTheme; //If user preference exists, sets theme to it
}
else{
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches; //If no user preference exists, uses system preference instead
    document.documentElement.dataset.theme = prefersDark ? "dark" : "light"; //Sets the theme to prefersDark
}
