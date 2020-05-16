"use strict";
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
