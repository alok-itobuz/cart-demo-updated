import products from "../data/prod.mjs";

const homeCardContainer = document.querySelector(".home-card-container");

function createCard(id, imagePath, imageAlt, price, title) {
  return `<div class="card">
  <div class="image-container">
    <img src="${imagePath}" alt="${imageAlt}" />
  </div>
  <div class="text-container">
    <h3>${title}</h3>
    <p class="price">$ ${price}</p>
    <button class="add-to-cart add-to-card-${id}">Add to cart</button>
    <div class="card-buttons card-buttons-${id} display-none">
      <button class="decrease">-</button>
      <p class="item-count">1</p>
      <button class="increase">+</button>
    </div>
  </div>
</div>`;
}

products.forEach((prod) => {
  const card = createCard(
    prod.id,
    prod.image,
    prod.title,
    prod.price,
    prod.title
  );
  homeCardContainer.insertAdjacentHTML("beforeend", card);
});

const addToCardBtn = Array.from(document.querySelectorAll(".add-to-cart"));
const cardBtns = Array.from(document.querySelectorAll(".card-buttons"));

let cart = [];

addToCardBtn.forEach((btn, i) => {
  btn.addEventListener("click", function (e) {
    const [decrease, text, increase] = [...cardBtns[i].children];

    // hide the add to card button and display the +, - buttons
    e.target.classList.add("display-none");
    cardBtns[i].classList.remove("display-none");

    // push the product to the cart array
    let cartProduct = {
      product: products[i],
      count: 1,
    };
    text.textContent = cartProduct.count;
    cart.push(cartProduct);

    // after change of cart array, we are sorting it
    cart.sort((a, b) => a.product.id - b.product.id);

    decrease.addEventListener("click", function (e) {
      cartProduct.count--;
      text.textContent = cartProduct.count;
      if (cartProduct.count == 0) {
        btn.classList.remove("display-none");
        cardBtns[i].classList.add("display-none");
        cart = cart.filter((c) => c.product.id !== i + 1);
      }
    });
    increase.addEventListener("click", function (e) {
      cartProduct.count++;
      text.textContent = cartProduct.count;
      console.log(cart);
    });
  });
});
