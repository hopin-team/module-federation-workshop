import ReactDOM from "react-dom";
import { createMemoryHistory } from "history";
import App from "./components/App";

function mount(el, { onNavigate } = {}) {
  const history = createMemoryHistory();
  if (onNavigate) {
    history.listen((e) => onNavigate(e.pathname));
  }
  if (el) ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate: (pathname) => {
      const currentPathname = history.location.pathname;
      if (currentPathname !== pathname) history.push(pathname);
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
