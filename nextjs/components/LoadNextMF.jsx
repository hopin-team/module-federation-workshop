import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
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

const MountMF = React.memo(
  function MountMF({ mount, router, pathname, basename }) {
    const ref = useRef();

    useEffect(() => {
      const { unmount, onHostNavigate } = mount(ref.current, {
        onNavigate: (nextPathname) => {
          const { pathname } = window.location;
          if (pathname !== nextPathname) {
            router.push(nextPathname, undefined, { shallow: true });
          }
        },
        pathname,
        basename,
      });

      router.events.on("routeChangeStart", onHostNavigate);

      return () => {
        router.events.off("routeChangeStart", onHostNavigate);
        unmount();
      };
    }, [ref.current, mount, pathname, basename]);

    return <div ref={ref} />;
  },
  function areEqual(prevProps, nextProps) {
    return Object.keys(prevProps).reduce(
      (acc, key) =>
        (key === "router" || prevProps[key] === nextProps[key]) && acc,
      true
    );
  }
);

export default function LoadNextMF({
  url,
  scope,
  module,
  errorComponent: ErrorComponent = () => "There was an error",
  loadingComponent: LoadingComponent = () => "...",
  pathname,
  basename,
}) {
  const { ready: scriptReady, failed: scriptFailed } = useDynamicScript({
    url,
  });
  const [moduleFailed, setModuleFailed] = useState(false);
  const [mount, setMount] = useState();
  const router = useRouter();

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
    <MountMF
      mount={mount}
      router={router}
      pathname={pathname}
      basename={basename}
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
}
