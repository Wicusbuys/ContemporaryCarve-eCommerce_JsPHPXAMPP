//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Event listeners
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
// Event listener for shop page load
///////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  const cartData = localStorage.getItem("cart");
  if (cartData) {
    loadCartContents();
    setTimeout(function () {
      // Code to be executed after the delay to ensure total updates
      addCheckoutBox();
    }, 500);
  } else {
    loadMessage();
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
//Function to load cart contents
///////////////////////////////////////////////////////////////////////////
function loadCartContents() {
  const cartData = localStorage.getItem("cart");

  if (cartData) {
    var total = 0;
    const cartContent = document.getElementById("cartContents");
    cartContent.innerHTML = "";

    const cartItems = JSON.parse(cartData);
    const promises = [];

    for (const id of cartItems) {
      const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `../php/getCartProducts.php?id=${id}`, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
          if (xhr.status === 200) {
            const product = JSON.parse(xhr.responseText);
            total = total + parseFloat(product[0].product_Price);

            const cartProduct = document.createElement("div");
            cartProduct.classList.add("cartProduct");
            cartProduct.dataset.productId = product[0].product_ID;

            const image = document.createElement("img");
            image.classList.add("cartProduct__image");
            image.src = product[0].product_Img;
            image.alt = "";

            const body = document.createElement("div");
            body.classList.add("cartProduct__body");

            const productNameRow = createProductDataRow(
              "Product:",
              product[0].product_Name
            );
            const productPriceRow = createProductDataRow(
              "Price:",
              "R" + product[0].product_Price
            );

            const removeButton = document.createElement("button");
            removeButton.classList.add("btn", "cartProduct__btn", "removeBtn");
            removeButton.textContent = "Remove Item";

            body.appendChild(productNameRow);
            body.appendChild(productPriceRow);
            body.appendChild(removeButton);

            cartProduct.appendChild(image);
            cartProduct.appendChild(body);

            cartContent.appendChild(cartProduct);

            enableRemoveFromCart(removeButton);

            resolve(); // Resolve the promise when the AJAX request is successful
          } else {
            reject(xhr.statusText); // Reject the promise if there's an error
          }
        };

        xhr.onerror = function () {
          reject(xhr.statusText); // Reject the promise if there's an error
        };

        xhr.send();
      });

      promises.push(promise);
    }

    // Wait for all promises to resolve
    Promise.all(promises)
      .then(() => {
        localStorage.setItem("CartTotal", total);
      })
      .catch((error) => {
        console.error("Error loading cart contents:", error);
      });
  }
}

//*************************************************************************
//Function to load cart labels (product name and price)
//*************************************************************************

function createProductDataRow(label, value) {
  const row = document.createElement("div");
  row.classList.add("cartProduct__row");

  const labelElement = document.createElement("p");
  labelElement.classList.add("cartProduct__label");
  labelElement.textContent = label;

  const valueElement = document.createElement("p");
  valueElement.classList.add("cartProduct__value");
  valueElement.textContent = value;

  row.appendChild(labelElement);
  row.appendChild(valueElement);

  return row;
}

///////////////////////////////////////////////////////////////////////////
//Function to enable remove from cart functionality
///////////////////////////////////////////////////////////////////////////

function enableRemoveFromCart(removeButton) {
  removeButton.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent event bubbling

    const productItem = removeButton.closest(".cartProduct"); // Find the parent product item
    const productId = productItem.dataset.productId; // Retrieve the product ID from the data attribute

    // Remove only one occurrence of the product ID from the cart
    removeCartItem(productId);
  });
}

