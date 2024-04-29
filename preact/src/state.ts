import { computed, signal } from "@preact/signals";
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

export type State = {
  shapes: ShapeProps[];
  selected: number[];
};

//#region state

export const shapes = signal<ShapeProps[]>(
  [...Array(8)].map(() => randomShape())
);
export const selected = signal<number[]>([]);
export const num = computed(() => shapes.value.length);
export const numSelected = computed(() => selected.value.length);
export let type: Shape = "Square";

export const shift = signal<boolean>(false);
const undoManager = new UndoManager();
export const undo = () => undoManager.undo();
export const canUndo = signal<boolean>(false);
export const redo = () => undoManager.redo();
export const canRedo = signal<boolean>(false);

function randomShape(type: Shape = "Square"): ShapeProps {
  let looks: Align[] = ["center", "left", "right"];
  let hue1 = Math.floor(Math.random() * 360);
  let hue2 = Math.floor(Math.random() * 360);
  let radius = Math.floor(Math.random() * 25) + 20;
  let points = Math.floor(Math.random() * 7) + 3;
  let rings = Math.floor(Math.random() * 3) + 2;
  let look = looks[Math.floor(Math.random() * 3)];
  return {
    type: type,
    hue1: hue1,
    hue2: hue2,
    radius: radius,
    points: points,
    rings: rings,
    look: look,
  };
}

export const addShape = () => {
  const sp = randomShape(type);
  undoManager.execute({
    do: () => {
      shapes.value = [...shapes.value, sp];
    },
    undo: () => {
      selected.value = selected.value.filter((i) => i != num.value - 1);
      shapes.value = shapes.value.slice(0, -1);
    },
  } as Command);
  shapes.value = [...shapes.value, sp];
};

export const setType = (t: Shape) => (type = t);

export const deleteSelected = () => {
  const prev_shapes = [...shapes.value];
  const prev_selected = [...selected.value];
  const s = selected.value;
  undoManager.execute({
    do: () => {
      shapes.value = shapes.value.filter((_, i) => !s.includes(i));
      selected.value = [];
    },
    undo: () => {
      selected.value = prev_selected;
      shapes.value = prev_shapes;
    },
  } as Command);
  shapes.value = shapes.value.filter((_, i) => !s.includes(i));
  selected.value = [];
};

export const clearShapes = () => {
  const prev_shapes = [...shapes.value];
  const prev_selected = [...selected.value];
  undoManager.execute({
    do: () => {
      shapes.value = [];
      selected.value = [];
    },
    undo: () => {
      selected.value = prev_selected;
      shapes.value = prev_shapes;
    },
  } as Command);
  shapes.value = [];
  selected.value = [];
};

export const select = (i: number) => {
  if (selected.value.includes(i)) {
    selected.value = selected.value.filter((s) => s != i);
  } else {
    if (shift.value) {
      selected.value = [...selected.value, i];
    } else {
      selected.value = [i];
    }
  }
};

export const edit = (sp: ShapeProps) => {
  const prev_shapes = [...shapes.value];
  const prev_selected = [...selected.value];
  shapes.value[selected.value[0]] = sp;
  const cur_shapes = [...shapes.value];
  undoManager.execute({
    do: () => {
      selected.value = [...prev_selected];
      shapes.value = [...cur_shapes];
    },
    undo: () => {
      selected.value = [...prev_selected];
      shapes.value = [...prev_shapes];
    },
  } as Command);
  shapes.value = [...shapes.value];
};

export const oneSelect = computed(() => shapes.value[selected.value[0]]);

export const clearSelected = () => {
  selected.value = [];
};

//#endregion
