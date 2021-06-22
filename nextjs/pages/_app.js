import ReactiveSetProvider from "../components/ReactReactiveMap";
import Nav from "../components/Nav";

function Application({ Component, pageProps }) {
  return (
    <ReactiveSetProvider>
      <Nav />
      <Component {...pageProps} />
    </ReactiveSetProvider>
  );
}

export default Application;
