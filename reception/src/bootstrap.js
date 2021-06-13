import ReactDOM from "react-dom";
import App from "./components/App";
import { createMemoryHistory, createBrowserHistory } from "history";

function mount(
  el,
  { onNavigate, pathname, history = createMemoryHistory() } = {}
) {
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
  const root = document.getElementById("root-reception-dev");
  if (root) {
    mount(root, { history: createBrowserHistory() });
  }
}

export default mount;
