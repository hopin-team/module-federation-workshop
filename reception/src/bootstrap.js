import ReactDOM from "react-dom";
import { createMemoryHistory } from "history";
import App from "./components/App";

function mount(el) {
  const history = createMemoryHistory();
  if (el) ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate: (pathname) => {
      history.push(pathname);
    },
  };
}

if (process.env.NODE_ENV === "development") {
  const root = document.getElementById("root-reception-dev");
  if (root) {
    mount(root);
  }
}

export default mount;
