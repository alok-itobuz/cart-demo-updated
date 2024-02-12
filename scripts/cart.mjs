import {
  getItemFromLocalStorage,
  displayNoItem,
  clickEventListener,
  page,
  renderFooter,
  updateLocalStorage,
} from "./components/helper.mjs";
import createCard from "./components/createCard.mjs";
const cartCardContainer = document.querySelector(".cart-card-container");

let cart = getItemFromLocalStorage("cart");

displayNoItem(cartCardContainer, false);

function renderPage() {
  cartCardContainer.innerHTML = "";
  renderFooter(cart);

  cart.forEach(({ count, product: { id, image, title, price } }, i) => {
    const card = createCard(id, image, title, price, title, count, false);
    // cartCardContainer.insertAdjacentHTML("beforeend", card);
    cartCardContainer.appendChild(card);
  });
}

clickEventListener("", cart, page.CART);
if (cart.length === 0) {
  displayNoItem(cartCardContainer, page.CART);
} else {
  renderPage();
  document
    .querySelector(".btn-clear-cart")
    .addEventListener("click", function () {
      cart = [];
      updateLocalStorage("cart", cart);
      renderFooter(cart);
      displayNoItem(cartCardContainer, page.CART);
    });
}
