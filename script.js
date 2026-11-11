// ==================================
// 1. DARK AND LIGHT MODE
// ==================================

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeToggle.textContent = "☾";
} else {
    themeToggle.textContent = "☀";
}

themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "☾";
    } else {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀";
    }

});


// ==================================
// 2. CONTACT FORM
// ==================================

const contactForm = document.getElementById("contactForm");

const emailInput = document.getElementById("email");

const emailError = document.getElementById("emailError");

const formStatus = document.getElementById("formStatus");


contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();

    const email = emailInput.value.trim();

    const message = document.getElementById("message").value.trim();


    // Email validation

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        emailError.textContent = "Please enter a valid email address.";

        return;

    }

    emailError.textContent = "";


    // Create contact object

    const contact = {

        name: name,

        email: email,

        message: message,

        date: new Date().toLocaleString()

    };


    // Get existing responses

    let responses = JSON.parse(localStorage.getItem("responses")) || [];


    // Add new response

    responses.push(contact);


    // Save responses

    localStorage.setItem("responses", JSON.stringify(responses));


    // Success message

    formStatus.textContent = "Your message has been sent successfully!";

    contactForm.reset();

});


// Clear email error while typing

emailInput.addEventListener("input", function () {

    emailError.textContent = "";

});


// ==================================
// 3. ADMIN LOGIN
// ==================================

const adminLoginForm = document.getElementById("adminLoginForm");

const loginContainer = document.getElementById("loginContainer");

const responseContainer = document.getElementById("responseContainer");

const loginError = document.getElementById("loginError");

const logoutBtn = document.getElementById("logoutBtn");


// Demo credentials

const ADMIN_USERNAME = "admin";

const ADMIN_PASSWORD = "admin123";


adminLoginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const username = document.getElementById("adminUsername").value;

    const password = document.getElementById("adminPassword").value;


    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {

        loginContainer.classList.add("hidden");

        responseContainer.classList.remove("hidden");

        loginError.textContent = "";

        displayResponses();

        adminLoginForm.reset();

    } else {

        loginError.textContent = "Invalid username or password!";

    }

});


// ==================================
// 4. DISPLAY CONTACT RESPONSES
// ==================================

const responsesList = document.getElementById("responsesList");


function displayResponses() {

    responsesList.replaceChildren();

    let responses = JSON.parse(localStorage.getItem("responses")) || [];


    if (responses.length === 0) {

        const emptyMessage = document.createElement("p");

        emptyMessage.textContent = "No messages received yet.";

        responsesList.appendChild(emptyMessage);

        return;

    }


    responses.forEach(function (contact) {

        const card = document.createElement("div");

        card.className = "response-card";


        const heading = document.createElement("h4");

        heading.textContent = contact.name;


        const email = document.createElement("p");

        email.textContent = "Email: " + contact.email;


        const message = document.createElement("p");

        message.textContent = "Message: " + contact.message;


        const date = document.createElement("p");

        date.textContent = "Submitted: " + contact.date;


        card.appendChild(heading);

        card.appendChild(email);

        card.appendChild(message);

        card.appendChild(date);


        responsesList.appendChild(card);

    });

}


// ==================================
// 5. ADMIN LOGOUT
// ==================================

logoutBtn.addEventListener("click", function () {

    responseContainer.classList.add("hidden");

    loginContainer.classList.remove("hidden");

    adminLoginForm.reset();

    loginError.textContent = "";

});


// ==================================
// 6. CONSOLE MESSAGE
// ==================================

console.log("Portfolio website loaded successfully!");