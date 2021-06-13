import ReactDOM from "react-dom";
import App from "./components/App";
import mountSessions from "sessions/App";
import mountChat from "chat/App";
import mountReception from "reception/App";

ReactDOM.render(<App />, document.getElementById("root-host"));

mountReception(document.getElementById("root-reception"));
mountChat(document.getElementById("root-chat"));
mountSessions(document.getElementById("root-sessions"));
