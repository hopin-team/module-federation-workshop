import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";

async function loadModule(scope, module) {
  // Initializes the share scope. This fills it with known provided modules from this build and all remotes
  await __webpack_init_sharing__("default");

  const container = window[scope];
  // Initialize the container, it may provide shared modules
  await container.init(__webpack_share_scopes__.default);
  const factory = await window[scope].get(module);
  const Module = factory();
  return Module;
}

function MountMF({ mount }) {
  const ref = useRef();
  const router = useRouter();

  useEffect(() => {
    const { unmount } = mount(ref.current, {
      onNavigate: (pathname) => {
        if (router.pathname !== pathname) {
          router.push(pathname, undefined, {
            shallow: true,
          });
        }
      },
    });

    return unmount;
  }, [ref.current]);

  return <div ref={ref} />;
}

const useDynamicScript = (args) => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (!args.url) {
      return;
    }

    const element = document.createElement("script");

    element.src = args.url;
    element.type = "text/javascript";
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = () => {
      console.log(`Dynamic Script Loaded: ${args.url}`);
      setReady(true);
    };

    element.onerror = () => {
      console.error(`Dynamic Script Error: ${args.url}`);
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      console.log(`Dynamic Script Removed: ${args.url}`);
      document.head.removeChild(element);
    };
  }, [args.url]);

  return {
    ready,
    failed,
  };
};

export default React.memo(function LoadWebpackMF(props) {
  if (typeof window === "undefined") return null;

  const { ready, failed } = useDynamicScript({
    url: props?.url,
  });
  const [state, setState] = useState();

  const key = props.url + props.module + props.scope;
  window.__DYNAMIC_IMPORTS = window.__DYNAMIC_IMPORTS || {};

  useEffect(() => {
    ready &&
      loadModule(props.scope, props.module).then(({ default: mount }) => {
        window.__DYNAMIC_IMPORTS[key] = mount;
        setState((state) => !state);
        // setState(() => mount);
      });
  }, [ready, key]);
  // }, [ready]);

  const mount = window.__DYNAMIC_IMPORTS[key];
  if (mount) {
    //if (state) {
    return <MountMF mount={mount} />;
    //return <MountMF mount={state} />;
  }

  const LoadingComponent = props.loadingComponent || (() => "...");

  return <LoadingComponent />;
});
