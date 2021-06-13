import { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function MountApp({ mount }) {
  const ref = useRef();
  const history = useHistory();

  useEffect(() => {
    const { onHostNavigate } = mount(ref.current);

    return history.listen((e) => {
      console.log("aaa", onHostNavigate);
      onHostNavigate(e.pathname);
    });
  }, [ref.current]);

  return <div ref={ref} />;
}
