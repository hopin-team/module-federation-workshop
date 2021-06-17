import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./components/App";

function mount(
  el,
  { pathname, onNavigate, history = createMemoryHistory() } = {}
) {
  if (pathname) history.push(pathname);
  if (onNavigate) history.listen((e) => onNavigate(e.pathname));
  if (el) ReactDOM.render(<App history={history} />, el);

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
    mount(root, { history: createBrowserHistory() });
  }
}

export default mount;
