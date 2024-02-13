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

const currentUser = getLocalstorage("curr_user");
window.addEventListener("load", function (e) {
  e.preventDefault();
  if (!currentUser) {
    alert("You must login to see the cart items.");
    location.href = `${location.origin}/pages/login.html`;
  }
});

let cart = getLocalstorage("cart") || {};
const { email, name } = currentUser;

function renderPage() {
  cartCardContainer.innerHTML = "";
  renderFooter(cart[email]);

  cart[email].forEach(({ count, product: { id, image, title, price } }) => {
    const card = createCard(id, image, title, price, title, count, false);
    // cartCardContainer.insertAdjacentHTML("beforeend", card);
    cartCardContainer.appendChild(card);
  });
}

clickEventListener(email, "", cart, page.CART);
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

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

// let cart = getLocalstorage("cart") || [];

// displayNoItem(cartCardContainer, false);

// function renderPage() {
//   cartCardContainer.innerHTML = "";
//   renderFooter(cart);

//   cart.forEach(({ count, product: { id, image, title, price } }, i) => {
//     const card = createCard(id, image, title, price, title, count, false);
//     // cartCardContainer.insertAdjacentHTML("beforeend", card);
//     cartCardContainer.appendChild(card);
//   });
// }

// clickEventListener("", cart, page.CART);
// if (cart.length === 0) {
//   displayNoItem(cartCardContainer, page.CART);
// } else {
//   renderPage();
//   document
//     .querySelector(".btn-clear-cart")
//     .addEventListener("click", function () {
//       cart = [];
//       setLocalStorage("cart", cart);
//       renderFooter(cart);
//       displayNoItem(cartCardContainer, page.CART);
//     });
// }
