import products from "../data/prod.mjs";

const cartCardContainer = document.querySelector(".cart-card-container");

function createCard(id, imagePath, imageAlt, price, title, count) {
  return `<div class="card">
  <div class="image-container">
    <img src="${imagePath}" alt="${imageAlt}" />
  </div>
  <div class="text-container">
    <h3>${title}</h3>
    <p class="price">$ ${price * count}</p>
    <div class="card-buttons card-buttons-${id}">
      <button class="decrease">-</button>
      <p class="item-count">${count}</p>
      <button class="increase">+</button>
    </div>
  </div>
</div>`;
}

let cart = [];

cart = [
  { count: 3, product: products[0] },
  { count: 1, product: products[3] },
  { count: 7, product: products[6] },
  { count: 9, product: products[10] },
  { count: 2, product: products[15] },
];
function renderCards() {
  cartCardContainer.innerHTML = "";
  cart.forEach(({ count, product }) => {
    const card = createCard(
      product.id,
      product.image,
      product.title,
      product.price,
      product.title,
      count
    );
    cartCardContainer.insertAdjacentHTML("beforeend", card);
  });

  const cardBtns = Array.from(document.querySelectorAll(".card-buttons"));

  cardBtns.forEach((cardBtn, i) => {
    console.dir(cardBtn.parentNode.parentNode);
    const [decrease, text, increase] = [...cardBtn.children];

    let cartProduct = cart[i];
    decrease.addEventListener("click", function (e) {
      cartProduct.count--;
      text.textContent = cartProduct.count;
      if (cartProduct.count == 0) {
        cart = cart.filter((c, index) => i !== index);
        renderCards();
      }
    });
    increase.addEventListener("click", function (e) {
      cartProduct.count++;
      text.textContent = cartProduct.count;
      console.log(cart);
    });
  });
}
renderCards();
