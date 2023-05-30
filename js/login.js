// Get the login and signup form elements
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

// Get the login and signup tab elements
const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");

//get the login and signup button elements
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");

// Show the login form and activate the login tab by default
loginForm.style.display = "flex";
loginTab.classList.add("active");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function to switch to the login form
function showLoginForm() {
  loginForm.style.display = "flex";
  signupForm.style.display = "none";

  loginTab.classList.add("active");
  signupTab.classList.remove("active");
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function to switch to the signup form
function showSignupForm() {
  signupForm.style.display = "flex";
  loginForm.style.display = "none";

  signupTab.classList.add("active");
  loginTab.classList.remove("active");
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function to handle form submission of login
function login(event) {
  event.preventDefault();

  // Get the user input from the form
  const emailInput = document.getElementById("user_email");
  const passwordInput = document.getElementById("user_password");
  const email = emailInput.value;
  const password = passwordInput.value;

  // Create an object with the user credentials
  const userCredentials = {
    user_email: email,
    user_password: password,
  };

  // Send a POST request to the validateLogin.php script with the user credentials
  fetch("../php/validateLogin.php", {
    method: "POST",
    body: JSON.stringify(userCredentials),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .then((data) => {
      if (data.success) {
        // Generate a session token
        const token = generateSessionToken();

        // Store the user information and session token in localStorage or cookies
        localStorage.setItem("userEmail", email);
        localStorage.setItem("sessionToken", token);
        localStorage.setItem("userName", data.userName); // Store the userName

        // Redirect to index.html upon successful login
        window.location.href = "../pages/index.html";
      } else {
        // Show an alert for incorrect login credentials
        alert(data.message);

        // Clear the input fields
        emailInput.value = "";
        passwordInput.value = "";
      }
    })
    .catch((error) => {
      alert("An error occurred during login. Please try again later.");
    });
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function signup() {
  event.preventDefault();

  // Get the user input from the form
  const emailInput = document.getElementById("signup_email");
  const passwordInput = document.getElementById("signup_password");
  const confirmPasswordInput = document.getElementById("confirm_password");
  const email = emailInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  // Check if passwords match
  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  // Create an object with the user credentials
  const userCredentials = {
    user_email: email,
    user_password: password,
  };

  // Send a POST request to the validateSignup.php script with the user credentials
  fetch("../php/validateSignup.php", {
    method: "POST",
    body: JSON.stringify(userCredentials),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .then((data) => {
      if (data.success) {
        // Show a success message
        alert("Signup successful. Please login to proceed.");

        // Clear the input fields
        emailInput.value = "";
        passwordInput.value = "";
        confirmPasswordInput.value = "";

        // Switch to the login form
        showLoginForm();
      } else {
        // Show an alert for existing email
        alert(data.message);
      }
    })
    .catch((error) => {
      alert("An error occurred during signup. Please try again later.");
    });
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function to generate a session token
function generateSessionToken() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < 32; i++) {
    const index = Math.floor(Math.random() * characters.length);
    token += characters.charAt(index);
  }
  return token;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Add event listeners to the tab buttons
loginTab.addEventListener("click", showLoginForm);
signupTab.addEventListener("click", showSignupForm);
loginBtn.addEventListener("click", login);
signupBtn.addEventListener("click", signup);
