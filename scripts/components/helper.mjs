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
  // return `<div class="card">
  //   <div class="image-container">
  //     <img src="${imagePath}" alt="${imageAlt}" />
  //   </div>
  //   <div class="text-container">
  //     <h3>${title}</h3>
  //     <p class="price">$ ${price}</p>
  //   ${
  //     showAddToCart
  //       ? `<button class="add-to-cart add-to-cart-${id} ${
  //           count !== 0 ? "display-none" : ""
  //         }">Add to cart</button>`
  //       : ""
  //   }
  //     <div class="card-buttons card-buttons-${id} ${
  //   count === 0 ? "display-none" : ""
  // }">
  //       <button class="decrease">-</button>
  //       <p class="item-count">${count}</p>
  //       <button class="increase">+</button>
  //     </div>
  //   </div>
  // </div>`;

  const card = document.createElement("div");
  card.classList.add("card");

  // image container
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");
  const cardImage = document.createElement("img");
  cardImage.src = imagePath;
  cardImage.alt = imageAlt;
  imageContainer.appendChild(cardImage);
  card.appendChild(imageContainer);

  // text container
  const textContainer = document.createElement("div");
  textContainer.classList.add("text-container");
  const titleHeading = document.createElement("h3");
  titleHeading.innerText = title;
  // ----
  const titleDescription = document.createElement("p");
  titleDescription.classList.add("price");
  titleDescription.innerText = price;
  // adding heading and description to text container.
  textContainer.appendChild(titleHeading);
  textContainer.appendChild(titleDescription);

  // add to cart button
  const btnAddToCart = document.createElement("button");
  btnAddToCart.classList.add("add-to-cart", `add-to-cart-${id}`);

  count ? btnAddToCart.classList.add("display-none") : "";
  btnAddToCart.innerText = "Add to Cart";
  showAddToCart ? textContainer.appendChild(btnAddToCart) : "";

  textContainer.appendChild(btnAddToCart);

  // card buttons
  const cardButtons = document.createElement("div");
  cardButtons.classList.add("card-buttons", `card-buttons-${id}`);
  count ? "" : cardButtons.classList.add("display-none");
  const addQuantityBtn = document.createElement("button");
  addQuantityBtn.classList.add("increase");
  addQuantityBtn.innerText = "+";

  const itemCountText = document.createElement("p");
  itemCountText.classList.add("item-count");
  itemCountText.innerText = count;

  const removeQuantityBtn = document.createElement("button");
  removeQuantityBtn.classList.add("decrease");
  removeQuantityBtn.innerText = "-";

  cardButtons.appendChild(removeQuantityBtn);
  cardButtons.appendChild(itemCountText);
  cardButtons.appendChild(addQuantityBtn);

  textContainer.appendChild(cardButtons);

  card.appendChild(textContainer);

  return card;
}

export { getItemFromLocalStorage, displayNoItem, createCard };
