import { Model } from "./model";
import { ToolView } from "./toolView";
import { ListView } from "./listView";
import { EditView } from "./editView";
import { StatusView } from "./statusView";

import "./main.css";

const model = new Model();

// root container (the div already in index.html)
const root = document.querySelector("div#app") as HTMLDivElement;

// create div to hold left-side views
const left = document.createElement("div");
left.id = "left";

// add views to left (will be stacked vertically)
left.appendChild(new ToolView(model).root);
left.appendChild(new ListView(model).root);
left.appendChild(new StatusView(model).root);

// add views to root (will be left and right areas)
root.appendChild(left);
root.appendChild(new EditView(model).root);

document.addEventListener("keydown", (ke) => {
  switch (ke.key) {
    case "Shift":
      if (model.shift) break;
      model.shift = true;
      break;
    case "z":
      if (ke.ctrlKey) model.undo();
      break;
    case "Z":
      if (ke.ctrlKey) model.redo();
      break;
  }
});

document.addEventListener("keyup", (ke) => {
  switch (ke.key) {
    case "Shift":
      model.shift = false;
      break;
  }
});
