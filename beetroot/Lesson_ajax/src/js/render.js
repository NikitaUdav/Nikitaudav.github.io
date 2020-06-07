import Glide from "@glidejs/glide";

const _render = (id, data) => {
  const element = document.getElementById(id);
  element.innerHTML = data;
};

export const render = {
  photos: (data) => {
    if (data) {
      const getElement = (item) => `
          <li class='item'>
            <img class='item__photo' src='${item.download_url}'/>
          </li>
        `;

      const result = data.map(getElement).join("");
      _render("photos", result);

      new Glide(".glide").mount();
    }
  },
};
