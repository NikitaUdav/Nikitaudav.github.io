"use strict";
const $btn = document.getElementById("myBtn");
const $lights = document.getElementsByClassName("light");
const lightsArr = [...$lights];
const colors = ["red", "yellow", "green"];
let flag = 0;
let flag2 = 0;
$btn.onclick = function () {
  lightsArr[flag].style.backgroundColor = colors[flag];
  console.log(lightsArr[flag], flag);
  if (flag == 0) {
    lightsArr[2].style.backgroundColor = "grey";
  } else {
    lightsArr[flag - 1].style.backgroundColor = "grey";
  }
  flag > 1 ? (flag = 0) : flag++;
};

console.log(lightsArr);
