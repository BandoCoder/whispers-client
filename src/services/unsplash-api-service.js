import config from "../config";

// ** Calls an enpoint that passes the fetch call to the unsplash API (Proxy) **
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
