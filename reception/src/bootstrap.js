import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
// import { ReactiveMap } from "nextjs2/ReactiveMap";
import App from "./components/App";
import { Root } from "./root";

async function initialiser() {
  const response = await fetch(`http://localhost:8889/api/viewer`);
  const json = await response.json();
  return json.username;
}

const fakeReactiveMap = {
  item: () => ({
    connect: () => {},
    get: () => {},
    set: () => {},
    listen: () => {},
  }),
};

async function mount(
  el,
  {
    onNavigate,
    history = createMemoryHistory(),
    reactiveMap = fakeReactiveMap,
  } = {}
) {
  reactiveMap.item("username", { initialiser });
  const cleanups = [];
  if (onNavigate) cleanups.push(history.listen((e) => onNavigate(e.pathname)));
  if (el)
    ReactDOM.render(
      <Root history={history} reactiveMap={reactiveMap}>
        <App />
      </Root>,
      el
    );

  return {
    onParentNavigate: (pathname) => {
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
  const root = document.getElementById("root-reception-dev");
  if (root) {
    mount(root, { history: createBrowserHistory() });
  }
}

export default mount;
