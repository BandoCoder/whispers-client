import React, { Component } from "react";
import ContentApiService from "../../services/content-api-service";
import TokenService from "../../services/token-service";
import moment from "moment";
import "./UserPosts.css";

export default class Posts extends Component {
  state = {
    posts: [],
    error: null,
  };

  //GET posts users made and put them into state
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

  //Display the list
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
              <span>
                {moment(post.dateCreated).format("MMM Do YYYY, h:mm a")}
              </span>
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
        <h2 className="subHeads">Your Whispers</h2>
        <article className="postList">{this.renderPostList()}</article>
      </section>
    );
  }
}
