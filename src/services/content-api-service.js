import config from "../config";
import TokenService from "./token-service";

const ContentApiService = {
  getPosts() {
    return fetch(`${config.API_ENDPOINT}/posts`, {
      headers: {
        "content-type": "application/json",
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getUserPosts(userId) {
    return fetch(`${config.API_ENDPOINT}/posts/${userId}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json",
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getUserLikes(userId) {
    return fetch(`${config.API_ENDPOINT}/likes/${userId}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json",
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  postWhisper(newPost, userId) {
    return fetch(`${config.API_ENDPOINT}/posts/${userId}`, {
      method: "POST",
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(newPost),
    }).then((res) => {
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json();
    });
  },
  postLike(post_id, user_id) {
    return fetch(`${config.API_ENDPOINT}/likes/${user_id}`, {
      method: "POST",
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ post_id, user_id }),
    }).then((res) => {
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json();
    });
  },
  countLikes(post_id) {
    return fetch(`${config.API_ENDPOINT}/posts/countlikes/${post_id}`, {
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => {
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json();
    });
  },
};

export default ContentApiService;
