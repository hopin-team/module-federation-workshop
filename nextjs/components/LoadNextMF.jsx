import React, { useRef, useEffect, useState } from "react";
// import { useRouter } from "next/router";
import Head from "next/head";

// You don't have to change anything in this function
// It's used to load remote containers to a host container dynamically at runtime
// More about this funciton here https://webpack.js.org/concepts/module-federation/#dynamic-remote-containers
async function loadModule(scope, module) {
  await __webpack_init_sharing__("default");
  const container = window[scope];
  await container.init(__webpack_share_scopes__.default);
  const factory = await window[scope].get(module);
  return factory();
}

// You don't have to change anything in this function
function useDynamicScript({ url }) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!url) {
      return;
    }

    const element = document.createElement("script");

    element.src = url;
    element.type = "text/javascript";
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = () => setReady(true);

    element.onerror = () => {
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      document.head.removeChild(element);
    };
  }, [url]);

  return {
    ready,
    failed,
  };
}

function MountMF({ mount }) {
  const ref = useRef();

  useEffect(() => {
    const { unmount } = mount(ref.current);

    return unmount;
  }, [ref.current, mount]);

  return <div ref={ref} />;
}

export default function LoadNextMF({
  url,
  scope,
  module,
  errorComponent: ErrorComponent = () => "There was an error",
  loadingComponent: LoadingComponent = () => "...",
}) {
  const { ready: scriptReady, failed: scriptFailed } = useDynamicScript({
    url,
  });
  const [moduleFailed, setModuleFailed] = useState(false);
  const [mount, setMount] = useState();

  useEffect(() => {
    if (scriptReady && !mount) {
      loadModule(scope, module)
        .then(({ default: mountFn }) => {
          setMount(() => mountFn);
        })
        .catch(() => {
          setModuleFailed(true);
        });
    }
  }, [scriptReady, module, scope]);

  const children = mount ? (
    <MountMF mount={mount} />
  ) : scriptFailed || moduleFailed ? (
    <ErrorComponent />
  ) : (
    <LoadingComponent />
  );

  return (
    <>
      <Head>
        <link rel="preload" as="script" href={url} />
      </Head>
      {children}
    </>
  );
}
