const API_URL = "https://picsum.photos/v2";

const url = {
  photos: `${API_URL}/list`,
};

export const http = {
  getPhotos() {
    return fetch(url.photos)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.log("Photos not loaded!", err);
        return null;
      });
  },
};
