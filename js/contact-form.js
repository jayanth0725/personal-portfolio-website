const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const formSuccess = document.getElementById("form-success");

function showError(input, message) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector(".error");

    error.textContent = message;
    input.classList.add("error");
    input.classList.remove("success");
    input.setAttribute("aria-invalid", "true");
}

function showSuccess(input) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector(".error");

    error.textContent = "";
    input.classList.remove("error");
    input.classList.add("success");
    input.setAttribute("aria-invalid", "false");
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm() {
    let isValid = true;

    if(nameInput.value.trim() === "") {
        showError(nameInput, "Name is required");
        isValid = false;
    }
    else{
        showSuccess(nameInput);
    }

    if(emailInput.value.trim() === "") {
        showError(emailInput, "Email is required");
        isValid = false;
    }
    else if(!isValidEmail(emailInput.value)) {
        showError(emailInput, "Enter a vaild email");
        isValid = false;
    }
    else {
        showSuccess(emailInput);
    }

    if(messageInput.value.trim() === "") {
        showError(messageInput, "Message cannot be empty");
        isValid = false;
    }
    else {
        showSuccess(messageInput);
    }

    return isValid;
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    if(validateForm()) {
        form.classList.add("form-hidden");
        formSuccess.classList.remove("form-hidden");
        form.reset();
        formSuccess.setAttribute("tabindex", "-1");
        formSuccess.focus();
    }
});
