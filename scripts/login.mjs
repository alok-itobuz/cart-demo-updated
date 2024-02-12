import {
  getLocalstorage,
  keys,
  redirectToIndex,
  setLocalStorage,
} from "./components/helper.mjs";

const loginForm = document.querySelector("#form");
const inputEmail = document.querySelector(".user-email");
const inputPassword = document.querySelector(".user-password");

window.addEventListener("load", function (e) {
  e.preventDefault();
  redirectToIndex();
});

const getInputValues = () => ({
  email: inputEmail.value,
  password: inputPassword.value,
});

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const { email, password } = getInputValues();

  if (!email || !password) {
    alert(`email and password fields can't be left empty`);
    return;
  }

  const currentUser = getLocalstorage(keys.USERS)[email];

  if (!currentUser) {
    alert(`User doesn't exist!`);
    return;
  }

  if (password === currentUser.password) {
    setLocalStorage(keys.CURRENT_USER, { name: currentUser.name, email });
    location.href = `${location.origin}/pages/index.html`;
  } else {
    alert(`email or password is invalid`);
  }
});
