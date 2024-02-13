// Constants
export const page = {
  HOME: "home",
  CART: "cart",
};

export const keys = {
  OTP: "otp",
  USERS: "users",
  CURRENT_USER: "curr_user",
};

// fetching localstorage
export function getLocalstorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// updating localstorage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function setLocalStorageAndUpdateCartItem(
  key,
  data,
  currPage,
  textSpanItem,
  email
) {
  setLocalStorage(key, data);
  if (currPage == page.HOME) {
    textSpanItem.innerText = data[email]?.length || 0;
  }
}

// If current user exist then redirect to index page
export function redirectToIndex() {
  const currentUser = getLocalstorage(keys.CURRENT_USER);
  if (currentUser) {
    location.href = `${location.origin}/pages/index.html`;
    return;
  }
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
export function renderFooter(userCart) {
  const totalItems = document.querySelector(".total-items");
  const totalPrice = document.querySelector(".total-price");

  totalItems.textContent = `: ${userCart.length}`;
  totalPrice.textContent = `: $${userCart.reduce(
    (acc, { count, product: { price } }) => acc + price * count,
    0
  )}`;
}

// event listners on clicking any buttons (add-to-cart or change-quantity)
export function clickEventListener(
  email,
  products,
  cart,
  currPage,
  btnLogout,
  textSpanItem
) {
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

    // add to cart button clicked funtion
    function addToCartClicked() {
      if (!cart[email]) cart[email] = [];
      btnAddToCart.classList.add("display-none");
      cardButtons.classList.remove("display-none");

      const cartProduct = {
        product: products.slice().find((p) => p.id == currId),
        count: 1,
      };
      cart[email].push(cartProduct);
      textQuantity.innerHTML = 1;
      setLocalStorageAndUpdateCartItem(
        "cart",
        cart,
        currPage,
        textSpanItem,
        email
      );
    }

    function changeQuantityClicked() {
      const cartProduct = cart[email].find((c) => c.product.id == currId);
      if (currBtn.classList.contains("remove-quantity")) {
        cartProduct.count--;
        if (!cartProduct.count) {
          if (currPage === page.HOME) {
            btnAddToCart.classList.remove("display-none");
            cardButtons.classList.add("display-none");
          } else {
            currCard.remove();
            if (cart[email].length === 1) {
              displayNoItem(cardContainer, currPage);
            }
          }
        }
        cart[email] = cart[email].filter((c) => c.count !== 0);
      } else {
        cartProduct.count++;
      }
      textQuantity.innerText = cartProduct.count;
      setLocalStorageAndUpdateCartItem(
        "cart",
        cart,
        currPage,
        textSpanItem,
        email
      );
    }

    if (currBtn.dataset.btnType === "add-to-cart") {
      addToCartClicked();
    } else {
      changeQuantityClicked();
      if (currPage === page.CART) {
        renderFooter(cart[email]);
      }
    }
  });

  btnLogout.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem(keys.CURRENT_USER);
    location.href = `${location.origin}/pages/login.html`;
  });
}
