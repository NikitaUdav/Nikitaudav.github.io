"use strict";
import Glide from "@glidejs/glide";
const config = {
  type: "carousel",
  startAt: 1,
  perView: 4,
  focusAt: 1,
  gap: 30,
  animationDuration: 500,
  breakpoints: {
    1300: {
      perView: 3,
    },
    900: {
      perView: 1,
    },
  },
};
new Glide(".glide", config).mount();
