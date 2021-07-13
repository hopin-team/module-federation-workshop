// import { createContext, useContext } from "react";
import { Router } from "react-router-dom";
import { ReactiveMapGetProvider } from "nextjs/ReactReactiveMap";
import Schedule from "./Schedule";

export default function App({ history, reactiveMapGet }) {
  return (
    <ReactiveMapGetProvider reactiveMapGet={reactiveMapGet}>
      <Router history={history}>
        <Schedule />
      </Router>
    </ReactiveMapGetProvider>
  );
}
