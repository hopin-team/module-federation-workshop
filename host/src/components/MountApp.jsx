import { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function MountApp({ mount }) {
  const ref = useRef();
  const history = useHistory();

  useEffect(() => {
    const { onHostNavigate } = mount(ref.current, {
      onNavigate: (nextPathname) => {
        const { pathname } = history.location;
        if (pathname != nextPathname) history.push(nextPathname);
      },
    });

    return history.listen((e) => onHostNavigate(e.pathname));
  }, [ref.current]);

  return <div ref={ref} />;
}
