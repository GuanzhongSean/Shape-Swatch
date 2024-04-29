// local imports
import View from "./view";
import { Model } from "./model";
import { ShapeView } from "./shapeView";

import "./listView.css";

export class ListView implements View {
  //#region observer pattern

  update(): void {
    this.container.replaceChildren();
    this.model.all().forEach((s, i) => {
      let sv = new ShapeView(this.model, s);
      sv.root.addEventListener("click", (e) => {
        this.model.select(i);
        e.stopPropagation();
      });
      this.container.appendChild(sv.root);
    });
    this.model.allSelected().forEach((n) => {
      this.container.children[n].classList.add("selected");
    });
  }

  //#endregion

  // the view root container
  private container: HTMLDivElement;
  get root(): HTMLDivElement {
    return this.container;
  }

  constructor(private model: Model) {
    // setup the view root container
    this.container = document.createElement("div");
    this.container.id = "list";
    this.container.addEventListener("click", () => {
      if (model.selectedNum) model.clearSelected();
    });
    // register with the model
    this.model.addObserver(this);
  }
}
