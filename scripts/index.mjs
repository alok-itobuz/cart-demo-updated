import products from "../data/product.mjs";
import createCard from "./components/createCard.mjs";
import {
  getLocalstorage,
  displayNoItem,
  clickEventListener,
  page,
  keys,
} from "./components/helper.mjs";

const textSpanItem = document.querySelector(".cart-item-count");
const homeCardContainer = document.querySelector(".home-card-container");
const btnLogout = document.querySelector(".btn-logout");

const currentUser = getLocalstorage(keys.CURRENT_USER);

window.addEventListener("load", function (e) {
  e.preventDefault();
  if (!currentUser) {
    alert("You must login to see the cart items.");
    location.href = `${location.origin}/pages/login.html`;
  }
  textSpanItem.textContent =
    getLocalstorage("cart")[currentUser.email]?.length || 0;
});

const { name, email } = currentUser;
const cart = getLocalstorage("cart") || {};

if (products.length === 0) {
  displayNoItem(homeCardContainer, page.HOME);
}

products.forEach(({ id, image, title, price }, i) => {
  const card = createCard(
    id,
    image,
    title,
    price,
    title,
    cart[email]?.find((c) => c.product.id === id)?.count ?? 0
  );
  homeCardContainer.appendChild(card);
});

clickEventListener(email, products, cart, page.HOME, btnLogout, textSpanItem);
