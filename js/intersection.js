const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {  /* Iterating only through the elements that just entered or exited the viewport */
        if(entry.isIntersecting) {
            entry.target.classList.add("show"); /* If an entry is intersecting, then the show class is added making them visible */
            observer.unobserve(entry.target);   /* Tell the observer to stop observing this element since it is shown */
        }
    });
});

document.querySelectorAll(".hidden").forEach(el => {
    observer.observe(el);   /* Observes all the currently hidden elements so that if they can be shown when they hit the intersection */
});