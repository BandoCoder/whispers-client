import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import UserPosts from "./UserPosts";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <UserPosts />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
