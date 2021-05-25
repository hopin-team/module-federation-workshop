// import * as gen from "txtgen";
import ReactDOM from "react-dom";
import { createMemoryHistory } from "history";
import App from "./components/App";

function mount(el, { onNavigate, history = createMemoryHistory() }) {
  if (onNavigate) history.listen((e) => onNavigate(e.pathname));
  if (el) ReactDOM.render(<App />, el);
}

if (process.env.NODE_ENV === "development") {
  const root = document.getElementById("root-sessions-dev");
  if (root) {
    mount(root);
  }
}

export default mount;
