"use strict";
//   1111
function runOnKeys(func, ...codes) {
  let pressed = new Set();
  document.addEventListener("keydown", function (event) {
    pressed.add(event.code);
    console.log(event.code);
    for (let code of codes) {
      // все ли клавиши из набора нажаты?
      if (!pressed.has(code)) {
        return;
      }
    }
    pressed.clear();
    func();
  });
  document.addEventListener("keyup", function (event) {
    pressed.delete(event.code);
  });
}
const $text = document.getElementById("text");
const $texterea = document.getElementsByName("text2")[0];
const changeImport = () => {
  $texterea.innerHTML = $text.innerText;
  $text.style.display = "none";
  $texterea.style.display = "block";
  runOnKeys(changeExport, "Space", "ControlLeft");
};
const changeExport = () => {
  $text.innerText = $texterea.value;
  $texterea.style.display = "none";
  $text.style.display = "block";
};
runOnKeys(changeImport, "ControlLeft", "AltLeft");

// 22222

const $listArr = [...document.getElementById("app").children];
function sorting(a) {
  let nubers = [];
  let $itemList = [...$listArr[a].children];
  $itemList.forEach((el, idx) => {
    if (idx) {
      nubers.push(el.innerText);
    }
  });
  nubers.sort((a, b) => {
    return a - b;
  });
  $itemList.forEach((el, idx) => {
    if (idx) {
      el.innerText = `${nubers[idx - 1]}`;
    }
  });
}

document.addEventListener("click", function (event) {
  const idElem = event.target.id;
  sorting(idElem);
});

// 3333
document.addEventListener("mouseover", (event) => {
  const $borderedBox = document.getElementById("containerSize");
  const $close = document.getElementById("close");
  if (event.target === $borderedBox) {
    $borderedBox.style.resize = "both";
  }
});
document.addEventListener("mouseout", (event) => {
  const $borderedBox = document.getElementById("containerSize");
  const $close = document.getElementById("close");
  if (event.target === $borderedBox) {
    $borderedBox.style.resize = "none";
  }
});
