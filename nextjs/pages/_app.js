import MFDataLayer from "../components/MFDataLayer";

function Application({ Component, pageProps }) {
  return (
    <MFDataLayer>
      <Component {...pageProps} />
    </MFDataLayer>
  );
}

export default Application;
