import * as gen from "txtgen";

const video = document.createElement("video");
video.setAttribute("controls", true);
video.setAttribute("width", "100%");
video.setAttribute(
  "src",
  // thanks Mozilla for the video example
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
);
const root = document.getElementById("root-stage");
root.append(video);
root.append(`Title: ${gen.sentence()}`);
