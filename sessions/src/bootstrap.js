import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import { configureStore } from "./store";
import App from "./components/App";

const MICROFRONTEND_SESSIONS = "microfrontend-sessions";

function cleanupCacheOnbeforeUnload() {
  const prevOnbeforeunload = window.onunload;

  window.onbeforeunload = () => {
    window.localStorage.removeItem(MICROFRONTEND_SESSIONS);
    prevOnbeforeunload?.();

    return null;
  };
}

function mount(
  el,
  { onNavigate, history = createMemoryHistory(), reactiveValues } = {}
) {
  const initialState = JSON.parse(
    window.localStorage.getItem(MICROFRONTEND_SESSIONS)
  );
  const store = configureStore({
    ...initialState,
    viewer: {
      ...initialState?.viewer,
      username: reactiveValues?.username?.() || initialState?.viewer?.username,
    },
  });

  const cleanups = [
    () => {
      window.localStorage.setItem(
        MICROFRONTEND_SESSIONS,
        JSON.stringify(store.getState())
      );
    },
    reactiveValues.username?.listen((username) => {
      store.dispatch({ type: "UPDATE_USERNAME", username });
    }),
  ];

  if (onNavigate) cleanups.push(history.listen((e) => onNavigate(e.pathname)));
  if (el) ReactDOM.render(<App history={history} store={store} />, el);

  cleanupCacheOnbeforeUnload();

  return {
    onParentNavigate: (pathname) => {
      const currentPathname = history.location.pathname;
      if (currentPathname !== pathname) history.push(pathname);
    },
    unmount: () => {
      console.log("aaa unmount");
      cleanups.forEach((cleanup) => cleanup());
      ReactDOM.unmountComponentAtNode(el);
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
