import React from "react";
import Link from "./Link";
import LoadNextMF from "./LoadNextMF";
import { useMFState } from "./MFProvider";

export default function Nav() {
  const {
    shareState,
    state: { username },
  } = useMFState();

  return (
    <nav>
      <Link href="/">Home</Link> | <Link href="/reception">Reception</Link> |{" "}
      <Link href="/sessions">Sessions</Link> | <Link href="/expo">Expo</Link> |{" "}
      <LoadNextMF
        url="http://localhost:8883/remoteEntry.js"
        scope="profile"
        module="./App"
        // ❌ never create a function because it changes the identity of the prop and cases unnecessary renrenders of the MF.
        //dispatchUsername={(username) => setUsername(username)}
      />
    </nav>
  );
}

// 5- When user closes tab it should clear all the stored state
