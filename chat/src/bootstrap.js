import ReactDOM from "react-dom";
import App from "./components/App";

function mount(el) {
  if (el) ReactDOM.render(<App />, el);

  return {
    unmount: () => {
      ReactDOM.unmountComponentAtNode(el);
    },
  };
}

if (process.env.NODE_ENV === "development") {
  const el = document.getElementById("root-chat-dev");
  if (el) {
    mount(el);
  }
}

export default mount;
