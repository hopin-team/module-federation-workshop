import MFProvider from "../components/MFProvider";

function Application({ Component, pageProps }) {
  return (
    <MFProvider>
      <Component {...pageProps} />
    </MFProvider>
  );
}

export default Application;
