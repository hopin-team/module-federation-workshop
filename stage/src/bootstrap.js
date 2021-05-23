import * as gen from "txtgen";

function mount(el) {
  const video = document.createElement("video");
  video.setAttribute("controls", true);
  video.setAttribute("width", "100%");
  video.setAttribute(
    "src",
    // thanks Mozilla for the video example
    "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  );

  el.append(video);
  el.append(`Title: ${gen.sentence()}`);
}

if (process.env.NODE_ENV === "development") {
  const root = document.getElementById("root-stage-dev");
  if (root) {
    mount(root);
  }
}

export default mount;
