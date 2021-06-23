import { ReactiveMapProvider } from "../components/ReactReactiveMap";
import Nav from "../components/Nav";
import { ReactiveMap } from "../components/ReactiveMap";

const reactiveMap = new ReactiveMap();

function Application({ Component, pageProps }) {
  return (
    <ReactiveMapProvider reactiveMap={reactiveMap}>
      <Nav />
      <Component {...pageProps} />
    </ReactiveMapProvider>
  );
}

export default Application;
