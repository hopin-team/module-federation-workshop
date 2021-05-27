import React from "react";
import Link from "./Link";

export default function Nav() {
  return (
    <nav>
      <Link href="/">Home</Link> | <Link href="/reception">Reception</Link> |{" "}
      <Link href="/sessions">Sessions</Link>
    </nav>
  );
}
