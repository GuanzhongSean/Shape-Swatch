import { useRef, useLayoutEffect, useEffect, useState } from "preact/hooks";
import { ShapeProps, select, oneSelect } from "./state";

type ListShapeProp = {
  sp: ShapeProps;
  i: number;
  selected: boolean;
};

export function ListShape({ sp, i, selected }: ListShapeProp) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleClick = (e: Event) => {
    select(i);
    e.stopPropagation();
  };
  useLayoutEffect(() => {
    const gc = canvasRef.current?.getContext("2d");
    if (gc) {
      gc.canvas.width = 100;
      gc.canvas.height = 100;
      draw(gc, sp);
    }
  }, [sp, i, selected]);
  return (
    <div>
      {!selected && (
        <canvas
          class="w-[50px] h-[50px] border border-gray-300
      hover:outline hover:outline-[4px] hover:outline-[#ADD8E6]"
          ref={canvasRef}
          onClick={handleClick}
        ></canvas>
      )}
      {selected && (
        <canvas
          class="w-[50px] h-[50px] border border-gray-300 outline outline-offset-[2px] outline-[1px] outline-[#0000FF]
      hover:outline hover:outline-[4px] hover:outline-offset-0"
          ref={canvasRef}
          onClick={handleClick}
        ></canvas>
      )}
    </div>
  );
}

export function DisplayShape() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [len, setLen] = useState(100);

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      // this should never happen
      const parent = entries[0];
      if (!canvasRef.current) throw new Error("Canvas not found");

      const w = parent.contentRect.width;
      const h = parent.contentRect.height;
      const l = Math.min(w, h);
      // console.log(`ResizeObserver: ${w}, ${h}`);

      if (l != len) setLen(l);
    });

    if (canvasRef.current?.parentElement)
      resizeObserver.observe(canvasRef.current.parentElement);

    return () => resizeObserver.disconnect();
  }, []);

  // drawing
  // (try useEffect and see difference)
  useEffect(() => {
    const gc = canvasRef.current?.getContext("2d");
    if (gc) {
      gc.canvas.width = len;
      gc.canvas.height = len;
      draw(gc, oneSelect.value, true);
    }
  }, [len, oneSelect.value]);
  return <canvas ref={canvasRef}></canvas>;
}

function draw(gc: CanvasRenderingContext2D, sp: ShapeProps, display = false) {
  switch (sp.type) {
    case "Square":
      drawSquare(gc, sp, display);
      break;
    case "Star":
      drawStar(gc, sp);
      break;
    case "Bullseye":
      drawBullseye(gc, sp);
      break;
    case "Cat":
      drawCat(gc, sp);
      break;
  }
}

function drawSquare(
  gc: CanvasRenderingContext2D,
  sp: ShapeProps,
  display: boolean
) {
  gc.save();
  gc.fillStyle = `hsl(${sp.hue1}, 100%, 50%)`;
  gc.fillRect(0, 0, gc.canvas.width, gc.canvas.height);
  if (display) gc.lineWidth = 10;
  gc.strokeRect(0, 0, gc.canvas.width, gc.canvas.height);
  gc.restore();
}

function drawStar(gc: CanvasRenderingContext2D, sp: ShapeProps) {
  gc.save();
  gc.translate(gc.canvas.width / 2, gc.canvas.height / 2);
  gc.fillStyle = `hsl(${sp.hue1}, 100%, 50%)`;
  let scale = gc.canvas.width / 100;
  gc.scale(scale, scale);

  gc.strokeStyle = "black";
  gc.lineWidth = 2;

  gc.beginPath();
  const startAngle: number = -Math.PI / 2;
  for (let i = 0; i < sp.points * 2; i++) {
    const angle: number = startAngle + (Math.PI / sp.points) * i;
    const radius: number = i % 2 === 0 ? sp.radius : 15;
    gc.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
  }
  gc.closePath();

  gc.fill();
  gc.stroke();
  gc.restore();
}

function drawCat(gc: CanvasRenderingContext2D, sp: ShapeProps) {
  gc.save();
  gc.translate(gc.canvas.width / 2, gc.canvas.height / 2);
  let scale = gc.canvas.width / 100;
  gc.scale(scale, scale);

  gc.fillStyle = `hsl(${sp.hue1}, 100%, 50%)`;
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
  if (sp.look === "left") {
    leye -= 3;
    reye -= 3;
  }
  if (sp.look === "right") {
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

function drawBullseye(gc: CanvasRenderingContext2D, sp: ShapeProps) {
  gc.save();
  gc.translate(gc.canvas.width / 2, gc.canvas.height / 2);
  let scale = gc.canvas.width / 100;
  gc.scale(scale, scale);

  gc.strokeStyle = "black";
  gc.lineWidth = 2;

  for (let i = 0; i < sp.rings; i++) {
    let hue = i % 2 === 0 ? sp.hue1 : sp.hue2;
    gc.fillStyle = `hsl(${hue}, 100%, 50%)`;
    const radius: number = (45 * (sp.rings - i)) / sp.rings;
    gc.beginPath();
    gc.arc(0, 0, radius, 0, 2 * Math.PI);
    gc.fill();
    gc.stroke();
  }
  gc.restore();
}
