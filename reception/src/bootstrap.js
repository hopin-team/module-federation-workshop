// import * as gen from "txtgen";
import ReactDOM from "react-dom";
import App from "./components/App";

function mount(el) {
  ReactDOM.render(<App />, el);
}

if (process.env.NODE_ENV === "development") {
  const root = document.getElementById("root-reception-dev");
  if (root) {
    mount(root);
  }
}

export default mount;