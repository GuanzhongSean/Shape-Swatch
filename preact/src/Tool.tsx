import * as State from "./state";

export default function Tool() {
  const handleAdd = () => State.addShape();
  const handleTypeChange = (e: Event) => {
    const select = e.currentTarget as HTMLSelectElement;
    State.setType(select.value as State.Shape);
  };
  const handleDelete = () => State.deleteSelected();
  const handleClear = () => State.clearShapes();

  return (
    <div class="h-[50px] bg-neutral-300 flex gap-2.5 p-2.5 items-center">
      <button
        onClick={handleAdd}
        disabled={State.num.value == 25 ? true : false}
      >
        Add
      </button>
      <select class="w-[85px]" onChange={handleTypeChange} value={State.type}>
        <option selected>Square</option>
        <option>Star</option>
        <option>Bullseye</option>
        <option>Cat</option>
      </select>
      <button
        onClick={handleDelete}
        disabled={State.numSelected.value == 0 ? true : false}
      >
        Delete
      </button>
      <button
        onClick={handleClear}
        disabled={State.num.value == 0 ? true : false}
      >
        Clear
      </button>
    </div>
  );
}
