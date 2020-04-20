"use strict";
const circleLength = prompt(`Укажите длинну окружности`);
const squarePerimeter = prompt(`Укажите периметр квадрата`);
if (isNaN(circleLength) && isNaN(squarePerimeter)) {
  alert(`Биджо ты написал не число! Давай все сначала !`);
} else if (circleLength <= 0 || squarePerimeter <= 0) {
  alert(`Биджо зачем ты написал 0 или меньше.`);
} else {
  let diametr = circleLength / Math.PI;
  let storona = squarePerimeter / 4;
  if (diametr <= storona) {
    alert(
      `В данный квадрат возможно вписать эту окружность так как диаметр ${diametr.toFixed(
        2
      )} <= ${storona.toFixed(2)} стороне квадрата`
    );
  } else {
    alert(
      `В данный квадрат не возможно вписать эту окружность так как диаметр ${diametr.toFixed(
        2
      )} не <= ${storona.toFixed(2)} стороне квадрата`
    );
  }
}
