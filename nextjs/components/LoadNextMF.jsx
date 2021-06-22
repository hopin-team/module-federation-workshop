import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useReactiveMap } from "./ReactReactiveMap";

async function loadModule(scope, module) {
  await __webpack_init_sharing__("default");
  const container = window[scope];
  await container.init(__webpack_share_scopes__.default);
  const factory = await window[scope].get(module);
  return factory();
}

const MountMF = React.memo(
  function MountMF({ mount, router, reactiveSet, reactiveValues, ...rest }) {
    const ref = useRef();
    console.log("aaa MountMF");
    useEffect(() => {
      console.log("aaa useEffect");
      const { unmount } = mount(ref.current, {
        ...rest,
        onNavigate: (pathname) => {
          if (router.pathname !== pathname) {
            router.push(pathname, undefined, {
              shallow: true,
            });
          }
        },
        reactiveSet,
        reactiveValues,
      });

      return unmount;
    }, [...Object.values(rest), ref.current, mount]);

    return <div ref={ref} style={{ display: "inline" }} />;
  },
  function areEqual(prevProps, nextProps) {
    return Object.keys(prevProps).reduce(
      (acc, key) =>
        (key === "router" ||
          key === "reactiveValues" ||
          // key === "reactiveSet" ||
          prevProps[key] === nextProps[key]) &&
        acc,
      true
    );
  }
);

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

export default React.memo(function LoadNextMF({
  url,
  module,
  scope,
  errorComponent: ErrorComponent = () => "There was an error",
  loadingComponent: LoadingComponent = () => "...",
  reactiveKeys,
}) {
  const router = useRouter();
  const { ready: scriptReady, failed: scriptFailed } = useDynamicScript({
    url,
  });
  const [mount, setMount] = useState();
  const [moduleFailed, setModuleFailed] = useState(false);
  const { reactiveValues, reactiveSet } = useReactiveMap(reactiveKeys);

  useEffect(() => {
    if (scriptReady && !mount) {
      loadModule(scope, module)
        .then(({ default: mountFn }) => {
          setMount(() => mountFn);
        })
        .catch(() => setModuleFailed(true));
    }
  }, [scriptReady, module, scope]);

  const children = mount ? (
    <MountMF
      mount={mount}
      router={router}
      reactiveValues={reactiveValues}
      reactiveSet={reactiveSet}
    />
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
});
