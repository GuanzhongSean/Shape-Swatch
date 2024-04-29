import { Display } from "./Display";
import { EditForm } from "./EditForm";
import { numSelected } from "./state";

export default function Edit() {
  return (
    <div class="flex-1 max-w-[33%] m-2.5 p-2.5 border border-gray-500 flex justify-center items-center flex-col gap-2.5">
      {numSelected.value == 0 && <label>Select One</label>}
      {numSelected.value == 1 && (
        <>
          <Display></Display>
          <EditForm></EditForm>
        </>
      )}
      {numSelected.value > 1 && <label>Too Many Selected</label>}
    </div>
  );
}
