import { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function MountMF({ mount }) {
  const ref = useRef();
  const history = useHistory();
  const { pathname } = history.location;

  useEffect(() => {
    const { onHostNavigate } = mount(ref.current, {
      onNavigate: (nextPathname) => {
        if (pathname != nextPathname) history.push(nextPathname);
      },
      pathname,
    });

    return history.listen((e) => onHostNavigate?.(e.pathname));
  }, [ref.current]);

  return <div ref={ref} />;
}
