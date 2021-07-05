import ReactDOM from "react-dom";
import App from "./components/App";

function mount(el, { reactiveMapGet, appIndex } = {}) {
  ReactDOM.render(
    <App reactiveMapGet={reactiveMapGet} appIndex={appIndex} />,
    el
  );
  return () => ReactDOM.unmountComponentAtNode(el);
}

if (process.env.NODE_ENV === "development") {
  const el = document.getElementById("root-remote-dev");
  if (el) {
    mount(el);
  }
}

export default mount;
