import mountSessions from "sessions/App";
import mountChat from "chat/App";

const title = document.createElement("h1");
title.append("Event app");
document.getElementById("root-host").prepend(title);

mountChat(document.getElementById("root-chat"));
mountSessions(document.getElementById("root-sessions"));
