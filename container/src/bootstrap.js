import mountStage from "stage/StageIndex";
import mountChat from "chat/ChatIndex";

const title = document.createElement("h1");
title.append("Event app");
document.getElementById("root-container").prepend(title);

mountChat(document.getElementById("root-chat"));
mountStage(document.getElementById("root-stage"));
