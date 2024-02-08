const cartCardContainer = document.querySelector(".cart-card-container");

function createCard(id, imagePath, imageAlt, price, title, count) {
  return `<div class="card">
  <div class="image-container">
    <img src="${imagePath}" alt="${imageAlt}" />
  </div>
  <div class="text-container">
    <h3>${title}</h3>
    <p class="price price-${id}">$ ${price * count}</p>
    <div class="card-buttons card-buttons-${id}">
      <button class="decrease">-</button>
      <p class="item-count">${count}</p>
      <button class="increase">+</button>
    </div>
  </div>
</div>`;
}

let cart = JSON.parse(localStorage.getItem("cart"));

function renderCards() {
  cartCardContainer.innerHTML = "";
  cart.forEach(({ count, product }, i) => {
    const card = createCard(
      i + 1,
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
    const [decrease, text, increase] = [...cardBtn.children];

    let cartProduct = cart[i];
    decrease.addEventListener("click", function (e) {
      cartProduct.count--;
      text.textContent = cartProduct.count;
      if (cartProduct.count == 0) {
        cart = cart.filter((c, index) => i !== index);
        renderCards();
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    });
    increase.addEventListener("click", function (e) {
      cartProduct.count++;
      localStorage.setItem("cart", JSON.stringify(cart));
      text.textContent = cartProduct.count;
    });
  });
}
renderCards();
