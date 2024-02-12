// Constants
export const page = {
  HOME: "home",
  CART: "cart",
};

// fetching localstorage
export function getItemFromLocalStorage(key) {
  return localStorage.getItem(key) == null
    ? []
    : Array.from(JSON.parse(localStorage.getItem(key)));
}

// updating localstorage
export function updateLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// when there is no product, display no item
export function displayNoItem(parentElement, currPage) {
  const noProduct = document.createElement("h1");
  noProduct.innerHTML =
    currPage === page.HOME
      ? "Sorry, there is no products at this time<br /> So sorry for the incovenience."
      : "You have not added <br/> any item in the cart....<br/><br/>Please add some.";
  parentElement.innerHTML = "";
  parentElement.appendChild(noProduct);
}

// render footer in cart page
export function renderFooter(cart) {
  const totalItems = document.querySelector(".total-items");
  const totalPrice = document.querySelector(".total-price");

  totalItems.textContent = `: ${cart.length}`;
  totalPrice.textContent = `: $${cart.reduce(
    (acc, { count, product: { price } }) => acc + price * count,
    0
  )}`;
}

// event listners on clicking any buttons (add-to-cart or change-quantity)
export function clickEventListener(products, cart, currPage) {
  const cardContainer = document.querySelector(".card-container");

  cardContainer.addEventListener("click", function (e) {
    if (e.target.tagName.toLowerCase() !== "button") {
      return;
    }

    const currBtn = e.target;
    const currId = currBtn.dataset.id;
    const currCard = Array.from(document.querySelectorAll(".card")).find(
      (c) => c.dataset.id === currId
    );
    const btnAddToCart = currCard.querySelector(".add-to-cart");
    const cardButtons = currCard.querySelector(".card-buttons");
    const textQuantity = cardButtons.querySelector(".item-count");

    function addToCartClicked() {
      btnAddToCart.classList.add("display-none");
      cardButtons.classList.remove("display-none");

      const cartProduct = {
        product: products.slice().find((p) => p.id == currId),
        count: 1,
      };
      cart.push(cartProduct);
      textQuantity.innerHTML = 1;
      updateLocalStorage("cart", cart);
    }

    function changeQuantityClicked() {
      const cartProduct = cart.find((c) => c.product.id == currId);
      if (currBtn.classList.contains("remove-quantity")) {
        cartProduct.count--;
        if (!cartProduct.count) {
          if (currPage === page.HOME) {
            btnAddToCart.classList.remove("display-none");
            cardButtons.classList.add("display-none");
          } else {
            currCard.remove();
            if (cart.length === 1) {
              displayNoItem(cardContainer, currPage);
            }
          }
        }
        cart = cart.filter((c) => c.count !== 0);
      } else {
        cartProduct.count++;
      }
      textQuantity.innerText = cartProduct.count;
      updateLocalStorage("cart", cart);
    }

    if (currBtn.dataset.btnType === "add-to-cart") {
      addToCartClicked();
    } else {
      changeQuantityClicked();
      if (currPage === page.CART) {
        renderFooter(cart);
      }
    }
  });
}
