// local imports
import View from "./view";
import { Model, ShapeProps } from "./model";

import "./shapeView.css";

export class ShapeView implements View {
  //#region observer pattern

  update(): void {}

  //#endregion

  canvas = document.createElement("canvas");

  // the view root container
  private container: HTMLDivElement;
  get root(): HTMLDivElement {
    return this.container;
  }

  constructor(
    private model: Model,
    private sp: ShapeProps,
    private display = false
  ) {
    // setup the view root container
    this.container = document.createElement("div");
    this.container.className = "shape";

    this.canvas.width = 50;
    this.canvas.height = 50;
    if (this.display) {
      window.addEventListener("resize", () => {
        let len = Math.min(
          this.container.offsetWidth,
          this.container.offsetHeight
        );
        this.canvas.width = this.canvas.height = len;
        this.draw();
      });
      window.requestAnimationFrame(() => {
        let len = Math.min(
          this.container.offsetWidth,
          this.container.offsetHeight
        );
        this.canvas.width = this.canvas.height = len;
        this.draw();
      });
    }
    this.draw();
    this.container.appendChild(this.canvas);
    // register with the model
    this.model.addObserver(this);
  }

  draw() {
    let gc = this.canvas.getContext("2d");
    switch (this.sp.type) {
      case "Square":
        if (gc) this.drawSquare(gc);
        break;
      case "Star":
        if (gc) this.drawStar(gc);
        break;
      case "Bullseye":
        if (gc) this.drawBullseye(gc);
        break;
      case "Cat":
        if (gc) this.drawCat(gc);
        break;
    }
  }

  drawSquare(gc: CanvasRenderingContext2D) {
    gc.save();
    gc.fillStyle = `hsl(${this.sp.hue1}, 100%, 50%)`;
    if (this.display) gc.lineWidth = 10;
    gc.fillRect(0, 0, this.canvas.width, this.canvas.height);
    gc.strokeRect(0, 0, this.canvas.width, this.canvas.height);
    gc.restore();
  }

  drawStar(gc: CanvasRenderingContext2D) {
    gc.save();
    gc.translate(this.canvas.width / 2, this.canvas.height / 2);
    gc.fillStyle = `hsl(${this.sp.hue1}, 100%, 50%)`;
    let scale = this.canvas.width / 100;
    gc.scale(scale, scale);

    gc.strokeStyle = "black";
    gc.lineWidth = 2;

    gc.beginPath();
    const startAngle: number = -Math.PI / 2;
    for (let i = 0; i < this.sp.points * 2; i++) {
      const angle: number = startAngle + (Math.PI / this.sp.points) * i;
      const radius: number = i % 2 === 0 ? this.sp.radius : 15;
      gc.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
    }
    gc.closePath();

    gc.fill();
    gc.stroke();
    gc.restore();
  }

  drawCat(gc: CanvasRenderingContext2D) {
    gc.save();
    gc.translate(this.canvas.width / 2, this.canvas.height / 2);
    let scale = this.canvas.width / 100;
    gc.scale(scale, scale);

    gc.fillStyle = `hsl(${this.sp.hue1}, 100%, 50%)`;
    gc.strokeStyle = "white";
    gc.lineWidth = 8;

    // head white outline
    gc.beginPath();
    gc.arc(0, 0, 40, 0, 2 * Math.PI);
    gc.stroke();

    // ears
    gc.beginPath();
    // left
    gc.moveTo(-40, -48);
    gc.lineTo(-8, -36);
    gc.lineTo(-35, -14);
    gc.closePath();
    // right
    gc.moveTo(40, -48);
    gc.lineTo(8, -36);
    gc.lineTo(35, -14);
    gc.closePath();
    gc.stroke();
    gc.fill();

    // head
    gc.beginPath();
    gc.arc(0, 0, 40, 0, 2 * Math.PI);
    gc.fill();

    // whites of eyes
    gc.strokeStyle = "black";
    gc.fillStyle = "white";
    gc.lineWidth = 1;
    gc.beginPath();
    // left
    gc.ellipse(-16, -9, 8, 14, 0, 0, Math.PI * 2);
    gc.fill();
    gc.stroke();
    // right
    gc.beginPath();
    gc.ellipse(16, -9, 8, 14, 0, 0, Math.PI * 2);
    gc.fill();
    gc.stroke();

    // eyeballs
    gc.fillStyle = "black";
    gc.beginPath();
    let leye = -16;
    let reye = 16;
    if (this.sp.look === "left") {
      leye -= 3;
      reye -= 3;
    }
    if (this.sp.look === "right") {
      leye += 3;
      reye += 3;
    }
    // left
    gc.arc(leye, -9, 5, 0, Math.PI * 2);
    gc.fill();
    // right
    gc.beginPath();
    gc.arc(reye, -9, 5, 0, Math.PI * 2);
    gc.closePath();
    gc.fill();

    gc.restore();
  }

  drawBullseye(gc: CanvasRenderingContext2D) {
    gc.save();
    gc.translate(this.canvas.width / 2, this.canvas.height / 2);
    let scale = this.canvas.width / 100;
    gc.scale(scale, scale);

    gc.strokeStyle = "black";
    gc.lineWidth = 2;

    for (let i = 0; i < this.sp.rings; i++) {
      let hue = i % 2 === 0 ? this.sp.hue1 : this.sp.hue2;
      gc.fillStyle = `hsl(${hue}, 100%, 50%)`;
      const radius: number = (45 * (this.sp.rings - i)) / this.sp.rings;
      gc.beginPath();
      gc.arc(0, 0, radius, 0, 2 * Math.PI);
      gc.fill();
      gc.stroke();
    }
    gc.restore();
  }
}
