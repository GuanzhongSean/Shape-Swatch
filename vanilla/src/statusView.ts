// local imports
import View from "./view";
import { Model } from "./model";

import "./statusView.css";

export class StatusView implements View {
  //#region observer pattern

  update(): void {
    this.num.innerText = `${this.model.num} Shapes${
      this.model.num == 25 ? " FULL" : ""
    }`;
    this.numSelected.innerText = `${this.model.shift ? "SHIFT " : ""}Selected ${
      this.model.selectedNum
    }`;
  }

  //#endregion

  // the view root container
  private container: HTMLDivElement;
  get root(): HTMLDivElement {
    return this.container;
  }

  private num = document.createElement("label");
  private numSelected = document.createElement("label");

  constructor(private model: Model) {
    // setup the view root container
    this.container = document.createElement("div");
    this.container.id = "status";

    // then setup the widgets in the container
    this.num.innerText = "? Shapes";
    this.num.id = "num";
    this.numSelected.innerText = "Selected ?";
    this.numSelected.id = "numSelected";
    this.container.appendChild(this.num);
    this.container.appendChild(this.numSelected);

    // register with the model
    this.model.addObserver(this);
  }
}
