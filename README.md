# Personal Portfolio Website

A responsive and accessible personal portfolio website built without frontend frameworks.

**[View Live Site](https://web.iiit.ac.in/~jayanth.raveendra/)**

## Technical Features

* **Zero-Dependency Architecture:** Built entirely with vanilla HTML, CSS, and JavaScript.
* **Theme Controller:** Fully custom light/dark mode implementation using CSS variables and `localStorage` for session persistence.
* **Performance Optimised:** Utilises the `IntersectionObserver` API to lazy-load animations only when elements enter the viewport, reducing initial rendering block. The elements gracefully fade/slide into view when they first enter the viewport and the user sees them.
* **Accessibility (a11y) First:** *Implements `prefers-reduced-motion` media queries to gracefully degrade animations for accessibility.* Semantic HTML with ARIA attributes and a functional `skip-link` for keyboard navigation.
* **Serverless Form Handling:** Contact form is integrated with Web3Forms via an async/await Fetch API implementation, complete with custom client-side validations.
* **State Management:** Uses `sessionStorage` to track and restore reading progress and accordion states of the timeline across page reloads.

## Tech Stack

* **Structure:** HTML5
* **Styling:** CSS3 (Custom Properties, Grid, Flexbox, Animations)
* **Logic:** ES6 JavaScript (Promises, DOM Manipulation, Web Storage API)