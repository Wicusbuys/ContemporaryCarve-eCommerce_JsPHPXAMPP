// Get the login and signup form elements
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

// Get the login and signup tab elements
const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");

// Show the login form and activate the login tab by default
loginForm.style.display = "flex";
loginTab.classList.add("active");

// Function to switch to the login form
function showLoginForm() {
  loginForm.style.display = "flex";
  signupForm.style.display = "none";

  loginTab.classList.add("active");
  signupTab.classList.remove("active");
}

// Function to switch to the signup form
function showSignupForm() {
  signupForm.style.display = "flex";
  loginForm.style.display = "none";

  signupTab.classList.add("active");
  loginTab.classList.remove("active");
}

// Add event listeners to the tab buttons
loginTab.addEventListener("click", showLoginForm);
signupTab.addEventListener("click", showSignupForm);
