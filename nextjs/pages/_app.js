import { ReactiveMapProvider } from "../components/ReactReactiveMap";
import { ScopedMapProvider, ScopedMap } from "../components/ScopedMap";
import Nav from "../components/Nav";
import { ReactiveMap } from "../components/ReactiveMap";

const reactiveMap = new ReactiveMap();
const scopedMap = new ScopedMap();

function Application({ Component, pageProps }) {
  return (
    <ScopedMapProvider scopedMap={scopedMap}>
      <ReactiveMapProvider reactiveMap={reactiveMap}>
        <Nav />
        <Component {...pageProps} />
      </ReactiveMapProvider>
    </ScopedMapProvider>
  );
}

export default Application;
