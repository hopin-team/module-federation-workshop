import "stage/StageIndex";
import mount from "chat/ChatIndex";

const title = document.createElement("h1");
title.append("Event app");
document.getElementById("root-container").prepend(title);

mount(document.getElementById("root-chat"));
