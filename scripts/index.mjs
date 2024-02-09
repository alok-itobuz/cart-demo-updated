import products from "../data/product.mjs";
import {
  getItemFromLocalStorage,
  displayNoItem,
  createCard,
} from "./components/helper.mjs";

const homeCardContainer = document.querySelector(".home-card-container");

let cart = getItemFromLocalStorage("cart");

if (products.length === 0) {
  displayNoItem(homeCardContainer, true);
}

products.forEach(({ id, image, title, price }, i) => {
  const card = createCard(
    i + 1,
    image,
    title,
    price,
    title,
    // if product is found in the cart, then don't display the add to cart button.
    cart.find((c) => c.product.id === id)?.count ?? 0,
    true
  );
  homeCardContainer.insertAdjacentHTML("beforeend", card);
});

const cards = document.querySelectorAll(".card");
const cardBtns = Array.from(document.querySelectorAll(".card-buttons"));

cards.forEach((_, i) => {
  const btn = document.querySelector(`.add-to-cart-${i + 1}`);
  const [decrease, text, increase] = [...cardBtns[i].children];

  // push the product to the cart array
  let cartProduct = cart.find((c) => c.product.id === i + 1);
  btn.addEventListener("click", function (e) {
    // hide the add to card button and display the +, - buttons
    e.target.classList.add("display-none");
    cardBtns[i].classList.remove("display-none");

    // check if the current item is present in the cart or not
    cartProduct = cart.find((c) => c.product.id === i + 1);

    // if not present, then push this into cart otherwise just increase the count.
    if (!cartProduct) {
      cartProduct = {
        product: products[i],
        count: 1,
      };
      cart.push(cartProduct);
    }
    text.textContent = cartProduct.count;

    // update localstorage as cart is updated
    localStorage.setItem("cart", JSON.stringify(cart));
  });

  // if decrease is clicked, decrease the count of the product. if the count becomes 0, render the "add to cart" button, and hide the [- text +]
  decrease.addEventListener("click", function (e) {
    cartProduct.count--;
    text.textContent = cartProduct.count;
    if (cartProduct.count == 0) {
      btn.classList.remove("display-none");
      cardBtns[i].classList.add("display-none");
      cart = cart.filter((c) => c.product.id !== i + 1);
    }

    // update localstorage as cart is updated
    localStorage.setItem("cart", JSON.stringify(cart));
  });

  // as the increase button can be clicked when a item is already present in the cart (otherwise it was hidden), So just increase the count.
  increase.addEventListener("click", function (e) {
    cartProduct.count++;

    // update localstorage as cart is updated
    localStorage.setItem("cart", JSON.stringify(cart));
    text.textContent = cartProduct.count;
  });
});

// Everytime the cart is changed, just update the localstorage.
