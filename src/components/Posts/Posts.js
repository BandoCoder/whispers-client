import React, { Component } from "react";
import ContentApiService from "../../services/content-api-service";
import TokenService from "../../services/token-service";
import "./Posts.css";

export default class Posts extends Component {
  state = {
    posts: [],
    posting: false,
    error: null,
  };

  componentDidMount() {
    ContentApiService.getPosts()
      .then((posts) =>
        this.setState({
          posts: posts.map((post) => {
            return {
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
          <form>
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
