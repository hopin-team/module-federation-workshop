import ReactDOM from "react-dom";
import App from "./components/App";
import { createPusherConnector } from "nextjs2/Connectors";

function pusherConnector(set, context = {}) {
  console.log("test1 ✅ profile connected to pusher");
  return createPusherConnector({
    channelId: "my-channel",
    eventId: "my-event",
    pusher: context.pusher,
    set,
  });
}

async function initialiser() {
  const response = await fetch(`http://localhost:8889/api/viewer`);
  const json = await response.json();
  return json.username;
}

const fakeReactiveMap = {
  item: () => ({
    connect: () => {},
  }),
};

function mount(el, { reactiveMap = fakeReactiveMap } = {}) {
  const reactiveItem = reactiveMap.item("username", { initialiser });
  const cleanups = [
    // reactiveItem.connect(pusherConnector)
  ];

  if (el) ReactDOM.render(<App reactiveMap={reactiveMap} />, el);

  return {
    unmount: () => {
      ReactDOM.unmountComponentAtNode(el);
      cleanups.forEach((cleanup) => cleanup());
    },
  };
}

if (process.env.NODE_ENV === "development" && typeof document !== "undefined") {
  const el = document.getElementById("root-profile-dev");
  if (el) {
    mount(el);
  }
}

export default mount;
