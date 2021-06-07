import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import { configureStore } from "./store";
import App from "./components/App";

function mount(el, { onNavigate, history = createMemoryHistory() } = {}) {
  const store = configureStore();

  console.log("aaaaa mount sessions ");
  const cleanups = [
    () => {
      store.getState();
    },
  ];
  if (onNavigate) cleanups.push(history.listen((e) => onNavigate(e.pathname)));
  if (el) ReactDOM.render(<App history={history} store={store} />, el);

  return {
    onParentNavigate: (pathname) => {
      const currentPathname = history.location.pathname;
      if (currentPathname !== pathname) history.push(pathname);
    },
    unmount: () => {
      cleanups.forEach((cleanup) => cleanup());
      ReactDOM.unmountComponentAtNode(el);
    },
    onParentUnmont: () => {
      console.log("aaaaa sessionsonParentUnmount 🍀🍀🍀🍀");
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
