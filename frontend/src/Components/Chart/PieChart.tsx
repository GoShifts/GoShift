// PieChart.tsx
import React, { useEffect, useRef } from "react";
import Chart, { ChartConfiguration, ChartTypeRegistry } from "chart.js/auto"; // Import ChartConfiguration and ChartTypeRegistry

interface PieChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      hoverBackgroundColor?: string[];
    }[];
  };
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  let pieChart: Chart<"pie", number[], string> | null = null; // Explicitly specify the chart type

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        // Define the chart configuration explicitly
        const config: ChartConfiguration<"pie", number[], string> = {
          type: "pie",
          data: data,
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
            },
            animation: false, // Adjust animation options if needed
          },
        };

        pieChart = new Chart(ctx, config);
      }
    }

    return () => {
      if (pieChart) {
        pieChart.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default PieChart