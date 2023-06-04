const shopBySpaceBtn = document.querySelector(".hero__btn");
if (shopBySpaceBtn) {
  shopBySpaceBtn.addEventListener("click", function () {
    const targetSection = document.querySelector(".space--Section");
    targetSection.scrollIntoView({ behavior: "smooth" });
  });
}

function loadShopPage(spaceId) {
  const url = "../pages/shop.html?id=" + encodeURIComponent(spaceId);
  window.location.href = url;
}
