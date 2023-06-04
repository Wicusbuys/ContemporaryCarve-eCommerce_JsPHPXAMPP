//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Event listeners
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////
// Burger menu functionality for mobile view
///////////////////////////////////////////////////////////////////////////
const collapsibles = document.querySelectorAll(".collapsible");
collapsibles.forEach((item) =>
  item.addEventListener("click", function (event) {
    if (!event.target.closest(".nav__icons")) {
      this.classList.toggle("collapsible--expanded");
    }
  })
);
///////////////////////////////////////////////////////////////////////////
// account functionality to toggle account info window
///////////////////////////////////////////////////////////////////////////
const accountIcon = document.querySelector(".account-icon");
const dropdownContent = document.querySelector(".nav__dropdown-content");

accountIcon.addEventListener("click", function () {
  dropdownContent.classList.toggle("show");
});

///////////////////////////////////////////////////////////////////////////
// cart functionality to go to cart page
///////////////////////////////////////////////////////////////////////////
const shopIcon = document.querySelector(".nav__icon.shop-icon");
shopIcon.addEventListener("click", function () {
  const sessionToken = localStorage.getItem("sessionToken");
  if (sessionToken) {
    window.location.href = "../pages/cart.html";
  } else {
    window.location.href = "../pages/login.html";
  }
});

///////////////////////////////////////////////////////////////////////////
// account functionality to show logged in users name, email and log out option in account info window
///////////////////////////////////////////////////////////////////////////

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
    userEmailElement.innerHTML =
      "Welcome back: " +
      "<strong>" +
      userName +
      "</strong>" +
      "<br>" +
      "<strong>" +
      userEmail +
      "</strong>";

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

///////////////////////////////////////////////////////////////////////////
// Newsletter subscibe button if exists
///////////////////////////////////////////////////////////////////////////
const newsletterSubBtn = document.getElementById("newsletterBtn");
if (newsletterSubBtn) {
  newsletterSubBtn.addEventListener("click", function () {
    newsletterSubEntry();
  });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function newsletterSubEntry() {
  const newsletterInput = document.getElementById("newsletterInput");
  const email = newsletterInput.value;
  // Create an object with the user credentials
  const userCredentials = {
    user_email: email,
  };

  // Send a POST request to the addNewSubscriber.php script with the user credentials
  fetch("../php/addNewSubscriber.php", {
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
      // Create and display the custom alert
      const customAlert = document.createElement("div");
      customAlert.classList.add("custom-alert");
      if (data.success) {
        // Show a success message
        customAlert.textContent =
          "Subscription successful. Thank you for joining!";
      } else {
        // Show an alert for existing email
        customAlert.textContent = data.message;
      }
      document.body.appendChild(customAlert);

      const duration = 2000; // Set the duration in milliseconds (e.g., 3000ms = 3 seconds)
      setTimeout(function () {
        customAlert.remove();
      }, duration);
    })
    .catch((error) => {
      alert("An error occurred during subscription. Please try again later.");
    });
}
