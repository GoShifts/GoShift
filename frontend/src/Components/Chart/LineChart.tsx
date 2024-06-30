// src/LineChart.tsx

import React from "react";

interface LineChartProps {
  data: { x: number; y: number }[];
  width: number;
  height: number;
  strokeColor?: string;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  width,
  height,
  strokeColor = "blue",
}) => {
  const maxX = Math.max(...data.map((d) => d.x));
  const maxY = Math.max(...data.map((d) => d.y));
  const minX = Math.min(...data.map((d) => d.x));
  const minY = Math.min(...data.map((d) => d.y));

  const getX = (x: number) => ((x - minX) / (maxX - minX)) * width;
  const getY = (y: number) => height - ((y - minY) / (maxY - minY)) * height;

  const pathData = data
    .map((d, i) => {
      const x = getX(d.x);
      const y = getY(d.y);
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} style={{ border: "1px solid black" }}>
      <path d={pathData} fill="none" stroke={strokeColor} strokeWidth={2} />
    </svg>
  );
};

export default LineChart;
