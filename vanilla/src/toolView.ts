// local imports
import View from "./view";
import { Model, Shape } from "./model";

import "./toolView.css";

export class ToolView implements View {
  //#region observer pattern

  update(): void {
    this.add.disabled = false;
    this.delete.disabled = true;
    this.clear.disabled = true;
    if (this.model.num == 25) this.add.disabled = true;
    if (this.model.num > 0) this.clear.disabled = false;
    if (this.model.selectedNum > 0) this.delete.disabled = false;
  }

  //#endregion

  // the view root container
  private container: HTMLDivElement;
  get root(): HTMLDivElement {
    return this.container;
  }

  private add: HTMLButtonElement;
  private shapeMenu: HTMLSelectElement;
  private delete: HTMLButtonElement;
  private clear: HTMLButtonElement;

  constructor(private model: Model) {
    // setup the view root container
    this.container = document.createElement("div");
    this.container.id = "tool";

    this.add = document.createElement("button");
    this.add.innerText = "Add";
    this.add.addEventListener("click", () => model.add());
    this.container.appendChild(this.add);

    this.shapeMenu = document.createElement("select");
    this.shapeMenu.id = "shapeMenu";
    this.shapeMenu.add(new Option("Square", "Square"));
    this.shapeMenu.add(new Option("Star", "Star"));
    this.shapeMenu.add(new Option("Bullseye", "Bullseye"));
    this.shapeMenu.add(new Option("Cat", "Cat"));
    this.shapeMenu.value = "Square";
    this.shapeMenu.addEventListener(
      "change",
      () => (model.type = this.shapeMenu.value as Shape)
    );
    this.container.appendChild(this.shapeMenu);

    this.delete = document.createElement("button");
    this.delete.innerText = "Delete";
    this.delete.addEventListener("click", () => model.delete());
    this.container.appendChild(this.delete);

    this.clear = document.createElement("button");
    this.clear.innerText = "Clear";
    this.clear.addEventListener("click", () => model.clear());
    this.container.appendChild(this.clear);

    // register with the model
    this.model.addObserver(this);
  }
}
