import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./components/App";

function mount(
  el,
  { onNavigate, history = createMemoryHistory(), basename = "/expo", path } = {}
) {
  const cleanups = [];
  const initialPath = path || basename;

  if (onNavigate) cleanups.push(history.listen((e) => onNavigate(e.pathname)));
  if (initialPath) history.push(initialPath);
  if (el) ReactDOM.render(<App history={history} basename={basename} />, el);

  return {
    onHostNavigate: (pathname) => {
      const currentPathname = history.location.pathname;
      if (currentPathname !== pathname) history.push(pathname);
    },
    unmount: () => {
      cleanups.forEach((cleanup) => cleanup());
      ReactDOM.unmountComponentAtNode(el);
    },
  };
}

if (process.env.NODE_ENV === "development") {
  const root = document.getElementById("root-expo-dev");
  if (root) {
    mount(root, { history: createBrowserHistory() });
  }
}

export default mount;
