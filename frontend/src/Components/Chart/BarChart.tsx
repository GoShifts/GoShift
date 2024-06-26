import React from "react";

interface BarChartProps {
  data: { label: string; value: number }[];
  width: number;
  height: number;
  barColor?: string;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  width,
  height,
  barColor = "steelblue",
}) => {
  // Calculate the maximum value in data to scale the bars accordingly
  const maxVal = Math.max(...data.map((item) => item.value));

  return (
    <svg width={width} height={height}>
      {data.map((item, index) => (
        <rect
          key={index}
          x={index * (width / data.length)}
          y={height - (item.value / maxVal) * height}
          width={width / data.length - 2}
          height={(item.value / maxVal) * height}
          fill={barColor}
        />
      ))}
    </svg>
  );
};

export default BarChart;
