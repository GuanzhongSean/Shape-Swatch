import { useState, useEffect } from "preact/hooks";
import { oneSelect, edit, Align } from "./state";

export function EditForm() {
  const [sp, setSp] = useState(oneSelect.value);
  useEffect(() => setSp(oneSelect.value), [oneSelect.value]);

  const handleChange = () => setSp({ ...oneSelect.value });
  const handleHue1 = (e: Event) => {
    const el = e.target as HTMLInputElement;
    if (el.value == "") return;
    const hue = Number(el.value);
    setSp({ ...sp, hue1: hue });
    if (el.validity.valid && hue != oneSelect.value.hue1)
      edit({ ...sp, hue1: hue });
  };
  const handleHue2 = (e: Event) => {
    const el = e.target as HTMLInputElement;
    if (el.value == "") return;
    const hue2 = Number(el.value);
    setSp({ ...sp, hue2: hue2 });
    if (el.validity.valid && hue2 != oneSelect.value.hue2)
      edit({ ...sp, hue2: hue2 });
  };
  const handleRadius = (e: Event) => {
    const el = e.target as HTMLInputElement;
    if (el.value == "") return;
    const radius = Number(el.value);
    setSp({ ...sp, radius: radius });
    if (el.validity.valid && radius != oneSelect.value.radius)
      edit({ ...sp, radius: radius });
  };
  const handlePoints = (e: Event) => {
    const el = e.target as HTMLInputElement;
    if (el.value == "") return;
    const points = Number(el.value);
    setSp({ ...sp, points: points });
    if (el.validity.valid && points != oneSelect.value.points)
      edit({ ...sp, points: points });
  };
  const handleRings = (e: Event) => {
    const el = e.target as HTMLInputElement;
    if (el.value == "") return;
    const rings = Number(el.value);
    setSp({ ...sp, rings: rings });
    if (el.validity.valid && rings != oneSelect.value.rings)
      edit({ ...sp, rings: rings });
  };
  const handleLook = (e: Event) => {
    const el = e.target as HTMLInputElement;
    const look = el.value as Align;
    setSp({ ...sp, look: look });
    if (el.validity.valid && look != oneSelect.value.look)
      edit({ ...sp, look: look });
  };
  const formFieldStyle =
    "flex justify-end content-center w-[140px] h-[25px] gap-2.5";

  return (
    <form class="flex-1 border border-gray-500 w-full flex gap-2.5 flex-col p-5">
      <div class={formFieldStyle}>
        <label>{sp.type == "Bullseye" ? "Hue1" : "Hue"}</label>
        <input
          type="number"
          min={0}
          max={360}
          value={sp.hue1}
          onInput={handleHue1}
          onChange={handleChange}
          required
        ></input>
      </div>
      {sp.type == "Bullseye" && (
        <div class={formFieldStyle}>
          <label>Hue2</label>
          <input
            type="number"
            min={0}
            max={360}
            value={sp.hue2}
            onInput={handleHue2}
            onChange={handleChange}
            required
          ></input>
        </div>
      )}
      {sp.type == "Star" && (
        <div class={formFieldStyle}>
          <label>Radius</label>
          <input
            type="number"
            min={20}
            max={45}
            value={sp.radius}
            onInput={handleRadius}
            onChange={handleChange}
            required
          ></input>
        </div>
      )}
      {sp.type == "Star" && (
        <div class={formFieldStyle}>
          <label>Points</label>
          <input
            type="number"
            min={3}
            max={10}
            value={sp.points}
            onInput={handlePoints}
            onChange={handleChange}
            required
          ></input>
        </div>
      )}
      {sp.type == "Bullseye" && (
        <div class={formFieldStyle}>
          <label>Rings</label>
          <input
            type="number"
            min={2}
            max={5}
            value={sp.rings}
            onInput={handleRings}
            onChange={handleChange}
            required
          ></input>
        </div>
      )}
      {sp.type == "Cat" && (
        <div class={formFieldStyle}>
          <label>Look</label>
          <select value={sp.look} onChange={handleLook} required>
            <option>left</option>
            <option>center</option>
            <option>right</option>
          </select>
        </div>
      )}
    </form>
  );
}
