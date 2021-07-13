import React from "react";
import Link from "./Link";
import LoadNextMF from "./LoadNextMF";

export default function Nav() {
  return (
    <nav>
      <Link href="/">Home</Link> | <Link href="/reception">Reception</Link> |{" "}
      <Link href="/sessions">Sessions</Link> |{" "}
      <LoadNextMF
        url="http://localhost:8883/remoteEntry.js"
        scope="profile"
        module="./App"
      />
    </nav>
  );
}
