import products from "../data/product.mjs";
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

const wishlistCardContainer = document.querySelector(
  ".wishlist-card-container"
);
const btnLogout = document.querySelector(".btn-logout");

const currentUser = getLocalstorage("curr_user");

window.addEventListener("load", function (e) {
  if (!currentUser) {
    alert("You must login to see the cart items.");
    location.href = `${location.origin}/pages/login.html`;
  }
});

let wishlist = getLocalstorage("wishlist") || {};
let cart = getLocalstorage("cart") || {};
const { email } = currentUser;
if (!cart[email]) cart[email] = [];
if (!wishlist[email]) wishlist[email] = [];

function renderPage() {
  wishlistCardContainer.innerHTML = "";

  wishlist[email].forEach(({ id, image, title, price }) => {
    const card = createCard(
      id,
      image,
      title,
      price,
      title,
      null,
      true,
      true,
      true
    );
    wishlistCardContainer.appendChild(card);
  });
}

clickEventListener(email, products, cart, page.CART, btnLogout, null, wishlist);
if (cart[email].length === 0) {
  displayNoItem(wishlistCardContainer, page.CART);
} else {
  renderPage();
}
