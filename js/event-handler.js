////////////////////////////////////////////////////////////////////
// Get Dining Products
////////////////////////////////////////////////////////////////////

document
  .getElementById("loadDiningProducts")
  .addEventListener("click", function (event) {
    event.preventDefault();

    // Clear the existing grid items
    var gridContainer = document.getElementById("shopGrid");
    gridContainer.innerHTML = "";

    // Generate the grid items based on fetched data
    fetch("../php/getDiningProducts.php")
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
  });

////////////////////////////////////////////////////////////////////
// Get Living Products
////////////////////////////////////////////////////////////////////

document
  .getElementById("loadLivingProducts")
  .addEventListener("click", function (event) {
    event.preventDefault();

    // Clear the existing grid items
    var gridContainer = document.getElementById("shopGrid");
    gridContainer.innerHTML = "";

    // Generate the grid items based on fetched data
    fetch("../php/getLivingProducts.php")
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
  });

////////////////////////////////////////////////////////////////////
// Get Bedroom Products
////////////////////////////////////////////////////////////////////

document
  .getElementById("loadBedroomProducts")
  .addEventListener("click", function (event) {
    event.preventDefault();

    // Clear the existing grid items
    var gridContainer = document.getElementById("shopGrid");
    gridContainer.innerHTML = "";

    // Generate the grid items based on fetched data
    fetch("../php/getBedroomProducts.php")
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
  });

////////////////////////////////////////////////////////////////////
// Get Outdoor Products
////////////////////////////////////////////////////////////////////

document
  .getElementById("loadOutdoorProducts")
  .addEventListener("click", function (event) {
    event.preventDefault();

    // Clear the existing grid items
    var gridContainer = document.getElementById("shopGrid");
    gridContainer.innerHTML = "";

    // Generate the grid items based on fetched data
    fetch("../php/getOutdoorProducts.php")
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
  });
