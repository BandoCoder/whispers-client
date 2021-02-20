import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import UserLikes from "./UserLikes";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <UserLikes />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
