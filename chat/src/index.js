import * as gen from "txtgen";

const ul = document.createElement("ul");
for (let index = 0; index < 5; index++) {
  const li = document.createElement("li");
  li.innerText = gen.sentence();
  ul.append(li);
}

document.getElementById("root-chat").append(ul);
