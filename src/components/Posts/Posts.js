import React, { Component } from "react";
import ContentApiService from "../../services/content-api-service";
import TokenService from "../../services/token-service";
import "./Posts.css";

export default class Posts extends Component {
  state = {
    posts: [],
    likedPosts: [],
    posting: false,
    error: null,
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
        .then(() => console.log(this.state.likedPosts));
    }
    ContentApiService.getPosts()
      .then((posts) =>
        this.setState({
          posts: posts.map((post) => {
            return {
              id: post.id,
              title: post.title,
              content: post.content,
              dateCreated: post.date_created,
            };
          }),
        })
      )
      .catch((res) => {
        this.setState({ error: res.error });
      });
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
      const newPost = {
        title: e.target["title"].value,
        content: e.target["content"].value,
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
                  dateCreated: post.date_created,
                };
              }),
            })
          )
        )
        .catch((res) => this.setState({ error: res.eror }));
    }
  };

  renderPostList = () => {
    const posts = this.state.posts;

    return (
      <>
        {posts.map((post, idx) => (
          <div className="postItem" key={idx}>
            <h4>{post.title}</h4>
            <p>{post.content}</p>
            <span>{post.dateCreated}</span>
            <button>Like</button>
            <button>Report</button>
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
          <form onSubmit={this.handlePostSubmit}>
            <label htmlFor="title">Title:</label>
            <input type="text" name="title" />
            <label htmlFor="content">Whisper:</label>
            <textarea name="content" />
            <button type="submit">Submit</button>
            <button type="reset" onClick={this.handleCancelCLick}>
              Cancel
            </button>
          </form>
        ) : (
          <></>
        )}
        <article className="postList">{this.renderPostList()}</article>
      </section>
    );
  }
}
