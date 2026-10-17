import { useCallback, useEffect, useRef } from "react";
import { LuEraser } from "react-icons/lu";

type Point = [number, number];
type Stroke = { points: Point[] };

// Everything is stored in "design units" in a 2.2 x 1 box, then scaled to fit
// the canvas, so drawings stay put when the window is resized.
const DESIGN_WIDTH = 2.2;
const DESIGN_HEIGHT = 1;
const LINE_WIDTH = 0.01;

// Small seeded random so the starter doodle is identical on every load
const seeded = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// Each shape is a few strokes drawn in a unit box centered on (0, 0)
const circlePoints = (
  cx: number,
  cy: number,
  r: number,
  turns = 1.08,
): Point[] =>
  Array.from({ length: 29 }, (_, i) => {
    const a = -2 + (i / 28) * turns * Math.PI * 2;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  });

// Points along (part of) an ellipse, angles in radians
const ellipse = (
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  from = 0,
  to = Math.PI * 2,
  steps = 24,
): Point[] =>
  Array.from({ length: steps + 1 }, (_, i): Point => {
    const a = from + (i / steps) * (to - from);
    return [cx + Math.cos(a) * rx, cy + Math.sin(a) * ry];
  });

const shapes: Record<string, () => Point[][]> = {
  smiley: () => [
    circlePoints(0, 0, 0.5),
    [
      [-0.17, -0.12],
      [-0.165, -0.06],
    ],
    [
      [0.17, -0.12],
      [0.175, -0.06],
    ],
    Array.from({ length: 11 }, (_, i): Point => {
      const a = 0.18 * Math.PI + (i / 10) * 0.64 * Math.PI;
      return [Math.cos(a) * 0.27, Math.sin(a) * 0.27 - 0.02];
    }),
  ],
  zigzag: () => [
    Array.from({ length: 9 }, (_, i): Point => [
      -0.5 + i / 8,
      i % 2 === 0 ? 0.14 : -0.14,
    ]),
  ],
  star: () => [
    [0, 2, 4, 1, 3, 0].map((k): Point => {
      const a = -Math.PI / 2 + (k * Math.PI * 2) / 5;
      return [Math.cos(a) * 0.5, Math.sin(a) * 0.5];
    }),
  ],
  // A classic heart in one stroke; starting a hair before the top dip and
  // ending a hair past it makes the ends cross like a real pen stroke
  heart: () => [
    Array.from({ length: 41 }, (_, i): Point => {
      const t = -0.3 + (i / 40) * (Math.PI * 2 + 0.55);
      return [
        (16 * Math.sin(t) ** 3) / 33,
        -(
          13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t)
        ) / 33,
      ];
    }),
  ],
  spiral: () => [
    Array.from({ length: 70 }, (_, i): Point => {
      const a = i * 0.24;
      const r = 0.02 + a * 0.027;
      return [Math.cos(a) * r, Math.sin(a) * r];
    }),
  ],
  squiggle: () => [
    Array.from({ length: 31 }, (_, i): Point => {
      const x = -0.5 + i / 30;
      return [x, Math.sin(x * 22) * 0.1];
    }),
  ],
  loops: () => [
    Array.from({ length: 61 }, (_, i): Point => {
      const t = (i / 60) * Math.PI * 6;
      return [-0.5 + 0.053 * t - 0.1 * Math.sin(t), -0.1 * Math.cos(t)];
    }),
  ],
  tinySquiggle: () => [
    Array.from({ length: 15 }, (_, i): Point => {
      const x = -0.5 + i / 14;
      return [x, Math.sin(x * 14) * 0.13];
    }),
  ],
  cross: () => [
    [
      [-0.5, -0.46],
      [0.5, 0.5],
    ],
    [
      [0.46, -0.5],
      [-0.5, 0.44],
    ],
  ],
  plus: () => [
    [
      [-0.5, 0],
      [0.5, 0],
    ],
    [
      [0, -0.5],
      [0, 0.5],
    ],
  ],
  bolt: () => [
    [
      [0.15, -0.5],
      [-0.25, 0.05],
      [0.1, 0.05],
      [-0.2, 0.5],
    ],
  ],
  triangle: () => [
    [
      [-0.5, 0.4],
      [0, -0.45],
      [0.5, 0.42],
      [-0.52, 0.4],
    ],
  ],
  circle: () => [circlePoints(0, 0, 0.5, 1.15)],
  // The cube from the favicon: a hexagon outline that closes exactly on its
  // start. The outline's corners are rounded when drawn, so the inner edges
  // stop just short of them instead of poking out past the ends.
  cube: () => [
    [
      [0, -0.5],
      [0.43, -0.25],
      [0.43, 0.25],
      [0, 0.5],
      [-0.43, 0.25],
      [-0.43, -0.25],
      [0, -0.5],
    ],
    [
      [-0.395, -0.23],
      [0, 0],
      [0.395, -0.23],
    ],
    [
      [0, 0],
      [0, 0.46],
    ],
  ],
  cylinder: () => [
    ellipse(0, -0.34, 0.36, 0.13),
    [
      [-0.36, -0.34],
      [-0.36, 0.34],
    ],
    [
      [0.36, -0.34],
      [0.36, 0.34],
    ],
    ellipse(0, 0.34, 0.36, 0.13, 0, Math.PI),
  ],
  sphere: () => [
    circlePoints(0, 0, 0.46, 1.06),
    ellipse(0, 0.04, 0.46, 0.14, 0.1, Math.PI - 0.1),
  ],
};

