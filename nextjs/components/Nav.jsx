import React from "react";
import Link from "./Link";

export default function Nav() {
  return (
    <nav>
      <Link href="/">Home</Link> | <Link href="/reception">Reception</Link> |{" "}
      <Link href="/sessions">Sessions</Link> |{" "}
      <Link href="/sessions/1">Session 1</Link> | <Link href="/expo">Expo</Link>
      | <Link href="/expo/1">Expo 1</Link>
    </nav>
  );
}
