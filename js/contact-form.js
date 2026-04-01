const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const formSuccess = document.getElementById("form-success"); /* Gets all the relevant HTML form elements */

function clearErrors() {
    const errors = document.querySelectorAll(".error-message"); /* Gets all the error message elements */
    errors.forEach(error => error.textContent = ""); /* Removing old errors */

    const inputs = document.querySelectorAll("input, textarea");    /* Gets all the input field elements */
    inputs.forEach(input => {
        input.classList.remove("error", "success"); /* Removes the error and success classes from the input fields */
        input.removeAttribute("aria-invalid"); /* Updates the aria invalid attribute */
    });
}

function showError(input, message) {
    const formGroup = input.parentElement;  /* Gets the parent div container of the specific input field */
    const error = formGroup.querySelector(".error-message");    /* Finds the <small> element with the 'error-message' class inside this specific container */

    error.textContent = message;    /* Sets the text content of it to message */
    input.classList.add("error");   
    input.classList.remove("success");  /* Adds the error class and removes the success class*/
    input.setAttribute("aria-invalid", "true"); /* Sets the aria invalid attribute to true */
}

function showSuccess(input) {
    const formGroup = input.parentElement;  /* Gets the parent div container of the specific input field */
    const error = formGroup.querySelector(".error-message");    /* Finds the <small> element with the 'error-message' class inside this specific container */

    error.textContent = ""; /* Sets the text content of it to empty (success) */
    input.classList.remove("error");
    input.classList.add("success"); /* Removes the error class and adds success class */
    input.setAttribute("aria-invalid", "false");    /* Sets the aria invalid attribute to false */
}

function isValidName(name) {
    return /^[a-zA-Z\s\-']{2,}$/.test(name);    /* Regex expression that allows uppercase/lowercase letters, spaces, hyphens, and apostrophes. The {2,} ensures the name is at least 2 characters long. */
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);    /* Regex expression that checks if the email text content has atleast 1 character (non whitespace & non @ character) followed by @ followed by at least 1 (non whitespace & non @ character) character then a '.' then atleast 1 character (non whitespace & non @ character) */
}

function validateForm() {
    let isValid = true;

    const nameVal = nameInput.value.trim(); /* trim() removes leading and trailing whitespaces */
    const emailVal = emailInput.value.trim();
    const messageVal = messageInput.value.trim(); /* Gets the trimmed values of all three input fields */

    if(nameVal === "") {
        showError(nameInput, "Name is required");   /* If the name input field is empty, sets the empty error message */
        isValid = false;
    }
    else if(!isValidName(nameVal)) {
        showError(nameInput, "Please enter a valid name (letters only, min 2 chars)"); /* If the name fails isValidName, sets the invalid name message */
        isValid = false;
    }
    else{
        showSuccess(nameInput); /* Else shows success */
    }

    if(emailVal === "") {
        showError(emailInput, "Email is required"); /* If the email input field is empty, sets the empty error message */
        isValid = false;
    }
    else if(!isValidEmail(emailVal)) {
        showError(emailInput, "Enter a vaild email");   /* If the email input field is invalid, sets the invalid error message */
        isValid = false;
    }
    else {
        showSuccess(emailInput);    /* Else shows success */
    }

    if(messageVal === "") {
        showError(messageInput, "Message cannot be empty"); /* If the message input field is empty, sets the empty error message */
        isValid = false;
    }
    else if(messageVal.length < 10) {
        showError(messageInput, "Please write at least 10 characters"); /* If message input is less than 10 character, sets the message length requirement error message */
        isValid = false;
    }
    else {
        showSuccess(messageInput);  /* Else shows success */
    }

    return isValid;
}

window.addEventListener("DOMContentLoaded", () => { /* Runs immediately after HTML content is loaded */
    
    let savedName = sessionStorage.getItem("contactName");
    let savedEmail = sessionStorage.getItem("contactEmail");
    let savedMessage = sessionStorage.getItem("contactMessage");    /* Gets the stored text from sessionStorage */

    if (savedName) { 
        nameInput.value = savedName;    /* If name has been saved, update the value */
    } else {
        nameInput.value = "";   /* Else set it to empty string */
    }

    if (savedEmail) {
        emailInput.value = savedEmail;  /* If email has been saved, update the value */
    } else {
        emailInput.value = "";  /* Else set it to empty string */
    }

    if (savedMessage) {
        messageInput.value = savedMessage;  /* If message has been saved, update the value */
    } else {
        messageInput.value = "";    /* Else set it to empty string */
    }
});

nameInput.addEventListener("input", () => {
    sessionStorage.setItem("contactName", nameInput.value); /* Updates sessionStorage with current name input value */
});

emailInput.addEventListener("input", () => {
    sessionStorage.setItem("contactEmail", emailInput.value);   /* Updates sessionStorage with current email input value */
});

messageInput.addEventListener("input", () => {
    sessionStorage.setItem("contactMessage", messageInput.value);   /* Updates sessionStorage with current message input value */
});

form.addEventListener("submit", function(e) {
    e.preventDefault(); /* Reroutes the form handling to my logic */
    clearErrors();  /* Clears old errors so they don't appear in the input fields */

    if(validateForm()) {
        formSuccess.classList.remove("form-hidden");    /* Removes the hidden class and adds show class so that confirmation message appears */
        formSuccess.classList.add("form-success-show");

        setTimeout(() => {
            form.classList.add("form-hidden");  /* Gives time for button animation to occur and success borders to appear around the input fields */
        }, 200);

        setTimeout(() => {
            form.style.display = "none";    /* Makes the field to not be rendered by HTML, effectively disappears */
            form.reset();   /* Resets the input fields */

            sessionStorage.removeItem("contactName");   
            sessionStorage.removeItem("contactEmail");
            sessionStorage.removeItem("contactMessage");    /* Clears the sessionStorage of the three input fields now that form is submitted */

            formSuccess.setAttribute("tabindex", "-1");
            formSuccess.focus();
        }, 500);    /* Timeout makes the confirmation appear smoothly */
    }
});
