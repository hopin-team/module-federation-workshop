import ReactDOM from "react-dom";
import App from "./components/App";
import { createMemoryHistory } from "history";

function mount(el, { onNavigate, pathname } = {}) {
  const history = createMemoryHistory();

  if (pathname) history.push(pathname);
  if (el) ReactDOM.render(<App history={history} />, el);
  if (onNavigate) history.listen((e) => onNavigate(e.pathname));

  return {
    onHostNavigate: (nextPathname) => {
      const { pathname } = history.location;
      if (nextPathname !== pathname) history.push(nextPathname);
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
