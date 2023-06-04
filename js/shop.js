//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Event listeners
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////
// Load all products or best sellers on page load
///////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("index.html")) {
    loadBestProducts();
  } else if (window.location.pathname.includes("shop.html")) {
    loadAllProducts();
  }
});
///////////////////////////////////////////////////////////////////////////
// Add eventlistener to load Dining Products
///////////////////////////////////////////////////////////////////////////
var loadDiningProducts = document.getElementById("loadDiningProducts");
if (loadDiningProducts) {
  loadDiningProducts.addEventListener("click", function (event) {
    loadProductsByGenre("Dining", event);
  });
}
///////////////////////////////////////////////////////////////////////////
// Add eventlistener to load Living Products
///////////////////////////////////////////////////////////////////////////
var loadLivingProducts = document.getElementById("loadLivingProducts");
if (loadLivingProducts) {
  loadLivingProducts.addEventListener("click", function (event) {
    loadProductsByGenre("Living", event);
  });
}
///////////////////////////////////////////////////////////////////////////
// Add eventlistener to load Bedroom Products
///////////////////////////////////////////////////////////////////////////
var loadBedroomProducts = document.getElementById("loadBedroomProducts");
if (loadBedroomProducts) {
  loadBedroomProducts.addEventListener("click", function (event) {
    loadProductsByGenre("Bedroom", event);
  });
}
///////////////////////////////////////////////////////////////////////////
// Add eventlistener to load Outdoor Products
///////////////////////////////////////////////////////////////////////////
var loadOutdoorProducts = document.getElementById("loadOutdoorProducts");
if (loadOutdoorProducts) {
  loadOutdoorProducts.addEventListener("click", function (event) {
    loadProductsByGenre("Outdoor", event);
  });
}
///////////////////////////////////////////////////////////////////////////
//Add eventlistener to load All Products
///////////////////////////////////////////////////////////////////////////
var loadAllProductsButton = document.getElementById("loadAllProducts");
if (loadAllProductsButton) {
  loadAllProductsButton.addEventListener("click", function () {
    loadAllProducts();
  });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////
// Function to load 4 items for best seller grid
///////////////////////////////////////////////////////////////////////////
function loadBestProducts() {
  event.preventDefault();

  // Clear the existing grid items
  var gridContainer = document.getElementById("bestsellergrid");
  gridContainer.innerHTML = "";

  fetch("../php/getBestSellers.php")
    .then((response) => response.json())
    .then((data) => {
      const gridContainer = document.getElementById("bestsellergrid");

      data.forEach((item) => {
        const gridItem = document.createElement("div");
        gridItem.classList.add("tile");
        const productID = item.product_ID;
        gridItem.dataset.productId = productID;

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
      enableAddToCart();
    })
    .catch((error) => console.error(error));
}

///////////////////////////////////////////////////////////////////////////
// Function to load all products
///////////////////////////////////////////////////////////////////////////

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
        const productID = item.product_ID;
        gridItem.dataset.productId = productID;

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
      enableAddToCart();
    })
    .catch((error) => console.error(error));
}
///////////////////////////////////////////////////////////////////////////
// Function to load products by genre
///////////////////////////////////////////////////////////////////////////

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
        const productID = item.product_ID;
        gridItem.dataset.productId = productID;

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
      enableAddToCart();
    })
    .catch((error) => console.error(error));
}
///////////////////////////////////////////////////////////////////////////
//Enable add to cart functionality by giving all cart icons event listeners
///////////////////////////////////////////////////////////////////////////

function enableAddToCart() {
  // Select the shopping cart icons within grid items
  const cartIcons = document.querySelectorAll(".tile__icon");
  cartIcons.forEach((cartIcon) => {
    // Add click event listener to each cart icon
    cartIcon.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent event bubbling

      const gridItem = cartIcon.closest(".tile"); // Find the parent grid item
      const productId = gridItem.dataset.productId; // Retrieve the product ID from the data attribute

      // Store the product ID in the cart
      addToCart(productId);
    });
  });
}

///////////////////////////////////////////////////////////////////////////
//Function to add the selected item to the cart by storing product id in array
///////////////////////////////////////////////////////////////////////////

function addToCart(productId) {
  // Retrieve the existing cart data from local storage
  const cartData = localStorage.getItem("cart");
  let cart = [];

  // If cart data exists, parse it from JSON and assign it to the cart variable
  if (cartData) {
    cart = JSON.parse(cartData);
  }

  // Add the product ID to the cart
  cart.push(productId);

  // Store the updated cart data in local storage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Optionally, display a success message or update the cart UI
  alert("Item added to cart!");
}

///////////////////////////////////////////////////////////////////////////
//Function to display the cart array values
///////////////////////////////////////////////////////////////////////////

function displayCartData() {
  // Retrieve the cart data from local storage
  const cartData = localStorage.getItem("cart");

  // If cart data exists, log it to the console
  if (cartData) {
    console.log(JSON.parse(cartData));
  } else {
    console.log("Cart is empty.");
  }
}
