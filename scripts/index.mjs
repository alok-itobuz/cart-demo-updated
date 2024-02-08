import products from "../data/product.mjs";

const homeCardContainer = document.querySelector(".home-card-container");

function createCard(id, imagePath, imageAlt, price, title, count) {
  return `<div class="card">
  <div class="image-container">
    <img src="${imagePath}" alt="${imageAlt}" />
  </div>
  <div class="text-container">
    <h3>${title}</h3>
    <p class="price price-${id}">$ ${price}</p>
    <button class="add-to-cart add-to-cart-${id} ${
    count !== 0 ? "display-none" : ""
  }">Add to cart</button>
    <div class="card-buttons card-buttons-${id} ${
    count === 0 ? "display-none" : ""
  }">
      <button class="decrease">-</button>
      <p class="item-count">${count}</p>
      <button class="increase">+</button>
    </div>
  </div>
</div>`;
}

let cart =
  localStorage.getItem("cart") == null
    ? []
    : Array.from(JSON.parse(localStorage.getItem("cart")));

products.forEach((prod, i) => {
  const card = createCard(
    i + 1,
    prod.image,
    prod.title,
    prod.price,
    prod.title,
    cart.find((c) => c.product.id === prod.id)
      ? cart.find((c) => c.product.id === prod.id).count
      : 0
  );
  homeCardContainer.insertAdjacentHTML("beforeend", card);
});

const cards = document.querySelectorAll(".card");
const cardBtns = Array.from(document.querySelectorAll(".card-buttons"));

cards.forEach((card, i) => {
  const btn = document.querySelector(`.add-to-cart-${i + 1}`);
  const [decrease, text, increase] = [...cardBtns[i].children];

  // push the product to the cart array
  let cartProduct = cart.find((c) => c.product.id === i + 1);
  btn.addEventListener("click", function (e) {
    console.log(i, "btn clicked");
    // hide the add to card button and display the +, - buttons
    e.target.classList.add("display-none");
    cardBtns[i].classList.remove("display-none");

    cartProduct = cart.find((c) => c.product.id === i + 1);
    if (!cartProduct) {
      cartProduct = {
        product: products[i],
        count: 1,
      };
      cart.push(cartProduct);
    }
    text.textContent = cartProduct.count;

    localStorage.setItem("cart", JSON.stringify(cart));
  });
  decrease.addEventListener("click", function (e) {
    cartProduct.count--;
    text.textContent = cartProduct.count;
    if (cartProduct.count == 0) {
      btn.classList.remove("display-none");
      cardBtns[i].classList.add("display-none");
      cart = cart.filter((c) => c.product.id !== i + 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  });
  increase.addEventListener("click", function (e) {
    cartProduct.count++;

    localStorage.setItem("cart", JSON.stringify(cart));
    text.textContent = cartProduct.count;
  });
});
