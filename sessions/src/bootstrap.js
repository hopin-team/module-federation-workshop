import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import { configureStore } from "./store";
import App from "./components/App";
import "regenerator-runtime";

const INITIAL_STATE_KEY = "sessions-initial-state";
async function fetchInitialValue() {
  const response = await fetch(`http://localhost:8889/api/viewer`);
  const json = await response.json();
  return json.username;
}

function mount(
  el,
  {
    onNavigate,
    history = createMemoryHistory(),
    reactiveMapGet = "🔥🔥🔥🔥 TODO new MyProjectReactiveMap() 🔥🔥🔥🔥",
    scopedMap = new Map(),
  } = {}
) {
  const initialState = scopedMap.get(INITIAL_STATE_KEY);
  const reactiveUsername = reactiveMapGet("username", { fetchInitialValue });

  const store = configureStore({
    ...initialState,
    viewer: {
      ...initialState?.viewer,
    },
  });

  const cleanups = [
    reactiveUsername?.listen((username) => {
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
      scopedMap.set(INITIAL_STATE_KEY, store.getState());
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
