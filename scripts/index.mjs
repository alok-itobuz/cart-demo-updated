import products from "../data/product.mjs";
import createCard from "./components/createCard.mjs";
import {
  getItemFromLocalStorage,
  displayNoItem,
  clickEventListener,
  page,
} from "./components/helper.mjs";

const homeCardContainer = document.querySelector(".home-card-container");

console.log(products);

const cart = getItemFromLocalStorage("cart");

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
    cart.find((c) => c.product.id === id)?.count ?? 0,
    true
  );
  // homeCardContainer.insertAdjacentHTML("beforeend", card);
  homeCardContainer.appendChild(card);
});

clickEventListener(products, cart, page.HOME);
