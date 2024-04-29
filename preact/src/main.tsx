import { render } from "preact";

import Tool from "./Tool";
import List from "./List";
import Status from "./Status";
import Edit from "./Edit";
import * as State from "./state";

document.addEventListener("keydown", (ke: KeyboardEvent) => {
  switch (ke.key) {
    case "Shift":
      State.shift.value = true;
      break;
    case "z":
      if (ke.ctrlKey) State.undo();
      break;
    case "Z":
      if (ke.ctrlKey) State.redo();
      break;
  }
});

document.addEventListener("keyup", (ke: KeyboardEvent) => {
  switch (ke.key) {
    case "Shift":
      State.shift.value = false;
      break;
  }
});

document.onkeydown = (ke) => {
  if (ke.ctrlKey && (ke.key === "z" || ke.key === "Z")) ke.preventDefault();
};

export default function App() {
  return (
    <>
      <div class="flex-col flex flex-[2]">
        <Tool />
        <List />
        <Status />
      </div>
      <Edit />
    </>
  );
}

render(<App />, document.querySelector("div#app") as Element);
