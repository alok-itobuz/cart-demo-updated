import {
  getItemFromLocalStorage,
  displayNoItem,
  createCard,
} from "./components/helper.mjs";

const cartCardContainer = document.querySelector(".cart-card-container");

let cart = getItemFromLocalStorage("cart");

displayNoItem(cartCardContainer, false);

function renderFooter() {
  const totalItems = document.querySelector(".total-items");
  const totalPrice = document.querySelector(".total-price");

  totalItems.textContent = `: ${cart.length}`;
  totalPrice.textContent = `: $${cart.reduce(
    (acc, { count, product: { price } }) => acc + price * count,
    0
  )}`;
}

function renderPage() {
  cartCardContainer.innerHTML = "";
  renderFooter();

  cart.forEach(({ count, product: { image, title, price } }, i) => {
    const card = createCard(i + 1, image, title, price, title, count, false);
    // cartCardContainer.insertAdjacentHTML("beforeend", card);
    cartCardContainer.appendChild(card);
  });

  const cardBtns = Array.from(document.querySelectorAll(".card-buttons"));

  cardBtns.forEach((cardBtn, i) => {
    const [decrease, text, increase] = [...cardBtn.children];

    let cartProduct = cart[i];
    decrease.addEventListener("click", function (e) {
      cartProduct.count--;
      text.textContent = cartProduct.count;
      if (cartProduct.count == 0) {
        cart = cart.filter((c, index) => i !== index);
        renderPage();
        if (cart.length === 0) {
          displayNoItem(cartCardContainer, false);
        }
      }
      renderFooter();
      localStorage.setItem("cart", JSON.stringify(cart));
      renderFooter();
    });
    increase.addEventListener("click", function (e) {
      cartProduct.count++;
      renderFooter();
      localStorage.setItem("cart", JSON.stringify(cart));
      renderFooter();
      text.textContent = cartProduct.count;
    });
  });
}
if (cart.length === 0) {
  displayNoItem(cartCardContainer, false);
} else {
  renderPage();
}
