import * as State from "./state";

export default function Status() {
  return (
    <div class="h-[50px] bg-neutral-300 flex gap-2.5 p-2.5 items-center">
      <label class="flex-1">
        {State.num} Shapes{State.num.value == 25 ? " FULL" : ""}
      </label>
      <button
        onClick={() => {
          State.undo();
        }}
        disabled={!State.canUndo.value}
      >
        Undo
      </button>
      <button
        onClick={() => {
          State.redo();
        }}
        disabled={!State.canRedo.value}
      >
        Redo
      </button>
      <label class="flex flex-1 justify-end">
        {State.shift.value ? "SHIFT " : ""}Selected {State.numSelected}
      </label>
    </div>
  );
}
