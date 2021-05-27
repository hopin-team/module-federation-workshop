import React, { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const LoadNextSlice = ({
  dynamicImport,
  loadingComponent: LoadingComponent = () => "...",
}) => {
  const DynamicSlice = dynamic(
    async () => {
      const mount = (await dynamicImport()).default;

      return function MountSlice() {
        const ref = useRef();
        const router = useRouter();

        useEffect(() => {
          const { onParentNavigate, unmount } = mount(ref.current, {
            onNavigate: (pathname) => {
              if (router.pathname !== pathname)
                router.push(pathname, undefined, {
                  shallow: true,
                });
            },
          });

          // Do I need this?
          router.events.on("routeChangeStart", onParentNavigate);

          return () => {
            unmount();
            // TODO, does onParentNavigate keep the identity between renders?
            router.events.off("routeChangeStart", onParentNavigate);
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

  return <DynamicSlice />;
};

export default LoadNextSlice;
