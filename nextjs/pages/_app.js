import ReactiveSetProvider from "../components/ReactReactiveMap";
import Nav from "../components/Nav";
import { ReactiveMap } from "../components/ReactiveMap";

const reactiveMap = new ReactiveMap();

function Application({ Component, pageProps }) {
  return (
    <ReactiveSetProvider reactiveMap={reactiveMap}>
      <Nav />
      <Component {...pageProps} />
    </ReactiveSetProvider>
  );
}

export default Application;
