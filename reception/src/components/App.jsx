// import { createContext, useContext } from "react";
import { Router } from "react-router-dom";
import { ReactiveMapProvider } from "nextjs/ReactReactiveMap";
import Schedule from "./Schedule";

export default function App({ history, reactiveMap }) {
  return (
    <ReactiveMapProvider reactiveMap={reactiveMap}>
      <Router history={history}>
        <Schedule />
      </Router>
    </ReactiveMapProvider>
  );
}
