import ReactDOM from "react-dom";
// import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./components/App";

function mount(
  el,
  //{ onNavigate, history = createMemoryHistory(), shareState = () => {} } = {}
  { shareValue = () => {} } = {}
) {
  // const cleanups = [];
  // if (onNavigate) cleanups.push(history.listen((e) => onNavigate(e.pathname)));
  if (el)
    ReactDOM.render(<App history={history} shareValue={shareValue} />, el);

  return {
    // onParentNavigate: (pathname) => {
    //   const currentPathname = history.location.pathname;
    //   if (currentPathname !== pathname) history.push(pathname);
    // },
    unmount: () => {
      // cleanups.forEach((cleanup) => cleanup());
      ReactDOM.unmountComponentAtNode(el);
    },
  };
}

if (process.env.NODE_ENV === "development" && typeof document !== "undefined") {
  const el = document.getElementById("root-profile-dev");
  if (el) {
    mount(el, { history: createBrowserHistory() });
  }
}

export default mount;
