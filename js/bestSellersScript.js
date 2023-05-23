// JavaScript code to fetch data from PHP file and populate the grid
fetch("../php/getBestSellers.php")
  .then((response) => response.json())
  .then((data) => {
    const gridContainer = document.getElementById("bestsellergrid");

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
