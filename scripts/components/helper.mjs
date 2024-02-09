function getItemFromLocalStorage(str) {
  return localStorage.getItem(str) == null
    ? []
    : Array.from(JSON.parse(localStorage.getItem("cart")));
}

function displayNoItem(parentElement, isHome) {
  const noProduct = document.createElement("h1");
  noProduct.innerHTML = isHome
    ? "Sorry, there is no products at this time<br /> So sorry for the incovenience."
    : "You have not added <br/> any item in the cart....<br/><br/>Please add some.";
  parentElement.innerHTML = "";
  parentElement.appendChild(noProduct);
}

function createCard(
  id,
  imagePath,
  imageAlt,
  price,
  title,
  count,
  showAddToCart
) {
  return `<div class="card">
    <div class="image-container">
      <img src="${imagePath}" alt="${imageAlt}" />
    </div>
    <div class="text-container">
      <h3>${title}</h3>
      <p class="price">$ ${price}</p>
    ${
      showAddToCart
        ? `<button class="add-to-cart add-to-cart-${id} ${
            count !== 0 ? "display-none" : ""
          }">Add to cart</button>`
        : ""
    }
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

export { getItemFromLocalStorage, displayNoItem, createCard };
