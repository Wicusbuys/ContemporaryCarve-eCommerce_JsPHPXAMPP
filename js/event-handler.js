// Function to load products by genre
function loadProductsByGenre(genre, event) {
  event.preventDefault();

  // Clear the existing grid items
  var gridContainer = document.getElementById("shopGrid");
  gridContainer.innerHTML = "";

  // Generate the grid items based on fetched data
  fetch("../php/getProductsByGenre.php?genre=" + genre, {
    method: "POST",
    body: JSON.stringify({ genre: genre }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const gridContainer = document.getElementById("shopGrid");

      data.forEach((item) => {
        const gridItem = document.createElement("div");
        gridItem.classList.add("tile");

        // Generate the grid item content based on the fetched data
        const productImage = item.product_Img;
        const productName = item.product_Name;
        const productPrice = item.product_Price;

        gridItem.innerHTML = `
        <img class="tile__image" src="${productImage}" alt=""/>
        <div class="tile__info">
          <header class="tile__header">${productName}</header>
          <div class="tile__price">${productPrice}</div>
        </div>
        <div class="tile__icon">
          <svg class="icon">
            <use xlink:href="../images/sprite.svg#shoppingCart"></use>
          </svg>
        </div>
      `;

        gridContainer.appendChild(gridItem);
      });
    })
    .catch((error) => console.error(error));
}

// Function to load all products
function loadAllProducts() {
  event.preventDefault();

  // Clear the existing grid items
  var gridContainer = document.getElementById("shopGrid");
  gridContainer.innerHTML = "";

  // Fetch all products
  fetch("../php/getAllProducts.php")
    .then((response) => response.json())
    .then((data) => {
      const gridContainer = document.getElementById("shopGrid");

      data.forEach((item) => {
        const gridItem = document.createElement("div");
        gridItem.classList.add("tile");

        // Generate the grid item content based on the fetched data
        const productImage = item.product_Img;
        const productName = item.product_Name;
        const productPrice = item.product_Price;

        gridItem.innerHTML = `
          <img class="tile__image" src="${productImage}" alt=""/>
          <div class="tile__info">
            <header class="tile__header">${productName}</header>
            <div class="tile__price">${productPrice}</div>
          </div>
          <div class="tile__icon">
            <svg class="icon">
              <use xlink:href="../images/sprite.svg#shoppingCart"></use>
            </svg>
          </div>
        `;

        gridContainer.appendChild(gridItem);
      });
    })
    .catch((error) => console.error(error));
}

// Load all products on page load
document.addEventListener("DOMContentLoaded", function () {
  loadAllProducts();
});

// Get Dining Products
document
  .getElementById("loadDiningProducts")
  .addEventListener("click", function (event) {
    loadProductsByGenre("Dining", event);
  });

// Get Living Products
document
  .getElementById("loadLivingProducts")
  .addEventListener("click", function (event) {
    loadProductsByGenre("Living", event);
  });

// Get Bedroom Products
document
  .getElementById("loadBedroomProducts")
  .addEventListener("click", function (event) {
    loadProductsByGenre("Bedroom", event);
  });

// Get Outdoor Products
document
  .getElementById("loadOutdoorProducts")
  .addEventListener("click", function (event) {
    loadProductsByGenre("Outdoor", event);
  });

//Get All Products
document
  .getElementById("loadAllProducts")
  .addEventListener("click", function () {
    loadAllProducts();
  });
