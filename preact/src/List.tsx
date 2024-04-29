import { ListShape } from "./Shape";

import * as State from "./state";

export default function List() {
  const handleClick = () => State.clearSelected();
  return (
    <div
      class="bg-white flex-wrap flex-1 overflow-y-scroll gap-[20px] p-[20px] flex content-start"
      onClick={handleClick}
    >
      {State.shapes.value.map((sp, i) => (
        <ListShape sp={sp} i={i} selected={State.selected.value.includes(i)} />
      ))}
    </div>
  );
}
