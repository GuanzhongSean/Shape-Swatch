import { canRedo, canUndo } from "./state";

export interface Command {
  do(): void;
  undo(): void;
}

export class UndoManager {
  undoStack: Command[] = [];
  redoStack: Command[] = [];

  constructor() {}

  execute(command: Command) {
    this.undoStack.push(command);
    this.redoStack = [];
    console.log(this.toString());
    this.update();
  }

  undo() {
    const command = this.undoStack.pop();
    if (command) {
      this.redoStack.push(command);
      command.undo();
    }
    console.log(this.toString());
    this.update();
  }

  redo() {
    const command = this.redoStack.pop();
    if (command) {
      this.undoStack.push(command);
      command.do();
    }
    console.log(this.toString());
    this.update();
  }

  update() {
    if (this.undoStack.length > 0) canUndo.value = true;
    else canUndo.value = false;
    if (this.redoStack.length > 0) canRedo.value = true;
    else canRedo.value = false;
  }

  toString() {
    return `undoStack: ${this.undoStack.length}, redoStack: ${this.redoStack.length}`;
  }
}
