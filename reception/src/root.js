import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
// import { ReactiveMapProvider } from "nextjs2/ReactReactiveMap";
import { ReactiveMapProvider } from "./components/CopyOfReactReactiveMap";

// TODO replace this with an import from fe-library
const fakeReactiveMap = {
  item: () => ({
    connect: () => {},
    get: () => {},
    set: () => {},
    listen: () => {},
  }),
};

export function Root({
  children,
  reactiveMap = fakeReactiveMap,
  history = createMemoryHistory(),
}) {
  return (
    <ReactiveMapProvider reactiveMap={reactiveMap}>
      <Router history={history}>{children}</Router>
    </ReactiveMapProvider>
  );
}
