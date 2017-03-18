import React from "react";
import ReactDOM from "react-dom";
import Layout from "./Layout";

const mount = document.createElement("div");

ReactDOM.render(<Layout/>, mount);

document.body.appendChild(mount);
