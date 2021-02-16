import config from "../config";

const UnsplashApiService = {
  searchPhotos(searchQuery) {
    return fetch(`${config.API_ENDPOINT}/photos?query=${searchQuery}`, {
      headers: {
        "content-type": "application/json",
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default UnsplashApiService;
