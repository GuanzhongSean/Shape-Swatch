// local imports
import View from "./view";
import { ShapeView } from "./shapeView";
import { Align, Model, ShapeProps } from "./model";

import "./editView.css";

export class EditView implements View {
  //#region observer pattern

  update() {
    const focus = document.activeElement?.getAttribute("id");
    this.container.replaceChildren();
    this.hue1Div.replaceChildren();
    this.hue1Div.appendChild(this.hueLabel);
    this.hue1Div.appendChild(this.hue);
    if (this.model.selectedNum == 0) {
      this.label.innerText = "Select One";
      this.container.appendChild(this.label);
    } else if (this.model.selectedNum == 1) {
      this.sp = this.model.oneSelected();

      this.display.replaceChildren();
      let sv = new ShapeView(this.model, this.sp, true);
      this.display.appendChild(sv.root);
      this.container.appendChild(this.display);

      this.form.replaceChildren();
      this.hue.value = String(this.sp.hue1);
      this.hue2.value = String(this.sp.hue2);
      this.radius.value = String(this.sp.radius);
      this.points.value = String(this.sp.points);
      this.rings.value = String(this.sp.rings);
      this.look.value = this.sp.look;
      switch (this.sp.type) {
        case "Square":
          this.form.appendChild(this.hue1Div);
          break;
        case "Star":
          this.form.appendChild(this.hue1Div);
          this.form.appendChild(this.pointsDiv);
          this.form.appendChild(this.radiusDiv);
          break;
        case "Bullseye":
          this.hue1Div.replaceChildren();
          this.hue1Div.appendChild(this.hue1Label);
          this.hue1Div.appendChild(this.hue);
          this.form.appendChild(this.hue1Div);
          this.form.appendChild(this.hue2Div);
          this.form.appendChild(this.ringsDiv);
          break;
        case "Cat":
          this.form.appendChild(this.hue1Div);
          this.form.appendChild(this.lookDiv);
          break;
      }
      this.container.appendChild(this.form);
      if (focus) {
        const elementToFocus = document.getElementById(focus);
        if (elementToFocus) elementToFocus.focus();
      }
    } else {
      this.label.innerText = "Too Many Selected";
      this.container.appendChild(this.label);
    }
  }

  //#endregion

  private display = document.createElement("div");
  private form = document.createElement("div");
  private label = document.createElement("label");

  private hue = document.createElement("input");
  private hueLabel = document.createElement("label");
  private hue1Label = document.createElement("label");
  private hue1Div = document.createElement("div");
  private hue2 = document.createElement("input");
  private hue2Label = document.createElement("label");
  private hue2Div = document.createElement("div");
  private radius = document.createElement("input");
  private radiusLabel = document.createElement("label");
  private radiusDiv = document.createElement("div");
  private points = document.createElement("input");
  private pointsLabel = document.createElement("label");
  private pointsDiv = document.createElement("div");
  private rings = document.createElement("input");
  private ringsLabel = document.createElement("label");
  private ringsDiv = document.createElement("div");
  private look = document.createElement("select");
  private lookLabel = document.createElement("label");
  private lookDiv = document.createElement("div");
  private sp: ShapeProps = {} as ShapeProps;

  // the view root container
  private container: HTMLDivElement;
  get root(): HTMLDivElement {
    return this.container;
  }

  constructor(private model: Model) {
    // setup the view root container
    this.container = document.createElement("div");
    this.container.id = "edit";

    this.display.id = "display";
    this.form.id = "form";

    this.hue.type = "number";
    this.hue.min = "0";
    this.hue.max = "360";
    this.hue.id = "hue";
    this.hue.required = true;
    this.hue.classList.add("input");
    this.hue.addEventListener("input", () => {
      if (this.hue.value == "") return;
      if (this.hue.validity.valid) {
        this.sp.hue1 = Number(this.hue.value);
        model.edit(this.sp);
      }
    });
    this.hue2.type = "number";
    this.hue2.min = "0";
    this.hue2.max = "360";
    this.hue2.id = "hue2";
    this.hue2.required = true;
    this.hue2.classList.add("input");
    this.hue2.addEventListener("input", () => {
      if (this.hue2.value == "") return;
      if (this.hue2.validity.valid) {
        this.sp.hue2 = Number(this.hue2.value);
        model.edit(this.sp);
      }
    });
    this.radius.type = "number";
    this.radius.min = "20";
    this.radius.max = "45";
    this.radius.id = "radius";
    this.radius.required = true;
    this.radius.classList.add("input");
    this.radius.addEventListener("input", () => {
      if (this.radius.validity.valid) {
        this.sp.radius = Number(this.radius.value);
        model.edit(this.sp);
      }
    });
    this.points.type = "number";
    this.points.min = "3";
    this.points.max = "10";
    this.points.id = "points";
    this.points.required = true;
    this.points.classList.add("input");
    this.points.addEventListener("input", () => {
      if (this.points.validity.valid) {
        this.sp.points = Number(this.points.value);
        model.edit(this.sp);
      }
    });
    this.rings.type = "number";
    this.rings.min = "2";
    this.rings.max = "5";
    this.rings.id = "rings";
    this.rings.required = true;
    this.rings.classList.add("input");
    this.rings.addEventListener("input", () => {
      if (this.rings.validity.valid) {
        this.sp.rings = Number(this.rings.value);
        model.edit(this.sp);
      }
    });
    this.look.add(new Option("left", "left"));
    this.look.add(new Option("center", "center"));
    this.look.add(new Option("right", "right"));
    this.look.id = "look";
    this.look.required = true;
    this.look.classList.add("input");
    this.look.addEventListener("change", () => {
      if (this.look.validity.valid) {
        this.sp.look = this.look.value as Align;
        model.edit(this.sp);
      }
    });

    this.hueLabel.innerText = "Hue";
    this.hue1Label.innerText = "Hue1";
    this.hue2Label.innerText = "Hue2";
    this.radiusLabel.innerText = "Radius";
    this.pointsLabel.innerText = "Points";
    this.ringsLabel.innerText = "Rings";
    this.lookLabel.innerText = "Look";

    this.hue1Div.classList.add("field");
    this.hue1Div.appendChild(this.hueLabel);
    this.hue1Div.appendChild(this.hue);

    this.hue2Div.classList.add("field");
    this.hue2Div.appendChild(this.hue2Label);
    this.hue2Div.appendChild(this.hue2);

    this.pointsDiv.classList.add("field");
    this.pointsDiv.appendChild(this.pointsLabel);
    this.pointsDiv.appendChild(this.points);

    this.radiusDiv.classList.add("field");
    this.radiusDiv.appendChild(this.radiusLabel);
    this.radiusDiv.appendChild(this.radius);

    this.ringsDiv.classList.add("field");
    this.ringsDiv.appendChild(this.ringsLabel);
    this.ringsDiv.appendChild(this.rings);

    this.lookDiv.classList.add("field");
    this.lookDiv.appendChild(this.lookLabel);
    this.lookDiv.appendChild(this.look);

    // register with the model
    this.model.addObserver(this);
  }
}
