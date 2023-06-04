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
    addCheckoutBox();
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
    const cartContent = document.getElementById("cartContents");
    cartContent.innerHTML = "";

    // Make an AJAX request for each product in the cart
    const cartItems = JSON.parse(cartData);
    for (const id of cartItems) {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", `../php/getCartProducts.php?id=${id}`, true);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onload = function () {
        if (xhr.status === 200) {
          const product = JSON.parse(xhr.responseText);

          // Generate HTML for the cart item
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
            product[0].product_Price
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

          enableRemoveFromCart(removeButton); // Pass the remove button to the enableRemoveFromCart function
        }
        // enableRemoveFromCart();
      };
      xhr.send();
    }
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
  // Retrieve the existing cart data from local storage
  const cartData = localStorage.getItem("cart");
  let cart = [];

  // If cart data exists, parse it from JSON and assign it to the cart variable
  if (cartData) {
    cart = JSON.parse(cartData);
  }

  // Find the index of the product ID in the cart
  const index = cart.findIndex((id) => id === productId);
  console.log(index);

  // Remove the first occurrence of the product ID from the cart
  if (index !== -1) {
    cart.splice(index, 1);
  }

  // Store the updated cart data in local storage
  localStorage.setItem("cart", JSON.stringify(cart));

  if (cart.length === 0) {
    clearCart();
  }

  // Reload the cart to show the updated contents
  window.location.href = "../pages/cart.html";
}

///////////////////////////////////////////////////////////////////////////
//Function to add checkoutbox
///////////////////////////////////////////////////////////////////////////
function addCheckoutBox() {
  const cartContent = document.querySelector(".cart__container");

  const checkout = document.createElement("div");
  checkout.classList.add("checkout");
  checkout.innerHTML = `
  
      <div class="checkout__row">
      <p class="checkout__label">Total:</p>
      <p class="checkout__value">R231212,38</p>
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
