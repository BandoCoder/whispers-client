import React, { Component } from "react";
import ContentApiService from "../../services/content-api-service";
import TokenService from "../../services/token-service";
import "./UserPosts.css";

export default class Posts extends Component {
  state = {
    posts: [],
    error: null,
  };

  componentDidMount() {
    const jwt = TokenService.getAuthToken();
    if (jwt) {
      let base64Url = jwt.split(".")[1];
      let decodedValue = JSON.parse(window.atob(base64Url));

      if (decodedValue.user_id !== this.props.match.params.user_id) {
        this.props.history.push(`/posts/${decodedValue.user_id}`);
      }
      ContentApiService.getUserPosts(decodedValue.user_id).then((posts) =>
        this.setState({
          posts: posts.map((post) => {
            return {
              title: post.title,
              content: post.content,
              img_url: post.img_url,
              img_photographer: post.img_photographer,
              portfolio_url: post.portfolio_url,
              img_dwn_link: post.img_dwn_link,
              img_alt: post.img_alt,
              dateCreated: post.date_created,
            };
          }),
        })
      );
    }
  }

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
          </div>
        ))}
      </>
    );
  };
  render() {
    return (
      <section className="postPage">
        <article className="postList">{this.renderPostList()}</article>
      </section>
    );
  }
}
