"use strict";

import $ from "jquery";

const a = $("#navigation-view");
$("#navigation-view")
  .children()
  .each((idx, el) => {
    if ($(el).hasClass("active")) {
      $(el).delay(200).fadeIn(200).addClass("active");
    }
  });

$("#navigation-tabs")
  .children()
  .each((idx, el) => {
    $(el).click(() => {
      $("#navigation-view")
        .children()
        .each((subIdx, subEl) => {
          if (idx !== subIdx) {
            $(subEl).fadeOut(200).removeClass("active");
            $(subEl).addClass("hiden");
          } else {
            $(subEl).delay(200).fadeIn(200).addClass("active");
            $(subEl).removeClass("hiden");
          }
        });
    });
  });
console.log(a);
