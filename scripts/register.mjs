const keys = {
  FORM_DATA: "form_data",
  USERS: "users",
};

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

function generateOtp() {
  const formData = getLocalstorage(keys.FORM_DATA);
  if (formData && formData.otp) {
    otp = formData.otp;
  } else {
    otp = "";
    for (let i = 1; i <= 6; i++) {
      otp += Math.trunc(Math.random() * 9) + 1;
    }
    setLocalstorage(keys.FORM_DATA, {
      ...getLocalstorage(keys.FORM_DATA),
      otp,
    });
  }
}

async function sendOtp() {
  generateOtp();
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

function setLocalstorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
function getLocalstorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

window.addEventListener("load", function (e) {
  e.preventDefault();
  const formDetails = getLocalstorage(keys.FORM_DATA);
  if (formDetails) {
    if (formDetails.name !== "undefined") inputName.value = formDetails.name;
    if (formDetails.email !== "undefined") inputEmail.value = formDetails.email;
    if (formDetails.password !== "undefined")
      inputPassword.value = formDetails.password;
    if (formDetails.otp !== "undefined") otp = formDetails.otp;
  }
});

btnGetOtp.addEventListener("click", async function (e) {
  e.preventDefault();
  const [name, email, password] = [
    inputName.value,
    inputEmail.value,
    inputPassword.value,
  ];

  if (!name || !email || !password) {
    alert(`Name, Email and password field shouldn't be empty`);
  }
  let usersData = getLocalstorage(keys.USERS);
  if (usersData && usersData[email]) {
    alert("user already exist");
    localStorage.removeItem(keys.FORM_DATA);
  } else {
    const formData = getLocalstorage(keys.FORM_DATA);
    if (!formData || formData.email !== email) {
      setLocalstorage(keys.FORM_DATA, { name, email, password });
    }
    await sendOtp();
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(e.target);
  const [name, email, password, enteredOtp] = [
    inputName.value,
    inputEmail.value,
    inputPassword.value,
    inputOtp.value,
  ];
  if (!name || !email || !password || !enteredOtp) {
    alert(`Name, Email, password and otp field shouldn't be empty`);
  } else {
    if (enteredOtp.toString() !== otp) {
      alert("Incorrect OTP");
    } else {
      let usersData = getLocalstorage(keys.USERS);
      if (!usersData) {
        usersData = { ...usersData, [email]: { name, password } };
        setLocalstorage(keys.USERS, usersData);
        location.href = "http://127.0.0.1:5501/pages/index.html";
      }
    }
    localStorage.removeItem(keys.FORM_DATA);
    inputName.value = "";
    inputEmail.value = "";
    inputPassword.value = "";
    inputOtp.value = "";
  }
});
