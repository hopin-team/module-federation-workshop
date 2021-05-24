import * as gen from "txtgen";

const root = document.getElementById("root-chat");

const h1 = document.createElement("h1");
h1.append("What attendees are saying");

const ul = document.createElement("ul");
for (let index = 0; index < 5; index++) {
  const li = document.createElement("li");
  li.innerText = gen.sentence();
  ul.append(li);
}

root.append(h1);
root.append(ul);
