import ReactDOM from "react-dom";
import App from "./components/App";
import { createMemoryHistory } from "history";

function mount(el, { onNavigate } = {}) {
  const history = createMemoryHistory();

  if (el) ReactDOM.render(<App history={history} />, el);
  if (onNavigate) history.listen((e) => onNavigate(e.pathname));

  return {
    onHostNavigate: (pathname) => {
      const currentPathname = history.location.pathname;
      if (currentPathname !== pathname) history.push(pathname);
    },
  };
}

if (process.env.NODE_ENV === "development") {
  const root = document.getElementById("root-sessions-dev");
  if (root) {
    mount(root);
  }
}

export default mount;
