import {
  getLocalstorage,
  displayNoItem,
  clickEventListener,
  page,
  renderFooter,
  setLocalStorage,
  keys,
} from "./components/helper.mjs";
import createCard from "./components/createCard.mjs";

const cartCardContainer = document.querySelector(".cart-card-container");
const btnLogout = document.querySelector(".btn-logout");

const currentUser = getLocalstorage("curr_user");
window.addEventListener("load", function (e) {
  e.preventDefault();
  if (!currentUser) {
    alert("You must login to see the cart items.");
    location.href = `${location.origin}/pages/login.html`;
  }
});

let cart = getLocalstorage("cart") || {};
const { email } = currentUser;
if (!cart[email]) cart[email] = [];

function renderPage() {
  cartCardContainer.innerHTML = "";
  renderFooter(cart[email]);

  cart[email].forEach(({ count, product: { id, image, title, price } }) => {
    const card = createCard(id, image, title, price, title, count);
    cartCardContainer.appendChild(card);
  });
}

clickEventListener(email, "", cart, page.CART, btnLogout);
if (cart[email].length === 0) {
  displayNoItem(cartCardContainer, page.CART);
} else {
  renderPage();
  document
    .querySelector(".btn-clear-cart")
    .addEventListener("click", function () {
      cart[email] = [];
      setLocalStorage("cart", cart);
      renderFooter(cart[email]);
      displayNoItem(cartCardContainer, page.CART);
    });
}
