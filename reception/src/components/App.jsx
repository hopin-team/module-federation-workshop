import Schedule from "receptionNanos/Schedule";
import Sponsors from "receptionNanos/Sponsors";
import { Router } from "react-router-dom";
import { ReactiveMapProvider } from "./CopyOfReactReactiveMap";
// 🔥 TODO disable importing from outside ../src
import Hello from "../../nanos/schedule/src/Hello";

export default function App({ reactiveMap, history }) {
  return (
    <ReactiveMapProvider reactiveMap={reactiveMap}>
      <Router history={history}>
        <Hello />
        <Schedule />
        <Sponsors />
      </Router>
    </ReactiveMapProvider>
  );
}
