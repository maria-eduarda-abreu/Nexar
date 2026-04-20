import React from "react";

/**
 * SVG radar/spider chart.
 * @param {{ skills: Array<{label: string, value: number}> }} props
 */
export default function RadarChart({ skills }) {
  const cx = 100, cy = 100, r = 72;
  const n = skills.length;
  const levels = 4;

  const toXY = (i, pct) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return {
      x: cx + pct * r * Math.cos(angle),
      y: cy + pct * r * Math.sin(angle),
    };
  };

  const gridPolygons = Array.from({ length: levels }, (_, l) => {
    const pct = (l + 1) / levels;
    return Array.from({ length: n }, (__, i) => {
      const { x, y } = toXY(i, pct);
      return `${x},${y}`;
    }).join(" ");
  });

  const dataPoints = skills.map((s, i) => {
    const { x, y } = toXY(i, s.value);
    return `${x},${y}`;
  });

  return (
    <svg viewBox="0 0 200 200" width="170" height="170" aria-label="Radar de habilidades">
      {/* Grid rings */}
      {gridPolygons.map((pts, i) => (
        <polygon
          key={i}
          points={pts}
          fill="none"
          stroke="#ddd"
          strokeWidth="1"
        />
      ))}

      {/* Axis lines */}
      {Array.from({ length: n }, (_, i) => {
        const { x, y } = toXY(i, 1);
        return (
          <line
            key={i}
            x1={cx} y1={cy}
            x2={x}  y2={y}
            stroke="#ddd"
            strokeWidth="1"
          />
        );
      })}

      {/* Data shape */}
      <polygon
        points={dataPoints.join(" ")}
        fill="rgba(17,17,17,0.1)"
        stroke="#111"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Data points */}
      {skills.map((s, i) => {
        const { x, y } = toXY(i, s.value);
        return (
          <circle key={i} cx={x} cy={y} r="3.5" fill="#111" />
        );
      })}

      {/* Labels */}
      {skills.map((s, i) => {
        const { x, y } = toXY(i, 1.28);
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="9"
            fontFamily="'IBM Plex Sans', sans-serif"
            fill="#444"
            fontWeight="500"
          >
            {s.label}
          </text>
        );
      })}
    </svg>
  );
}
