// AreaChart.tsx
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
// import { AreaChartProps } from './AreaChartProps'; // Adjust the path as per your project structure

interface AreaChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      fill?: boolean;
    }[];
  };
}

const AreaChart: React.FC<AreaChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  let areaChart: Chart | null = null;

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        areaChart = new Chart(ctx, {
          type: "line",
          data: data,
          options: {
            scales: {
              x: {
                type: "category",
                labels: data.labels,
              },
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }

    return () => {
      if (areaChart) {
        areaChart.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default AreaChart;