//*************************************************************************
//Function to Remove selected item from cart
//*************************************************************************
function removeCartItem(productId) {
  const cartData = localStorage.getItem("cart");
  let cart = [];

  if (cartData) {
    cart = JSON.parse(cartData);
  }

  const index = cart.findIndex((id) => id === productId);

  if (index !== -1) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  if (cart.length === 0) {
    clearCart();
  } else {
    const promises = [];

    for (const id of cart) {
      const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `../php/getCartProducts.php?id=${id}`, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
          if (xhr.status === 200) {
            const product = JSON.parse(xhr.responseText);
            resolve(parseFloat(product[0].product_Price));
          } else {
            reject(xhr.statusText);
          }
        };

        xhr.onerror = function () {
          reject(xhr.statusText);
        };

        xhr.send();
      });

      promises.push(promise);
    }

    Promise.all(promises)
      .then((prices) => {
        const total = prices.reduce((acc, curr) => acc + curr, 0);
        localStorage.setItem("CartTotal", total);

        // Reload the cart to show the updated contents and total
        window.location.href = "../pages/cart.html";
      })
      .catch((error) => {
        console.error("Error updating cart total:", error);
      });
  }
}

///////////////////////////////////////////////////////////////////////////
//Function to add checkoutbox
///////////////////////////////////////////////////////////////////////////
function addCheckoutBox() {
  const cartContent = document.querySelector(".cart__container");

  const total = localStorage.getItem("CartTotal");

  const checkout = document.createElement("div");
  checkout.classList.add("checkout");
  checkout.innerHTML = `
  
      <div class="checkout__row">
      <p class="checkout__label">Total:</p>
      <p class="checkout__value">R${total}</p>
    </div>
    <div class="checkout__row">
      <button class="btn checkout__btn" id="checkout--remove">
        Remove All
      </button>
      <button class="btn checkout__btn" id="checkout--checkout">Checkout</button>
    </div>
    <div class="checkout__row">
      <button class="btn checkout__btn--back" id="checkout--continue">Continue Shopping</button>
    </div>
    
          `;
  cartContent.appendChild(checkout);
  enableContinueShoppingBtn();
  enableRemoveAllBtn();
  enableCheckoutBtn();
}

//*************************************************************************
// Function to enable remove all items button on checkoutBox
//*************************************************************************

function enableRemoveAllBtn() {
  const removeAllCartButton = document.getElementById("checkout--remove");
  if (removeAllCartButton) {
    removeAllCartButton.addEventListener("click", function () {
      clearCart();
    });
  }
}

//*************************************************************************
// Function to enable Continue shopping button on checkoutBox
//*************************************************************************

function enableContinueShoppingBtn() {
  const checkoutBackButton = document.getElementById("checkout--continue");
  if (checkoutBackButton) {
    checkoutBackButton.addEventListener("click", function () {
      window.location.href = "../pages/shop.html";
    });
  }
}

//*************************************************************************
// Function to enable Continue shopping button on checkoutBox
//*************************************************************************

function enableCheckoutBtn() {
  const checkoutBtn = document.getElementById("checkout--checkout");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function () {
      window.location.href = "../pages/index.html";
    });
  }
}

///////////////////////////////////////////////////////////////////////////
//Function to clear the entire cart array
///////////////////////////////////////////////////////////////////////////

function clearCart() {
  localStorage.removeItem("cart");
  localStorage.removeItem("CartTotal");
  console.log("Cart cleared");
  window.location.href = "../pages/cart.html";
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

///////////////////////////////////////////////////////////////////////////
//Function to load message if cart is empty
///////////////////////////////////////////////////////////////////////////
function loadMessage() {
  event.preventDefault();

  //clear cart container
  var cart = document.getElementById("cart");
  cart.innerHTML = "";

  const cartContainer = document.createElement("div");
  cartContainer.classList.add("cart__container");

  cartContainer.innerHTML = `

  <h3 class="cart__header">Shopping Cart:</h3>
    <div class="cart__contents">
      <div class="cart__message">
        <p class="message__body">Your cart is currently empty.</p>
      </div>
    </div>
  <button class="btn cart__btn">BACK TO SHOP</button>

      `;
  cart.appendChild(cartContainer);
  enableBackButton();
}
//*************************************************************************
//Function to enable back button functionality when loadMessage was run
//*************************************************************************
function enableBackButton() {
  const backButton = document.querySelector(".cart__btn");
  if (backButton) {
    backButton.addEventListener("click", function () {
      window.location.href = "../pages/shop.html";
    });
  }
}
