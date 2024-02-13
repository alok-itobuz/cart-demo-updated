import {
  getLocalstorage,
  keys,
  redirectToIndex,
  setLocalStorage,
} from "./components/helper.mjs";

const form = document.querySelector("#form");
const inputName = document.querySelector(".user-name");
const inputEmail = document.querySelector(".user-email");
const inputPassword = document.querySelector(".user-password");
const btnGetOtp = document.querySelector(".btn-get-otp");
const inputOtp = document.querySelector(".user-otp");

(function () {
  emailjs.init({
    publicKey: "ncD_lPd3l5AXg9fSl",
  });
})();

let otp = "";

window.addEventListener("load", function (e) {
  e.preventDefault();
  redirectToIndex();
  localStorage.removeItem(keys.OTP);
  const storedOtp = getLocalstorage(keys.OTP);
  otp = storedOtp;
});

function setFieldsEmpty() {
  inputName.value = "";
  inputEmail.value = "";
  inputPassword.value = "";
  inputOtp.value = "";
}

function getInputValues() {
  return {
    name: inputName.value,
    email: inputEmail.value,
    password: inputPassword.value,
    enteredOtp: inputOtp.value,
  };
}

function generateOtp() {
  const storedOtp = getLocalstorage(keys.OTP);
  if (storedOtp) {
    otp = storedOtp;
  } else {
    otp = "";
    for (let i = 1; i <= 6; i++) {
      otp += Math.trunc(Math.random() * 9) + 1;
    }
    setLocalStorage(keys.OTP, otp);
  }
}

async function sendOtp() {
  generateOtp();
  console.log(otp);
  const emailParams = {
    from_name: inputName.value,
    to_email: inputEmail.value,
    message: otp,
  };
  try {
    const res = await emailjs.send(
      "service_udd6kie",
      "template_n0o6o2q",
      emailParams
    );
    console.log("res", res);
  } catch (error) {
    console.log("error", err);
  }
}

btnGetOtp.addEventListener("click", async function (e) {
  e.preventDefault();

  const { name, email, password } = getInputValues();

  if (!name || !email || !password) {
    alert(`Name, Email and password field shouldn't be empty`);
  }

  const usersData = getLocalstorage(keys.USERS);
  if (usersData && usersData[email]) {
    alert("user already exist");
    localStorage.removeItem(keys.OTP);
    setFieldsEmpty();
  } else {
    await sendOtp();
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const { name, email, password, enteredOtp } = getInputValues();

  if (!name || !email || !password || !enteredOtp) {
    alert(`Name, Email, password and otp field shouldn't be empty`);
  } else {
    if (enteredOtp.toString() !== otp) {
      alert("Incorrect OTP");
    } else {
      let usersData = getLocalstorage(keys.USERS);
      usersData = { ...usersData, [email]: { name, password } };
      setLocalStorage(keys.USERS, usersData);
      setLocalStorage(keys.CURRENT_USER, { name, email });
      location.href = `${location.origin}/pages/index.html`;
    }
    localStorage.removeItem(keys.OTP);
  }
});
