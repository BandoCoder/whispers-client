import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Posts from "./Posts";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Posts />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
