import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const SemiCircularChart = ({ percentage, label }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [percentage, 100 - percentage],
          backgroundColor: ['black', 'rgba(0, 0, 0, 0.1)'],
          borderWidth: 0,
          cutout: '80%',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        circumference: 180,
        rotation: -90,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        }
      }
    });
  }, [percentage]); // Depend on percentage to update chart

  return (
    <div style={{ position: 'relative', height: 200 ,width: 200 }}>
      <canvas ref={chartRef} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -40%)',
        textAlign: 'center'
      }}>
        <div className="guagechart-label">
        <div className="percentage">{percentage}%</div>
        <div className="label">{label}</div></div>
      </div>
    </div>
  );
};

export default SemiCircularChart;
