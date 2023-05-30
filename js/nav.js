const collapsibles = document.querySelectorAll(".collapsible");
collapsibles.forEach((item) =>
  item.addEventListener("click", function () {
    this.classList.toggle("collapsible--expanded");
  })
);

const accountIcon = document.querySelector(".account-icon");
const dropdownContent = document.querySelector(".nav__dropdown-content");

accountIcon.addEventListener("click", function () {
  dropdownContent.classList.toggle("show");
});

document.addEventListener("DOMContentLoaded", function () {
  // Check if a session token exists
  const sessionToken = localStorage.getItem("sessionToken");
  const userEmail = localStorage.getItem("userEmail");
  const userName = localStorage.getItem("userName");

  // Get the elements
  const userEmailElement = document.getElementById("userEmail");
  const logOutInBtn = document.getElementById("logOutInBtn");

  if (sessionToken) {
    // Set the user email in the span
    userEmailElement.textContent =
      "Weclome back: " + userName + "\n" + userEmail;

    // Change the button text to "Log Out"
    logOutInBtn.textContent = "Log Out";
  } else {
    // Clear the user email span
    userEmailElement.textContent = "";

    // Change the button text to "Log In"
    logOutInBtn.textContent = "Log In";
  }

  // Add click event listener to the Log Out/Log In button
  logOutInBtn.addEventListener("click", function (event) {
    event.preventDefault();

    if (sessionToken) {
      // Clear the session token and user email
      localStorage.removeItem("sessionToken");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userName");

      // Redirect to login.html
      window.location.href = "../pages/login.html";
    } else {
      // Redirect to login.html
      window.location.href = "../pages/login.html";
    }
  });
});
