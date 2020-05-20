"use strict";
import Glide from "@glidejs/glide";
const config = {
  type: "carousel",
  startAt: 1,
  perView: 4,
  focusAt: 1,
  gap: 45,
  animationDuration: 500,
  breakpoints: {
    1300: {
      perView: 3,
    },
    900: {
      perView: 2,
    },
    600: {
      perView: 1,
    },
  },
};
new Glide(".glide", config).mount();
