import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import { configureStore } from "./store";
import App from "./components/App";
import "regenerator-runtime";

async function mount(
  el,
  {
    onNavigate,
    history = createMemoryHistory(),
    reactiveMapGet = "TODO new ReactiveMap()",
  } = {}
) {
  const reactiveInitialState = reactiveMapGet("PRIVATE-sessions-initial-state");
  const reactiveUsername = reactiveMapGet("username");
  const [initialState, username] = await Promise.all([
    reactiveInitialState(),
    reactiveUsername(async () => {
      const response = await fetch(`http://localhost:8889/api/viewer`);
      const viewer = await response.json();
      return viewer.username;
    }),
  ]);

  const store = configureStore({
    ...initialState,
    viewer: {
      ...initialState?.viewer,
      username,
    },
  });

  const cleanups = [
    reactiveUsername?.listen(async (reactiveValue) => {
      const username = await reactiveValue;
      store.dispatch({ type: "UPDATE_USERNAME", username });
    }),
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
      reactiveInitialState(store.getState());
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
