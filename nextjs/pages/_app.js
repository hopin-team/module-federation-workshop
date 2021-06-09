import MFProvider from "../components/MFProvider";
import Nav from "../components/Nav";

function Application({ Component, pageProps }) {
  return (
    <MFProvider>
      <Nav />
      <Component {...pageProps} />
    </MFProvider>
  );
}

export default Application;
