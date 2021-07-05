import { useRef, useEffect, memo } from "react";
import mount from "remote/App";

export default memo(function RemoteApp({ reactiveMapGet, appIndex }) {
  const ref = useRef();

  useEffect(() => {
    return mount(ref.current, { reactiveMapGet, appIndex });
  }, [ref.current]);

  return <div style={{ flex: 1, display: "flex" }} ref={ref} />;
});
