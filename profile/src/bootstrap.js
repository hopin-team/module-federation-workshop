import ReactDOM from "react-dom";
import App from "./components/App";

function mount(el, { reactiveMapGet } = {}) {
  if (el)
    ReactDOM.render(
      <App history={history} reactiveMapGet={reactiveMapGet} />,
      el
    );
  return {
    unmount: () => {
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
