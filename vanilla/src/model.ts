import { Subject } from "./observer";
import { Command, UndoManager } from "./undo";

export type Shape = "Square" | "Star" | "Bullseye" | "Cat";
export type Align = "center" | "left" | "right";

export type ShapeProps = {
  type: Shape;
  hue1: number;
  hue2: number;
  radius: number;
  points: number;
  rings: number;
  look: Align;
};

export class Model extends Subject {
  //#region undo manager
  private shapes: ShapeProps[] = [];
  private selected: number[] = [];
  private _shift: boolean = false;
  private undoManager = new UndoManager();
  type: Shape = "Square";

  constructor() {
    super();
    for (let i = 0; i < 8; i++) this.add(true);
  }
  get num() {
    return this.shapes.length;
  }
  get selectedNum() {
    return this.selected.length;
  }
  get shift() {
    return this._shift;
  }
  set shift(s: boolean) {
    this._shift = s;
    this.notifyObservers();
  }

  undo() {
    this.undoManager.undo();
    this.notifyObservers();
  }

  redo() {
    this.undoManager.redo();
    this.notifyObservers();
  }

  add(init = false) {
    let type = this.type;
    let looks: Align[] = ["center", "left", "right"];
    let hue1 = Math.floor(Math.random() * 360);
    let hue2 = Math.floor(Math.random() * 360);
    let radius = Math.floor(Math.random() * 25) + 20;
    let points = Math.floor(Math.random() * 7) + 3;
    let rings = Math.floor(Math.random() * 3) + 2;
    let look = looks[Math.floor(Math.random() * 3)];
    this.shapes.push({
      type: type,
      hue1: hue1,
      hue2: hue2,
      radius: radius,
      points: points,
      rings: rings,
      look: look,
    });
    if (!init)
      this.undoManager.execute({
        do: () => {
          this.shapes.push({
            type: type,
            hue1: hue1,
            hue2: hue2,
            radius: radius,
            points: points,
            rings: rings,
            look: look,
          });
        },
        undo: () => {
          this.selected = this.selected.filter(
            (i) => i != this.shapes.length - 1
          );
          this.shapes = this.shapes.slice(0, -1);
        },
      } as Command);
    this.notifyObservers();
  }

  delete() {
    let prev_shapes = this.all();
    let prev_selected = this.allSelected();
    this.undoManager.execute({
      do: () => {
        this.shapes = this.shapes.filter((_, i) => !this.selected.includes(i));
        this.selected.length = 0;
      },
      undo: () => {
        this.shapes = [...prev_shapes];
        this.selected = [...prev_selected];
      },
    } as Command);
    this.shapes = this.shapes.filter((_, i) => !this.selected.includes(i));
    this.selected.length = 0;
    this.notifyObservers();
  }

  clear() {
    let prev_shapes = this.all();
    let prev_selected = this.allSelected();
    this.undoManager.execute({
      do: () => {
        this.shapes.length = 0;
        this.selected.length = 0;
      },
      undo: () => {
        this.shapes = [...prev_shapes];
        this.selected = [...prev_selected];
      },
    } as Command);
    this.shapes.length = 0;
    this.selected.length = 0;
    this.notifyObservers();
  }

  clearSelected() {
    this.selected.length = 0;
    this.notifyObservers();
  }

  all(): ShapeProps[] {
    return [...this.shapes];
  }

  allSelected(): number[] {
    return [...this.selected];
  }

  oneSelected(): ShapeProps {
    return Object.assign({}, this.shapes[this.selected[0]]);
  }

  select(i: number) {
    if (this.selected.includes(i)) {
      this.selected = this.selected.filter((s) => s != i);
    } else {
      if (this._shift) {
        this.selected.push(i);
      } else {
        this.selected = [i];
      }
    }
    this.notifyObservers();
  }

  edit(sp: ShapeProps) {
    let selected = this.allSelected();
    let prev = this.all();
    this.shapes[this.selected[0]] = sp;
    let cur = this.all();
    this.undoManager.execute({
      do: () => {
        this.shapes = [...cur];
        this.selected = [...selected];
      },
      undo: () => {
        this.shapes = [...prev];
        this.selected = [...selected];
      },
    } as Command);
    this.notifyObservers();
  }
}
