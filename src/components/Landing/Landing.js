import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Landing.css";

export default class Landing extends Component {
  render() {
    return (
      <section>
        <div className="boxDiv landDiv">
          <h2>Welcome to Whispers</h2>
          <p>
            Click the big round button that says "Begin" to see the whispers
            that have been posted. You can then sign up for your own account or
            use the username and password here in the git hub readme. Click the
            button that says "Whisper Something" to make a post. Tell us
            something you have never told anyone before. It could be anything,
            its all up to you. Post it here as a whisper, a secret that your
            telling the community in confidence. You don't need to silently
            carry these burdens, we are here for you.
          </p>
          <h3>A few guidelines</h3>
          <ol>
            <li>NO HATE SPEECH! We care about everyone, except for racists.</li>
            <li>
              Trigger Warnings! Please preface your whisper with a trigger
              warning if it contains violence or traumatic events.
            </li>
            <li>
              Point Of No Return! Once you post, its posted and you cannot
              remove it or edit it. If you would like to remove it, contact us
              and we are happy to help in exchange of blacklisting your email
              for LIFE.
            </li>
          </ol>
          <p>
            Violation of these guidelines leads to suspensions and/or blacklist
            reviewed on a case by case basis. If you folks play nice, I'll think
            about adding a comments feature. Trust goes both ways.
          </p>
          <div className="bigCircle">
            <Link className="enterBtn" to="/posts">
              <div className="enter">
                <h1>Begin</h1>
              </div>
            </Link>
          </div>
        </div>
      </section>
    );
  }
}