// Place a shape: [name, x, y, size, rotation in degrees]. Sparse on purpose:
// a few small doodles orbiting the big squiggle in the middle.
const layout: [keyof typeof shapes, number, number, number, number][] = [
  ["star", 0.62, 0.14, 0.15, -10],
  ["tinySquiggle", 1.3, 0.1, 0.13, -4],
  ["smiley", 0.28, 0.45, 0.15, -8],
  ["heart", 1.95, 0.32, 0.15, -8],
  ["spiral", 1.9, 0.72, 0.13, 0],
  ["zigzag", 0.55, 0.88, 0.22, -4],
  ["cross", 1.4, 0.88, 0.09, 12],
  // Corners
  ["bolt", 0.14, 0.14, 0.14, -10],
  ["circle", 2.08, 0.1, 0.09, 0],
  ["triangle", 0.13, 0.88, 0.1, -12],
  ["tinySquiggle", 2.06, 0.92, 0.12, 6],
  // 3D shapes
  ["cube", 0.6, 0.54, 0.24, -8],
  ["cube", 1.62, 0.15, 0.14, 14],
  ["cylinder", 1.12, 0.86, 0.17, 4],
  ["sphere", 0.95, 0.1, 0.13, 0],
];

// A tangled, looping squiggle: a few sine waves layered on each axis, which
// gives even, smooth loops (like a ball of yarn drawn without lifting the pen)
const buildScribble = (
  cx: number,
  cy: number,
  width: number,
  height: number,
): Stroke => {
  const points: Point[] = [];
  const count = 420;
  for (let i = 0; i <= count; i++) {
    const t = (i / count) * Math.PI * 1.9;
    const x = 0.55 * Math.sin(2 * t + 0.9) + 0.45 * Math.sin(7 * t + 0.3);
    const y = 0.6 * Math.sin(3 * t + 0.2) + 0.4 * Math.sin(5 * t + 2.1);
    points.push([cx + (x * width) / 2, cy + (y * height) / 2]);
  }
  return { points };
};

