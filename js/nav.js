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
