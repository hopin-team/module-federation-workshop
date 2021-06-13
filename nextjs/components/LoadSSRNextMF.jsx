import React, { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

export default function LoadDynamicNextMF({
  dynamicImport,
  loadingComponent: LoadingComponent = () => "...",
}) {
  const DynamicMF = dynamic(
    async () => {
      const mount = (await dynamicImport()).default;

      return function MountMF() {
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

          //router.events.on("routeChangeStart", onParentNavigate);

          return () => {
            unmount();
            // TODO, does onParentNavigate keep the identity between renders?
            //router.events.off("routeChangeStart", onParentNavigate);
          };
        }, [ref.current]);

        return <div ref={ref} />;
      };
    },
    {
      ssr: false,
      loading: () => <LoadingComponent />,
    }
  );

  return <DynamicMF />;
}
