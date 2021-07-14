import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./components/App";
import { createPusherConnector, createAblyConnector } from "nextjs/Connectors";

function pusherConnector(set, context) {
  console.log("test1 ✅ reception connected to Pusher");
  return createPusherConnector({
    channelId: "my-channel",
    eventId: "my-event",
    pusher: context.pusher,
    set,
  });
}

function ablyConnector(set, context) {
  console.log("test1 ✅ reception connected to Ably");
  return createAblyConnector({
    channelId: "channel-test1",
    eventId: "event-test1",
    ably: context.ably,
    set,
  });
}

async function initialiser() {
  const response = await fetch(`http://localhost:8889/api/viewer`);
  const json = await response.json();
  return json.username;
}

async function mount(
  el,
  { onNavigate, history = createMemoryHistory(), reactiveMap } = {}
) {
  const reactiveItem = reactiveMap.item("username", { initialiser });
  const cleanups = [
    reactiveItem.connect(pusherConnector),
    reactiveItem.connect(ablyConnector),
  ];
  if (onNavigate) cleanups.push(history.listen((e) => onNavigate(e.pathname)));
  if (el)
    ReactDOM.render(<App history={history} reactiveMap={reactiveMap} />, el);

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
