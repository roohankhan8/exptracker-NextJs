'use client'
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function PieChart({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: data.labels,
          datasets: [
            {
              data: data.values,
              backgroundColor: data.colors,
            },
          ],
        },
      });
    }
  }, [data]);

  return <canvas ref={chartRef} />;
}

export default PieChart;
