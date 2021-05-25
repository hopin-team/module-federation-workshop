import { useRef, useEffect } from "react";
import mount from "reception/App";

export default function ReceptionApp() {
  const ref = useRef();

  useEffect(() => {
    mount(ref.current);
  }, [ref.current]);

  return <div ref={ref} />;
}
