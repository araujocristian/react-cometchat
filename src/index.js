import React from "react";
import ReactDOM from "react-dom";
import { CometChat } from "@cometchat-pro/chat";
import App from "./pages/App";
import config from "./config";

CometChat.init(config.appID);

ReactDOM.render(<App />, document.getElementById("root"));
