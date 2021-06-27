import { ReactiveMapProvider } from "../components/ReactReactiveMap";
import { ScopedMapProvider, ScopedMap } from "../components/ScopedMap";
import Nav from "../components/Nav";
import { MyProjectReactiveMap } from "../components/MyProjectReactiveMap";

const reactiveMap = new MyProjectReactiveMap();
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
