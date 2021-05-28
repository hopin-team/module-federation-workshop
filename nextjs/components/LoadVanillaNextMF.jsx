import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";

function MountSlice({ mount }) {
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

const LoadVanillaNextMF = ({
  dynamicImport,
  loadingComponent: LoadingComponent = () => "...",
}) => {
  const [state, setState] = useState(false);

  if (typeof window === "undefined") return <LoadingComponent />;

  window.__DYNAMIC_IMPORTS = window.__DYNAMIC_IMPORTS || {};
  const key = dynamicImport.toString();

  const mount = window.__DYNAMIC_IMPORTS[key];
  if (mount) {
    return <MountSlice mount={mount} />;
  }

  dynamicImport().then(({ default: mount }) => {
    window.__DYNAMIC_IMPORTS[key] = mount;
    setState(!state);
  });

  return <LoadingComponent />;
};

export default LoadVanillaNextMF;
