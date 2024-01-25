const usersAPIURL = "https://jsonplaceholder.typicode.com/users";
const firstSectionul = document.querySelector(".first-section-ul");
const firstSectionli = document.querySelector(".first-section-li");
const firstSectionSpan = document.querySelector(".first-section-span");
const secondSectionul = document.querySelector(".second-section-ul");
const secondSectionli = document.querySelector(".second-section-li");

window.onload = () => {
  getUser();
};

let arr = [];
const getUser = async () => {
  const user = await fetch(usersAPIURL);
  const res = await user.json();

  firstSectionul.innerHTML = res
    .map(
      (user) =>
        `<li>${user.name}<button onclick="addToFav(${user.id})" class="fav-button" id="fav-id-${user.id}"><i class="fa-regular fa-heart"></i></button></li>`
    )
    .join("");

  return res;
};

const addToFav = async (id) => {
  const oneUser = await fetch(usersAPIURL + `\\${id}`);
  const oneRes = await oneUser.json();

  const favbtn = document.getElementById(`fav-id-${id}`);
  if (favbtn) {
    favbtn.innerHTML = "";
    favbtn.disabled = true;
    favbtn.style.cursor = "not-allowed";
    favbtn.innerHTML = `<i class="fa-solid fa-heart" style="color: #ff0000;"></i>`;
  }

  arr = [...arr, oneRes];
  console.log(arr);
  secondSectionul.innerHTML = arr
    .map(
      (oneuser) =>
        `<li>${oneuser.name}<button class="close-button" id="close-button-id" onclick="removeFromFav(${oneuser.id})"><i class="fa-solid fa-xmark"></i></button></li>`
    )
    .join("");
};

const removeFromFav = async (id) => {
  arr = arr.filter((item) => item.id !== id);
  console.log("Filter", arr);
  const favbtn = document.getElementById(`fav-id-${id}`);
  if (favbtn) {
    favbtn.disabled = false;
    favbtn.style.cursor = "pointer";
    favbtn.innerHTML = `<i class="fa-regular fa-heart"></i>`;
  }

  secondSectionul.innerHTML = arr
    .map(
      (oneuser) =>
        `<li>${oneuser.name}<button class="close-button" id="close-button-id" onclick="removeFromFav(${oneuser.id})"><i class="fa-solid fa-xmark"></i></button></li>`
    )
    .join("");
  console.log(arr);
};
