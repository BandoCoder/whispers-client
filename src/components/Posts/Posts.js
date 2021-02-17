import React, { Component } from "react";
import ContentApiService from "../../services/content-api-service";
import TokenService from "../../services/token-service";
import UnsplashApiService from "../../services/unsplash-api-service";
import "./Posts.css";

export default class Posts extends Component {
  state = {
    posts: [],
    likedPosts: [],
    unsplash: [],
    posting: false,
    loggedIn: false,
    error: null,
  };

  //helpers
  checkUserLike = (postId) => {
    const liked = this.state.likedPosts;
    let result;
    liked.forEach((like) => {
      if (like.id === postId) {
        result = true;
      }
    });
    return result;
  };

  componentDidMount() {
    const jwt = TokenService.getAuthToken();
    if (jwt) {
      let base64Url = jwt.split(".")[1];
      let decodedValue = JSON.parse(window.atob(base64Url));

      ContentApiService.getUserLikes(decodedValue.user_id)
        .then((posts) =>
          this.setState({
            likedPosts: posts.map((post) => {
              return {
                id: post.id,
              };
            }),
          })
        )
        .then(() =>
          ContentApiService.getPosts().then((posts) =>
            this.setState({
              posts: posts.map((post) => {
                return {
                  id: post.id,
                  title: post.title,
                  content: post.content,
                  img_url: post.img_url,
                  img_photographer: post.img_photographer,
                  portfolio_url: post.portfolio_url,
                  img_dwn_link: post.img_dwn_link,
                  img_alt: post.img_alt,
                  dateCreated: post.date_created,
                  likedByUser: this.checkUserLike(post.id),
                };
              }),
            })
          )
        )
        .catch((res) => this.setState({ error: res.error }));
    } else {
      ContentApiService.getPosts()
        .then((posts) =>
          this.setState({
            posts: posts.map((post) => {
              return {
                id: post.id,
                title: post.title,
                content: post.content,
                img_url: post.img_url,
                img_photographer: post.img_photographer,
                portfolio_url: post.portfolio_url,
                img_dwn_link: post.img_dwn_link,
                img_alt: post.img_alt,
                dateCreated: post.date_created,
                likedByUser: this.checkUserLike(post.id),
              };
            }),
          })
        )
        .catch((res) => {
          this.setState({ error: res.error });
        });
    }
  }

  handlePostClick = (e) => {
    e.preventDefault();
    this.setState({
      posting: true,
    });
  };

  handleCancelCLick = (e) => {
    e.preventDefault();
    this.setState({
      posting: false,
    });
  };

  handlePostSubmit = (e) => {
    e.preventDefault();
    const jwt = TokenService.getAuthToken();
    if (jwt) {
      let base64Url = jwt.split(".")[1];
      let decodedValue = JSON.parse(window.atob(base64Url));
      const selectedImage = this.state.unsplash.find(
        (img) => img.id === e.target["photoThumb"].value
      );
      console.log(selectedImage);
      const newPost = {
        title: e.target["title"].value,
        content: e.target["content"].value,
        img_url: selectedImage.urls.small,
        img_photographer: selectedImage.img_photographer,
        portfolio_url: selectedImage.portfolio_url,
        img_dwn_link: selectedImage.img_dwn_link,
        img_alt: selectedImage.alt_description,
        user_id: decodedValue.user_id,
      };
      ContentApiService.postWhisper(newPost, decodedValue.user_id)
        .then(() =>
          ContentApiService.getPosts().then((posts) =>
            this.setState({
              posting: false,
              posts: posts.map((post) => {
                return {
                  id: post.id,
                  title: post.title,
                  content: post.content,
                  img_url: post.img_url,
                  img_photographer: post.img_photographer,
                  portfolio_url: post.portfolio_url,
                  img_dwn_link: post.img_dwn_link,
                  img_alt: post.img_alt,
                  dateCreated: post.date_created,
                  likedByUser: this.checkUserLike(post.id),
                };
              }),
            })
          )
        )
        .catch((res) => this.setState({ error: res.error }));
    }
  };

  handlePostLike = (e) => {
    e.preventDefault();
    const jwt = TokenService.getAuthToken();
    if (jwt) {
      let base64Url = jwt.split(".")[1];
      let decodedValue = JSON.parse(window.atob(base64Url));
      let post_id = e.target.value;

      ContentApiService.postLike(post_id, decodedValue.user_id)
        .then(() => this.props.history.push(`/likes/${decodedValue.user_id}`))
        .catch((res) => this.setState({ error: res.error }));
    }
  };

  handlePhotoSearch = (e) => {
    e.preventDefault();
    const jwt = TokenService.getAuthToken();
    const searchQuery = e.target["searchQuery"].value;
    if (jwt) {
      UnsplashApiService.searchPhotos(searchQuery)
        .then((photos) =>
          this.setState({
            unsplash: photos.map((photo) => {
              return {
                id: photo.id,
                alt_description: photo.alt_description,
                urls: photo.urls,
                img_dwn_link: photo.links.download_location,
                img_photographer: photo.user.name,
                portfolio_url: photo.user.portfolio_url,
              };
            }),
          })
        )
        .then(() => console.log(this.state.unsplash))
        .catch((res) => {
          this.setState({ error: res.error });
        });
    }
  };

  renderPhotoList = () => {
    const photos = this.state.unsplash;

    return (
      <>
        {photos.map((photo, idx) => (
          <label className="photoThumb" key={idx}>
            <input type="radio" id={idx} name="photoThumb" value={photo.id} />
            <img src={photo.urls.thumb} alt={photo.alt_description} />
          </label>
        ))}
      </>
    );
  };

  renderPostList = () => {
    const posts = this.state.posts;

    return (
      <>
        {posts.map((post, idx) => (
          <div
            style={{
              backgroundImage: `url(${post.img_url})`,
              backgroundRepeat: "no-repeat",
            }}
            className="postItem"
            key={idx}
          >
            <h4>{post.title}</h4>
            <p>{post.content}</p>
            <span>{post.dateCreated}</span>
            {!post.likedByUser ? (
              <button onClick={this.handlePostLike} value={post.id}>
                Like
              </button>
            ) : (
              <button disabled>Like</button>
            )}
            <hr />
          </div>
        ))}
      </>
    );
  };

  render() {
    return (
      <section className="postPage">
        {TokenService.getAuthToken() ? (
          <button onClick={this.handlePostClick}>Whisper Something</button>
        ) : (
          <button onClick={this.handlePostClick} disabled>
            Whisper Something
          </button>
        )}
        {this.state.posting ? (
          <>
            <form className="photoSearch" onSubmit={this.handlePhotoSearch}>
              <input
                type="text"
                name="searchQuery"
                placeolder="Search for Background"
              />
              <button type="submit">Search</button>
            </form>
            <form className="postForm" onSubmit={this.handlePostSubmit}>
              {this.renderPhotoList()}
              <label htmlFor="title">Title:</label>
              <input type="text" name="title" />
              <label htmlFor="content">Whisper:</label>
              <textarea name="content" />
              <button type="submit">Submit</button>
              <button type="reset" onClick={this.handleCancelCLick}>
                Cancel
              </button>
            </form>
          </>
        ) : (
          <></>
        )}
        <article className="postList">{this.renderPostList()}</article>
      </section>
    );
  }
}
