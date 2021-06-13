import ReactDOM from "react-dom";
import { createMemoryHistory } from "history";
import App from "./components/App";

function mount(el, { pathname } = {}) {
  const history = createMemoryHistory();

  if (pathname) history.push(pathname);
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
    mount(root);
  }
}

export default mount;
