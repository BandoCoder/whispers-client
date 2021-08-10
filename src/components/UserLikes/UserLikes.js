import React, { Component } from "react";
import ContentApiService from "../../services/content-api-service";
import TokenService from "../../services/token-service";
import moment from "moment";
import { ScaleLoader } from "react-spinners";
import { css } from "@emotion/react";
import "./UserLikes.css";

//Styles for loader
const override = css`
  display: flex;
  width: fit-content;
  justify-content: center;
  margin: auto;
  height: 300px;
  padding-top: 70px;
`;

export default class Likes extends Component {
  state = {
    posts: [],
    error: null,
    loading: true,
  };

  //GET posts liked by user and put them into state
  componentDidMount() {
    const jwt = TokenService.getAuthToken();
    if (jwt) {
      let base64Url = jwt.split(".")[1];
      let decodedValue = JSON.parse(window.atob(base64Url));

      if (decodedValue.user_id !== this.props.match.params.user_id) {
        this.props.history.push(`/likes/${decodedValue.user_id}`);
      }
      ContentApiService.getUserLikes(decodedValue.user_id)
        .then((posts) =>
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
        )
        .then(() => {
          this.setState({ loading: false });
        })
        .catch((res) => {
          this.setState({ error: res.error, loading: false });
        });
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
    const { loading, error } = this.state;
    return (
      <section className="postPage">
        <h2 className="subHeads">Your Likes</h2>{" "}
        <ScaleLoader
          className="postList"
          loading={loading}
          css={override}
          size={70}
          color="grey"
        />
        <article className="postList">{this.renderPostList()}</article>
        <div role="alert">
          <p>{error}</p>
        </div>
      </section>
    );
  }
}