const buildStarterDoodle = (): Stroke[] => {
  const random = seeded(11);
  // One big looping squiggle, with the small doodles around and over it
  const strokes: Stroke[] = [buildScribble(1.26, 0.46, 1.0, 0.5)];
  for (const [name, x, y, size, degrees] of layout) {
    const angle = (degrees * Math.PI) / 180;
    for (const points of shapes[name]()) {
      // Add midpoints and a little wobble so it looks hand-drawn
      const dense: Point[] = [];
      points.forEach((point, i) => {
        dense.push(point);
        const next = points[i + 1];
        if (next)
          dense.push([(point[0] + next[0]) / 2, (point[1] + next[1]) / 2]);
      });
      strokes.push({
        points: dense.map(([px, py]): Point => {
          const wx = px + (random() - 0.5) * 0.006;
          const wy = py + (random() - 0.5) * 0.006;
          return [
            x + (wx * Math.cos(angle) - wy * Math.sin(angle)) * size,
            y + (wx * Math.sin(angle) + wy * Math.cos(angle)) * size,
          ];
        }),
      });
    }
  }
  return strokes;
};

function Doodle() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strokes = useRef<Stroke[]>(buildStarterDoodle());
  const currentStroke = useRef<Stroke | null>(null);
  const frame = useRef(0);

  // Fit the 2.2 x 1 design box inside the canvas, centered
  const getLayout = (canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scale = Math.min(
      rect.width / DESIGN_WIDTH,
      rect.height / DESIGN_HEIGHT,
    );
    return {
      rect,
      scale,
      offsetX: (rect.width - DESIGN_WIDTH * scale) / 2,
      offsetY: (rect.height - DESIGN_HEIGHT * scale) / 2,
    };
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const { rect, scale, offsetX, offsetY } = getLayout(canvas);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = LINE_WIDTH * scale;
    // Ink color comes from CSS (black, or white in dark mode)
    ctx.strokeStyle = getComputedStyle(canvas).color;

    const at = ([x, y]: Point): Point => [
      offsetX + x * scale,
      offsetY + y * scale,
    ];

    for (const { points } of strokes.current) {
      ctx.beginPath();
      const [startX, startY] = at(points[0]);
      ctx.moveTo(startX, startY);
      // Curve through the midpoints so wobbly input still reads as smooth ink
      for (let i = 1; i < points.length - 1; i++) {
        const [px, py] = at(points[i]);
        const [nx, ny] = at(points[i + 1]);
        ctx.quadraticCurveTo(px, py, (px + nx) / 2, (py + ny) / 2);
      }
      if (points.length > 1) {
        const [lastX, lastY] = at(points[points.length - 1]);
        ctx.lineTo(lastX, lastY);
      } else {
        // A lone click still draws a dot thanks to the round caps
        ctx.lineTo(startX + 0.01, startY);
      }
      ctx.stroke();
    }
  }, []);

  const scheduleDraw = useCallback(() => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(draw);
  }, [draw]);

  // Keep the canvas bitmap sharp, and redraw on resize or theme change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      scheduleDraw();
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const themeObserver = new MutationObserver(scheduleDraw);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => {
      resizeObserver.disconnect();
      themeObserver.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, [scheduleDraw]);

  const toDesignPoint = (
    event: React.PointerEvent<HTMLCanvasElement>,
  ): Point => {
    const { rect, scale, offsetX, offsetY } = getLayout(event.currentTarget);
    return [
      (event.clientX - rect.left - offsetX) / scale,
      (event.clientY - rect.top - offsetY) / scale,
    ];
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {}
    currentStroke.current = { points: [toDesignPoint(event)] };
    strokes.current.push(currentStroke.current);
    scheduleDraw();
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!currentStroke.current) return;
    currentStroke.current.points.push(toDesignPoint(event));
    scheduleDraw();
  };

  const handlePointerEnd = () => {
    currentStroke.current = null;
  };

  const handleClear = () => {
    strokes.current = [];
    currentStroke.current = null;
    scheduleDraw();
  };

  return (
    <div className="doodle">
      <canvas
        ref={canvasRef}
        className="doodle__canvas"
        role="img"
        aria-label="Doodle area: draw with your mouse or finger"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      />
      <button type="button" className="doodle__clear" onClick={handleClear}>
        <LuEraser aria-hidden="true" />
        Clear
      </button>
    </div>
  );
}

export default Doodle;
