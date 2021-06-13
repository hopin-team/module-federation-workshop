import { useRef, useEffect } from "react";
// import { useHistory } from "react-router-dom";

export default function MountMF({ mount }) {
  const ref = useRef();

  useEffect(() => {
    mount(ref.current);
  }, [ref.current]);

  return <div ref={ref} />;
}
