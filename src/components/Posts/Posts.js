import React, { Component } from "react";
import moment from "moment";
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

  //Check likes for user
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

  //Inital api calls (if logged in disable like button for posts liked by user, if logged out do not check)
  componentDidMount() {
    const jwt = TokenService.getAuthToken();

    //Logged in
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
        .catch((res) => this.setState({ error: res.error.message }));

      //Logged out
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
                likedByUser: false,
              };
            }),
          })
        )
        .catch((res) => {
          this.setState({ error: res.error.message });
        });
    }
  }

  //Open the for to make a whisper
  handlePostClick = (e) => {
    e.preventDefault();
    if (this.state.posting) {
      this.handleCancelCLick(e);
      this.setState({ posting: false });
    } else {
      this.setState({
        posting: true,
      });
    }
  };

  //Cancel by closing the form and resetting the form
  handleCancelCLick = (e) => {
    e.preventDefault();
    document.getElementById("photoSearch").reset();
    document.getElementById("post").reset();
    this.setState({
      posting: false,
      unsplash: [],
    });
  };

  //Submit post to api
  handlePostSubmit = (e) => {
    e.preventDefault();
    const jwt = TokenService.getAuthToken();
    if (jwt) {
      let base64Url = jwt.split(".")[1];
      let decodedValue = JSON.parse(window.atob(base64Url));
      const selectedImage = this.state.unsplash.find(
        (img) => img.id === e.target["photoThumb"].value
      );
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
      this.setState({ posting: false });
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

        //Close and reset the form
        .then(() => {
          this.setState({ unsplash: [] });
          document.getElementById("photoSearch").reset();
          document.getElementById("post").reset();
        })
        .catch((res) => this.setState({ error: res.message }));
    }
  };

  //Post a like to the api
  handlePostLike = (e) => {
    e.preventDefault();
    const jwt = TokenService.getAuthToken();
    if (jwt) {
      let base64Url = jwt.split(".")[1];
      let decodedValue = JSON.parse(window.atob(base64Url));
      let post_id = e.target.value;

      ContentApiService.postLike(post_id, decodedValue.user_id)
        .then(() => this.props.history.push(`/likes/${decodedValue.user_id}`))
        .catch((res) => this.setState({ error: res.error.message }));
    }
  };

  //Search unsplash for a background photo
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
        .catch((res) => {
          this.setState({ error: res.error.message });
        });
    }
  };

  //Unsplash Search Results
  renderPhotoList = () => {
    const photos = this.state.unsplash;

    return (
      <div className="photoChoice">
        {photos.map((photo, idx) => (
          <label className="photoThumb" key={idx}>
            <input type="radio" id={idx} name="photoThumb" value={photo.id} />
            <img src={photo.urls.thumb} alt={photo.alt_description} />
          </label>
        ))}
      </div>
    );
  };

  //Post list
  renderPostList = () => {
    const posts = this.state.posts;

    return (
      <>
        {posts.map((post, idx) => (
          <div
            style={{
              backgroundImage: `url(${post.img_url})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="postItem"
            key={idx}
          >
            <div className="postInfo">
              <h4>{post.title}</h4>
              <p>{post.content}</p>
              <div className="postFoot">
                <span>
                  {moment(post.dateCreated).format("MMM Do YYYY, h:mm a")}
                </span>
                {!post.likedByUser ? (
                  <button
                    className="likeBtn"
                    onClick={this.handlePostLike}
                    value={post.id}
                  >
                    Like
                  </button>
                ) : (
                  <button className="likeBtn" disabled>
                    Like
                  </button>
                )}
              </div>
            </div>
            <div className="creditBox">
              <span className="credits">
                Photo by:{" "}
                <a href={post.portfolio_url}>{post.img_photographer}</a> on{" "}
                <a href={"https://unsplash.com/"}>Unsplash</a>
              </span>
            </div>
          </div>
        ))}
      </>
    );
  };

  render() {
    return (
      <section className="postPage">
        <div className="landDiv postDiv">
          <div className="buttonDiv">
            {TokenService.getAuthToken() ? (
              <button className="whisperButton" onClick={this.handlePostClick}>
                Whisper Something
              </button>
            ) : (
              <button
                className="whisperButton"
                onClick={this.handlePostClick}
                disabled
              >
                Whisper Something
              </button>
            )}
          </div>
          {this.state.posting ? (
            <section className="postForm">
              <div className="darkDiv">
                <form
                  className="photoSearch"
                  id="photoSearch"
                  onSubmit={this.handlePhotoSearch}
                >
                  <p className="infoSpan">
                    Use the search bar to look for a good background photo,
                    enter a title, then enter the secret you would like to
                    whisper.
                  </p>
                  <label className="label" htmlFor="searchQuery">
                    Search for a background
                  </label>
                  <input
                    type="text"
                    className="textInput"
                    name="searchQuery"
                    placeolder="Search for Background"
                    autoFocus
                  />
                  <button className="btn" type="submit">
                    Search
                  </button>
                </form>
                <form
                  className="post"
                  id="post"
                  onSubmit={this.handlePostSubmit}
                >
                  {this.renderPhotoList()}
                  <label className="label" htmlFor="title">
                    Title
                  </label>
                  <input type="text" className="textInput" name="title" />
                  <label className="label" htmlFor="content">
                    Whisper
                  </label>
                  <textarea name="content" />
                  <button className="btn" type="submit">
                    Submit
                  </button>
                  <button
                    className="btn"
                    type="reset"
                    onClick={this.handleCancelCLick}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </section>
          ) : (
            <></>
          )}
          <article className="postList">{this.renderPostList()}</article>
        </div>
      </section>
    );
  }
}
